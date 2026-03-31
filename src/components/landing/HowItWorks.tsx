import { motion } from "framer-motion";
import { Upload, Settings, Cpu, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Settings,
    step: "01",
    title: "Define Rubric",
    description: "Professors create custom grading criteria with weighted categories for content accuracy, clarity, and more.",
    color: "from-primary to-accent",
  },
  {
    icon: Upload,
    step: "02",
    title: "Student Uploads",
    description: "Students submit their documents, audio explanations, and video presentations through the portal.",
    color: "from-accent to-info",
  },
  {
    icon: Cpu,
    step: "03",
    title: "AI Analysis",
    description: "Our AI engine analyzes all content, checks for plagiarism, and evaluates against the rubric.",
    color: "from-info to-success",
  },
  {
    icon: FileCheck,
    step: "04",
    title: "Review & Feedback",
    description: "Students receive detailed grades with rubric breakdowns and personalized improvement suggestions.",
    color: "from-success to-primary",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            A streamlined workflow that transforms hours of grading into minutes
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6`}>
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
