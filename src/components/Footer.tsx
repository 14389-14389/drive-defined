import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-extrabold text-sm">AD</span>
              </div>
              <span className="font-heading font-bold text-xl">AutoDrive</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              South Africa's premier destination for certified pre-owned luxury and performance vehicles.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Inventory", "Finance", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase()}`} className="text-primary-foreground/70 text-sm hover:text-accent transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                123 Motor Way, Sandton, Johannesburg
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                011 000 1234
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                info@autodrive.co.za
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-primary-foreground/70 text-sm mb-4">Get the latest deals and arrivals.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm"
              />
              <Button size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 text-center text-primary-foreground/50 text-xs">
          © 2026 AutoDrive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
