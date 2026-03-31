import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Brain, FileText, Shield, BarChart3, Upload, MessageSquare, Eye, Zap } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Grading", description: "Advanced AI analyzes documents, audio, and video submissions to provide accurate, rubric-based grades with detailed feedback." },
  { icon: FileText, title: "Multi-Format Support", description: "Upload PDFs, PowerPoints, Word documents, audio recordings, and video explanations — all analyzed comprehensively." },
  { icon: Shield, title: "Plagiarism Detection", description: "Cross-student similarity checks, internet matching, and paraphrase detection to ensure academic integrity." },
  { icon: BarChart3, title: "Analytics Dashboard", description: "Visual grade distributions, class performance trends, and individual student progress tracking." },
  { icon: Upload, title: "Easy Submissions", description: "Drag-and-drop file uploads with version control, allowing students to resubmit and improve." },
  { icon: MessageSquare, title: "Detailed Feedback", description: "AI-generated natural language feedback highlighting strengths, weaknesses, and actionable improvement suggestions." },
  { icon: Eye, title: "Transparent Scoring", description: "Rubric-wise breakdowns with AI reasoning for every criterion, ensuring full transparency." },
  { icon: Zap, title: "Instant Results", description: "Get grades and feedback within minutes of submission, not days or weeks." },
];

const Features = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-32 pb-20">
      <div className="container px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Platform Features</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to automate grading while keeping it transparent, fair, and insightful.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4"><f.icon className="w-6 h-6" /></div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Features;
