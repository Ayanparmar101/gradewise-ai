import { Link } from "react-router-dom";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
const footerLinks = {
  product: [{
    label: "Features",
    href: "/features"
  }, {
    label: "Pricing",
    href: "/pricing"
  }, {
    label: "Demo",
    href: "/features"
  }, {
    label: "Documentation",
    href: "/docs"
  }],
  company: [{
    label: "About",
    href: "/about"
  }, {
    label: "Careers",
    href: "/careers"
  }, {
    label: "Press",
    href: "/press"
  }, {
    label: "Contact",
    href: "/contact"
  }],
  legal: [{
    label: "Privacy Policy",
    href: "/privacy"
  }, {
    label: "Terms of Service",
    href: "/terms"
  }, {
    label: "Cookie Policy",
    href: "/cookies"
  }, {
    label: "GDPR",
    href: "/gdpr"
  }]
};
export const Footer = () => {
  return <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-sidebar-primary">
                <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">GradeAI</span>
            </Link>
            <p className="text-sidebar-foreground/70 mb-6 max-w-sm leading-relaxed">
              Transforming academic assessment with AI-powered grading that's fair, 
              transparent, and scalable for modern education.
            </p>
            
          </div>

          {/* Links */}
          

          

          
        </div>

        {/* Bottom */}
        
      </div>
    </footer>;
};