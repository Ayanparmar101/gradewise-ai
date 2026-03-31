import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Model = {
  id: string;
  name: string;
  description?: string;
  version?: string;
  createdAt: string;
};

const STORAGE_KEY = "gradewise_models";

const AdminModels = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [editing, setEditing] = useState<Model | null>(null);
  const [form, setForm] = useState({ name: "", description: "", version: "" });

  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    if (!apiUrl) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setModels(JSON.parse(raw));
      } catch (e) {}
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${apiUrl.replace(/\/$/, '')}/models`);
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        setModels(Array.isArray(data) ? data : []);
      } catch (e) {
        // fallback to local
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) setModels(JSON.parse(raw));
        } catch {}
      }
    })();
  }, []);

  useEffect(() => {
    // keep local copy in case backend is not configured
    localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  }, [models]);

  function resetForm() {
    setForm({ name: "", description: "", version: "" });
    setEditing(null);
  }

  function onSubmit(e?: any) {
    if (e) e.preventDefault();
    if (!form.name.trim()) return;

    (async () => {
      if (apiUrl) {
        try {
          if (editing) {
            const res = await fetch(`${apiUrl.replace(/\/$/, '')}/models/${editing.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('update failed');
            const updated = await res.json();
            setModels(prev => prev.map(m => m.id === updated.id ? updated : m));
          } else {
            const res = await fetch(`${apiUrl.replace(/\/$/, '')}/models`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('create failed');
            const created = await res.json();
            setModels(prev => [created, ...prev]);
          }
          resetForm();
          return;
        } catch (e) {
          // fallthrough to local behavior
        }
      }

      if (editing) {
        setModels(prev => prev.map(m => m.id === editing.id ? { ...m, ...form } : m));
      } else {
        const newModel: Model = {
          id: Date.now().toString(36),
          name: form.name.trim(),
          description: form.description.trim(),
          version: form.version.trim(),
          createdAt: new Date().toISOString(),
        };
        setModels(prev => [newModel, ...prev]);
      }
      resetForm();
    })();
  }

  function onEdit(m: Model) {
    setEditing(m);
    setForm({ name: m.name, description: m.description || "", version: m.version || "" });
  }

  function onDelete(id: string) {
    if (!confirm("Delete this model?")) return;
    (async () => {
      if (apiUrl) {
        try {
          const res = await fetch(`${apiUrl.replace(/\/$/, '')}/models/${id}`, { method: 'DELETE' });
          if (!res.ok && res.status !== 204) throw new Error('delete failed');
          setModels(prev => prev.filter(m => m.id !== id));
          return;
        } catch (e) {
          // fallback
        }
      }
      setModels(prev => prev.filter(m => m.id !== id));
    })();
  }

  return (
    <DashboardLayout role="admin">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Models</h1>
          <p className="text-sm text-muted-foreground">Register and manage models used by the platform.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Register Model</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-3">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Model name (e.g. gpt-4-edu)" />
              </div>
              <div>
                <Label>Description</Label>
                <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description" />
              </div>
              <div>
                <Label>Version</Label>
                <Input value={form.version} onChange={e => setForm(f => ({ ...f, version: e.target.value }))} placeholder="v1.0" />
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editing ? 'Update' : 'Add'} Model</Button>
                <Button variant="ghost" onClick={resetForm} type="button">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold">Registered Models</h2>
          <p className="text-sm text-muted-foreground mb-3">Models are persisted to browser localStorage for this demo.</p>
          <div className="space-y-3">
            {models.length === 0 && (
              <Card>
                <CardContent className="text-center text-muted-foreground">No models registered yet.</CardContent>
              </Card>
            )}

            {models.map(m => (
              <Card key={m.id}>
                <CardContent className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-sm font-medium">{m.name}</h3>
                      <span className="text-xs text-muted-foreground">{m.version}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Registered: {new Date(m.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <Button variant="outline" onClick={() => onEdit(m)}>Edit</Button>
                    <Button variant="destructive" onClick={() => onDelete(m.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminModels;
