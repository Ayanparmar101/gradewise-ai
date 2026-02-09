import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const StudentSettings = () => (
  <DashboardLayout role="student">
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16"><AvatarFallback className="bg-primary text-primary-foreground text-xl">ST</AvatarFallback></Avatar>
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>
          <div className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>First Name</Label><Input defaultValue="Alex" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Johnson" /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue="alex.johnson@college.edu" disabled /></div>
            <div className="space-y-2"><Label>Department</Label><Input defaultValue="Computer Science" /></div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Grade posted", "Assignment due reminder", "Feedback available", "Submission confirmation"].map(label => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{label}</span>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default StudentSettings;
