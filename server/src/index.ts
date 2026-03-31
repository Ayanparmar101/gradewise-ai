import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { supabaseAdmin } from './supabaseClient';

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});
