import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle2, Clock, TrendingUp, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const recentSubmissions = [
  {
    id: "1",
    studentName: "Emily Chen",
    assignment: "Machine Learning Project",
    course: "CS 401",
    submittedAt: "2 hours ago",
    status: "grading",
  },
  {
    id: "2",
    studentName: "Michael Johnson",
    assignment: "Database Design",
    course: "CS 301",
    submittedAt: "4 hours ago",
    status: "graded",
    grade: 88,
  },
  {
    id: "3",
    studentName: "Sarah Williams",
    assignment: "Algorithm Analysis",
    course: "CS 201",
    submittedAt: "6 hours ago",
    status: "graded",
    grade: 95,
  },
  {
    id: "4",
    studentName: "David Brown",
    assignment: "Network Security",
    course: "CS 450",
    submittedAt: "1 day ago",
    status: "pending",
  },
];

const courses = [
  { id: "1", name: "CS 401 - Artificial Intelligence", students: 45, pending: 12 },
  { id: "2", name: "CS 301 - Database Systems", students: 38, pending: 5 },
  { id: "3", name: "CS 201 - Data Structures", students: 52, pending: 0 },
];

const ProfessorDashboard = () => {
  return (
    <DashboardLayout role="professor">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Good morning, Dr. Smith! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your teaching overview for today.
            </p>
          </div>
          <Button className="sm:w-auto w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={135}
            icon={Users}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Active Assignments"
            value={8}
            icon={FileText}
            variant="info"
            delay={0.1}
          />
          <StatCard
            title="Pending Grading"
            value={17}
            icon={Clock}
            variant="warning"
            delay={0.2}
          />
          <StatCard
            title="Graded This Week"
            value={42}
            icon={CheckCircle2}
            trend={{ value: 12, isPositive: true }}
            variant="success"
            delay={0.3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Submissions */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Recent Submissions
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentSubmissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {submission.studentName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{submission.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {submission.assignment} • {submission.course}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{submission.submittedAt}</span>
                        {submission.status === "grading" && (
                          <Badge className="bg-info/10 text-info border-info/20">
                            AI Grading...
                          </Badge>
                        )}
                        {submission.status === "graded" && (
                          <Badge className="bg-success/10 text-success border-success/20">
                            {submission.grade}/100
                          </Badge>
                        )}
                        {submission.status === "pending" && (
                          <Badge variant="secondary">Pending Review</Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Overview */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Your Courses
            </h2>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="hover:border-primary/30 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground mb-2">{course.name}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{course.students} students</span>
                        {course.pending > 0 ? (
                          <span className="text-warning">{course.pending} pending</span>
                        ) : (
                          <span className="text-success">All graded</span>
                        )}
                      </div>
                      <Progress 
                        value={((course.students - course.pending) / course.students) * 100} 
                        className="h-1.5"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Class Average</p>
                    <p className="text-2xl font-display font-bold text-foreground">84.5%</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Up 3.2% from last semester
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorDashboard;
