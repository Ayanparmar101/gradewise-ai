import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { supabaseAdmin } from './supabaseClient';
import * as modelsStore from './modelsStore';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/assignments', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('assignments')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/submissions', async (req, res) => {
  try {
    const payload = req.body;
    const { data, error } = await supabaseAdmin
      .from('submissions')
      .insert([payload])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Models endpoints (server-side JSON store)
app.get('/models', async (req, res) => {
  try {
    const data = await modelsStore.getAll();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/models', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !payload.name) return res.status(400).json({ error: 'name required' });
    const m = await modelsStore.create({ name: payload.name, description: payload.description || '', version: payload.version || '' });
    res.status(201).json(m);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/models/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const patched = await modelsStore.update(id, req.body);
    if (!patched) return res.status(404).json({ error: 'not found' });
    res.json(patched);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/models/:id', async (req, res) => {
  try {
    const ok = await modelsStore.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'not found' });
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});
