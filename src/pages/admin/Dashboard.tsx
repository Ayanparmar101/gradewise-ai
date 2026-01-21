import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { Users, GraduationCap, Cpu, Activity, FileText, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const systemMetrics = [
  { label: "AI Model Accuracy", value: 94.2, status: "healthy" },
  { label: "Grading Speed", value: 98.5, status: "healthy" },
  { label: "System Uptime", value: 99.9, status: "healthy" },
  { label: "Storage Usage", value: 67.3, status: "warning" },
];

const recentActivity = [
  { id: 1, action: "New professor registered", user: "Dr. Jane Wilson", time: "10 minutes ago" },
  { id: 2, action: "Bulk grading completed", details: "CS 401 - 45 assignments", time: "1 hour ago" },
  { id: 3, action: "System backup completed", details: "Full database backup", time: "3 hours ago" },
  { id: 4, action: "New course created", details: "CS 502 - Advanced ML", time: "5 hours ago" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            System Overview
          </h1>
          <p className="text-muted-foreground">
            Monitor platform health, user activity, and AI performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="2,847"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Active Courses"
            value={45}
            icon={GraduationCap}
            variant="info"
            delay={0.1}
          />
          <StatCard
            title="Assignments Graded"
            value="12.4K"
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
            variant="success"
            delay={0.2}
          />
          <StatCard
            title="AI Requests Today"
            value="3,291"
            icon={Cpu}
            variant="warning"
            delay={0.3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* System Health */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              System Health
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {systemMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{metric.label}</span>
                        <Badge 
                          variant={metric.status === "healthy" ? "default" : "secondary"}
                          className={metric.status === "healthy" 
                            ? "bg-success/10 text-success border-success/20" 
                            : "bg-warning/10 text-warning border-warning/20"
                          }
                        >
                          {metric.value}%
                        </Badge>
                      </div>
                      <Progress 
                        value={metric.value} 
                        className="h-2"
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">Students</span>
                    </div>
                    <span className="text-sm font-medium">2,512 (88%)</span>
                  </div>
                  <Progress value={88} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-sm text-foreground">Professors</span>
                    </div>
                    <span className="text-sm font-medium">287 (10%)</span>
                  </div>
                  <Progress value={10} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-sm text-foreground">Administrators</span>
                    </div>
                    <span className="text-sm font-medium">48 (2%)</span>
                  </div>
                  <Progress value={2} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Recent Activity
            </h2>
            <Card>
              <CardContent className="p-0">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-4 border-b border-border last:border-0"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user || activity.details}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="bg-gradient-to-br from-success/10 to-primary/10 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-success/20">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Security Status</p>
                    <p className="text-sm text-success">All systems secure</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Last security scan: 2 hours ago
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
