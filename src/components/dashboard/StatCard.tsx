import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "info";
  delay?: number;
}

const variantStyles = {
  default: {
    bg: "bg-card",
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
  primary: {
    bg: "bg-card",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  success: {
    bg: "bg-card",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  warning: {
    bg: "bg-card",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  info: {
    bg: "bg-card",
    iconBg: "bg-info/10",
    iconColor: "text-info",
  },
};

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}: StatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "p-6 rounded-2xl border border-border",
        styles.bg
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1 mt-2 text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{trend.value}%</span>
              <span className="text-muted-foreground font-normal">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl",
          styles.iconBg
        )}>
          <Icon className={cn("w-6 h-6", styles.iconColor)} />
        </div>
      </div>
    </motion.div>
  );
};
