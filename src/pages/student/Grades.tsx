import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, BarChart3, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const grades = [
  { assignment: "Algorithm Analysis Essay", course: "CS 201", score: 92, max: 100, rubric: [{ criterion: "Content Accuracy", score: 18, max: 20 }, { criterion: "Depth of Analysis", score: 24, max: 25 }, { criterion: "Clarity", score: 23, max: 25 }, { criterion: "Presentation", score: 27, max: 30 }] },
  { assignment: "Network Security Presentation", course: "CS 450", score: 88, max: 100, rubric: [{ criterion: "Topic Coverage", score: 22, max: 25 }, { criterion: "Explanation Quality", score: 20, max: 25 }, { criterion: "Visual Design", score: 23, max: 25 }, { criterion: "Q&A Readiness", score: 23, max: 25 }] },
  { assignment: "Software Engineering Case Study", course: "CS 410", score: 95, max: 100, rubric: [{ criterion: "Analysis Depth", score: 24, max: 25 }, { criterion: "Real-World Application", score: 24, max: 25 }, { criterion: "Writing Quality", score: 24, max: 25 }, { criterion: "References", score: 23, max: 25 }] },
];

const gradeColor = (pct: number) => {
  if (pct >= 90) return "text-success";
  if (pct >= 80) return "text-info";
  if (pct >= 70) return "text-warning";
  return "text-destructive";
};

const StudentGrades = () => (
  <DashboardLayout role="student">
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-display font-bold text-foreground">Grades & Feedback</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Average Grade" value="91.7%" icon={TrendingUp} variant="success" delay={0} />
        <StatCard title="Highest Grade" value="95%" icon={Award} variant="primary" delay={0.1} />
        <StatCard title="Assignments Graded" value={3} icon={BarChart3} variant="info" delay={0.2} />
        <StatCard title="Class Rank" value="#4" icon={Target} variant="warning" delay={0.3} />
      </div>
      <div className="space-y-6">
        {grades.map((g, i) => (
          <motion.div key={g.assignment} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{g.assignment}</CardTitle>
                    <p className="text-sm text-muted-foreground">{g.course}</p>
                  </div>
                  <span className={cn("text-3xl font-display font-bold", gradeColor((g.score / g.max) * 100))}>{g.score}/{g.max}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {g.rubric.map(r => (
                  <div key={r.criterion} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{r.criterion}</span>
                      <span className="font-medium text-foreground">{r.score}/{r.max}</span>
                    </div>
                    <Progress value={(r.score / r.max) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default StudentGrades;
