import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AssignmentCard } from "@/components/dashboard/AssignmentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const mockAssignments = [
  { id: "1", title: "Machine Learning Project Report", course: "CS 401 - Artificial Intelligence", dueDate: "Jan 25, 2026", status: "pending" as const, description: "Submit a comprehensive report on your ML project." },
  { id: "2", title: "Database Design Assignment", course: "CS 301 - Database Systems", dueDate: "Jan 22, 2026", status: "submitted" as const, description: "Design a normalized database schema." },
  { id: "3", title: "Algorithm Analysis Essay", course: "CS 201 - Data Structures", dueDate: "Jan 18, 2026", status: "graded" as const, grade: 92, description: "Analyze sorting algorithm complexity." },
  { id: "4", title: "Network Security Presentation", course: "CS 450 - Network Security", dueDate: "Jan 15, 2026", status: "graded" as const, grade: 88, description: "Present on modern encryption techniques." },
  { id: "5", title: "Operating Systems Lab Report", course: "CS 350 - Operating Systems", dueDate: "Feb 1, 2026", status: "pending" as const, description: "Document your process scheduling simulation." },
  { id: "6", title: "Software Engineering Case Study", course: "CS 410 - Software Engineering", dueDate: "Jan 10, 2026", status: "graded" as const, grade: 95, description: "Analyze a real-world software failure." },
];

const StudentAssignments = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockAssignments.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.course.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout role="student">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Assignments</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search assignments..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Filter" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="graded">Graded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4">
          {filtered.length > 0 ? filtered.map((a, i) => (
            <AssignmentCard key={a.id} {...a} delay={0.05 * i} />
          )) : (
            <p className="text-center text-muted-foreground py-12">No assignments found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAssignments;
