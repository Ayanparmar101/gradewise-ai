import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, Upload, Eye, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssignmentCardProps {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
  maxGrade?: number;
  description?: string;
  delay?: number;
  onView?: () => void;
  onSubmit?: () => void;
}

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Clock,
  },
  submitted: {
    label: "Submitted",
    variant: "default" as const,
    icon: Upload,
  },
  graded: {
    label: "Graded",
    variant: "default" as const,
    icon: CheckCircle2,
  },
};

export const AssignmentCard = ({
  id,
  title,
  course,
  dueDate,
  status,
  grade,
  maxGrade = 100,
  description,
  delay = 0,
  onView,
  onSubmit,
}: AssignmentCardProps) => {
  const config = statusConfig[status];
  const gradePercentage = grade ? (grade / maxGrade) * 100 : 0;

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-grade-a";
    if (percentage >= 80) return "text-grade-b";
    if (percentage >= 70) return "text-grade-c";
    if (percentage >= 60) return "text-grade-d";
    return "text-grade-f";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{course}</p>
          </div>
        </div>
        <Badge 
          variant={config.variant}
          className={cn(
            status === "graded" && "bg-success/10 text-success border-success/20"
          )}
        >
          <config.icon className="w-3 h-3 mr-1" />
          {config.label}
        </Badge>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
      )}

      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Due: {dueDate}</span>
        </div>
        {status === "graded" && grade !== undefined && (
          <div className={cn("font-display font-bold text-lg", getGradeColor(gradePercentage))}>
            {grade}/{maxGrade}
          </div>
        )}
      </div>

      {status === "graded" && grade !== undefined && (
        <div className="mb-4">
          <Progress 
            value={gradePercentage} 
            className="h-2"
          />
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onView}>
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        {status === "pending" && (
          <Button size="sm" className="flex-1" onClick={onSubmit}>
            <Upload className="w-4 h-4 mr-2" />
            Submit
          </Button>
        )}
      </div>
    </motion.div>
  );
};
