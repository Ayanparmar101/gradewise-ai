import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-32 pb-20">
      <div className="container px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">About GradeAI</h1>
          <div className="prose prose-lg text-muted-foreground space-y-6">
            <p>GradeAI is an AI-powered grading platform built to make assignment evaluation faster, fairer, and more transparent for colleges and universities.</p>
            <p>Our system analyzes documents, audio, and video submissions against professor-defined rubrics — providing detailed, criterion-level grades with explainable AI reasoning.</p>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-10">Our Mission</h2>
            <p>To eliminate grading bottlenecks while maintaining academic integrity, giving professors more time for teaching and students faster, more actionable feedback.</p>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-10">How It Works</h2>
            <p>Students upload their work. The AI pipeline extracts content, transcribes media, checks for plagiarism, evaluates against rubric criteria, and generates a grade with natural-language feedback — all within minutes.</p>
            <p>Professors retain full override control with audit-logged reasoning, ensuring the AI remains a tool, not a replacement.</p>
          </div>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
