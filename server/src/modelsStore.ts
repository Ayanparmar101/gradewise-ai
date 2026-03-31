import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const FILE = path.join(DATA_DIR, 'models.json');

export type Model = {
  id: string;
  name: string;
  description?: string;
  version?: string;
  createdAt: string;
};

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(FILE);
  } catch (e) {
    await fs.writeFile(FILE, '[]', 'utf8');
  }
}

export async function getAll(): Promise<Model[]> {
  await ensureFile();
  const raw = await fs.readFile(FILE, 'utf8');
  return JSON.parse(raw) as Model[];
}

export async function saveAll(models: Model[]) {
  await ensureFile();
  await fs.writeFile(FILE, JSON.stringify(models, null, 2), 'utf8');
}

export async function create(model: Omit<Model, 'id' | 'createdAt'> & { id?: string }) {
  const list = await getAll();
  const id = model.id || Date.now().toString(36);
  const m: Model = { id, createdAt: new Date().toISOString(), ...model } as Model;
  list.unshift(m);
  await saveAll(list);
  return m;
}

export async function update(id: string, patch: Partial<Model>) {
  const list = await getAll();
  const idx = list.findIndex(m => m.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch };
  await saveAll(list);
  return list[idx];
}

export async function remove(id: string) {
  const list = await getAll();
  const filtered = list.filter(m => m.id !== id);
  if (filtered.length === list.length) return false;
  await saveAll(filtered);
  return true;
}
