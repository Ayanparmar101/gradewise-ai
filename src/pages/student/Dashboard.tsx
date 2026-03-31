import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AssignmentCard } from "@/components/dashboard/AssignmentCard";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Clock, TrendingUp, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockAssignments = [
  {
    id: "1",
    title: "Machine Learning Project Report",
    course: "CS 401 - Artificial Intelligence",
    dueDate: "Jan 25, 2026",
    status: "pending" as const,
    description: "Submit a comprehensive report on your ML project including methodology, results, and analysis.",
  },
  {
    id: "2",
    title: "Database Design Assignment",
    course: "CS 301 - Database Systems",
    dueDate: "Jan 22, 2026",
    status: "submitted" as const,
    description: "Design and implement a normalized database schema for an e-commerce platform.",
  },
  {
    id: "3",
    title: "Algorithm Analysis Essay",
    course: "CS 201 - Data Structures",
    dueDate: "Jan 18, 2026",
    status: "graded" as const,
    grade: 92,
    description: "Analyze the time and space complexity of sorting algorithms.",
  },
  {
    id: "4",
    title: "Network Security Presentation",
    course: "CS 450 - Network Security",
    dueDate: "Jan 15, 2026",
    status: "graded" as const,
    grade: 88,
    description: "Present on modern encryption techniques and their applications.",
  },
];

const notifications = [
  { id: 1, message: "New grade posted for Algorithm Analysis Essay", time: "2 hours ago" },
  { id: 2, message: "Machine Learning Project Report due in 4 days", time: "5 hours ago" },
  { id: 3, message: "Feedback available for Database Design Assignment", time: "1 day ago" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your assignments and grades.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Assignments"
            value={12}
            icon={FileText}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Completed"
            value={8}
            icon={CheckCircle2}
            variant="success"
            delay={0.1}
          />
          <StatCard
            title="Pending"
            value={4}
            icon={Clock}
            variant="warning"
            delay={0.2}
          />
          <StatCard
            title="Average Grade"
            value="87%"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            variant="info"
            delay={0.3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Assignments */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Recent Assignments
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid gap-4">
              {mockAssignments.map((assignment, index) => (
                <AssignmentCard
                  key={assignment.id}
                  {...assignment}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Notifications
            </h2>
            <Card>
              <CardContent className="p-0">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Grades
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Upcoming Deadlines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
