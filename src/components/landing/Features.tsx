import { motion } from "framer-motion";
import { 
  FileText, 
  Mic, 
  Video, 
  Shield, 
  BarChart3, 
  Sparkles, 
  CheckCircle2,
  Zap,
  Lock
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Document Analysis",
    description: "Extract and analyze content from PDFs, PowerPoints, and Word documents with advanced OCR and NLP.",
    highlights: ["PDF, PPT, DOCX support", "Speaker notes extraction", "Topic coverage analysis"],
  },
  {
    icon: Mic,
    title: "Audio Evaluation",
    description: "Transcribe and assess audio explanations for clarity, conceptual alignment, and logical flow.",
    highlights: ["Speech-to-text", "Clarity scoring", "Pace analysis"],
  },
  {
    icon: Video,
    title: "Video Assessment",
    description: "Analyze video presentations for engagement, reading detection, and explanation quality.",
    highlights: ["Video transcription", "Engagement signals", "Slide-reading detection"],
  },
  {
    icon: Shield,
    title: "Plagiarism Detection",
    description: "Cross-check submissions against peers, internet sources, and detect paraphrasing.",
    highlights: ["Cross-student check", "Internet similarity", "Paraphrase detection"],
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights into class performance, grade distribution, and improvement trends.",
    highlights: ["Grade distribution", "Trend analysis", "Export reports"],
  },
  {
    icon: Sparkles,
    title: "AI Feedback",
    description: "Generate personalized, actionable feedback highlighting strengths and improvement areas.",
    highlights: ["Natural language", "Actionable tips", "Strength highlighting"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Features = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Zap className="w-4 h-4" />
            Powerful Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            Everything You Need for
            <span className="text-gradient"> Smart Grading</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Our AI-powered platform handles every aspect of assignment evaluation, 
            from document analysis to detailed feedback generation.
          </motion.p>
        </div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Security banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Enterprise-Grade Security
              </h3>
              <p className="text-muted-foreground">
                Role-based access control, encrypted data storage, comprehensive audit logs, 
                and full GDPR compliance. Your academic data is always protected.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
