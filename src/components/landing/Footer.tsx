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
    href: "/demo"
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
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sidebar-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-sidebar-foreground/50">
            © {new Date().getFullYear()} GradeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
            </a>
            <a href="#" className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>;
};