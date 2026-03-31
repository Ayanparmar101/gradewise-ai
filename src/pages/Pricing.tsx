import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  { name: "Starter", price: "Free", description: "For small classes", features: ["Up to 30 students", "5 assignments/month", "PDF & DOCX support", "Basic AI feedback", "Email support"] },
  { name: "Professional", price: "$49/mo", description: "For departments", featured: true, features: ["Up to 200 students", "Unlimited assignments", "All file formats", "Advanced AI analytics", "Plagiarism detection", "Priority support"] },
  { name: "Enterprise", price: "Custom", description: "For institutions", features: ["Unlimited students", "Custom integrations", "Dedicated AI models", "SSO & compliance", "SLA guarantee", "Dedicated support"] },
];

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-32 pb-20">
      <div className="container px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Simple Pricing</h1>
          <p className="text-lg text-muted-foreground">Choose the plan that fits your institution.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl border ${plan.featured ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border bg-card"}`}>
              <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              <p className="text-4xl font-display font-bold text-foreground mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button className="w-full" variant={plan.featured ? "default" : "outline"}>Get Started</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Pricing;
