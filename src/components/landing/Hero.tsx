import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen, Brain } from "lucide-react";
import { Link } from "react-router-dom";
export const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" animate={{
        x: [0, 30, 0],
        y: [0, -20, 0]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" animate={{
        x: [0, -40, 0],
        y: [0, 30, 0]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
    }} />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Academic Excellence
          </motion.div>

          {/* Main heading */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Smart Grading for
            <br />
            <span className="text-primary-foreground/80">Modern Education</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="text-xl md:text-2xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Automate assignment grading with AI that understands documents, audio, and video. 
            Fair, transparent, and auditable.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              <Button variant="hero" size="xl" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="hero-outline" size="xl">
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.5
        }} className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-primary-foreground/10">
            {[{
            value: "95%",
            label: "Time Saved"
          }, {
            value: "50K+",
            label: "Assignments Graded"
          }, {
            value: "99.2%",
            label: "Accuracy Rate"
          }].map((stat, index) => <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground my-0 mb-[3px]">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>)}
          </motion.div>
        </div>
      </div>

      {/* Floating icons */}
      <motion.div className="absolute left-[10%] top-[30%] hidden lg:block" animate={{
      y: [0, -15, 0]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}>
        <div className="p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
          <BookOpen className="w-8 h-8 text-primary-foreground/80" />
        </div>
      </motion.div>

      <motion.div className="absolute right-[15%] top-[40%] hidden lg:block" animate={{
      y: [0, 15, 0]
    }} transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }}>
        <div className="p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
          <Brain className="w-8 h-8 text-primary-foreground/80" />
        </div>
      </motion.div>
    </section>;
};