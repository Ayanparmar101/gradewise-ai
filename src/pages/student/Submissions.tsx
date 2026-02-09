import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, FileAudio, FileVideo, Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const submissions = [
  { id: "1", assignment: "Database Design Assignment", course: "CS 301", date: "Jan 20, 2026", status: "processing", files: [{ name: "schema.pdf", type: "pdf" }, { name: "explanation.mp3", type: "audio" }] },
  { id: "2", assignment: "Algorithm Analysis Essay", course: "CS 201", date: "Jan 16, 2026", status: "graded", files: [{ name: "analysis.docx", type: "doc" }] },
  { id: "3", assignment: "Network Security Presentation", course: "CS 450", date: "Jan 13, 2026", status: "graded", files: [{ name: "presentation.pptx", type: "ppt" }, { name: "demo.mp4", type: "video" }] },
];

const fileIcons: Record<string, typeof FileText> = { pdf: FileText, doc: FileText, ppt: FileText, audio: FileAudio, video: FileVideo };
const statusColors: Record<string, string> = { processing: "bg-warning/10 text-warning", graded: "bg-success/10 text-success" };

const StudentSubmissions = () => (
  <DashboardLayout role="student">
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">My Submissions</h1>
        <Button><Upload className="w-4 h-4 mr-2" /> New Submission</Button>
      </div>
      <div className="space-y-4">
        {submissions.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{s.assignment}</h3>
                    <p className="text-sm text-muted-foreground">{s.course}</p>
                  </div>
                  <Badge className={cn("capitalize", statusColors[s.status])}>{s.status === "processing" ? <><Clock className="w-3 h-3 mr-1" />Processing</> : s.status}</Badge>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  {s.files.map(f => {
                    const Icon = fileIcons[f.type] || FileText;
                    return <div key={f.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm"><Icon className="w-4 h-4 text-primary" />{f.name}</div>;
                  })}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Submitted: {s.date}</span>
                  <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" /> View Details</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default StudentSubmissions;
