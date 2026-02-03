import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import logoImg from "@assets/logo__7ca8a0_1770114904943.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/piglet-sales", label: "Piglet for Sale" },
  { href: "/showcase", label: "Showcase" },
  { href: "/farm-experience", label: "Farm Experience" },
  { href: "/events", label: "Host an Event" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Sign up for our Newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-0"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="bg-brand-yellow text-brand-blue-dark font-semibold"
                data-testid="button-newsletter-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Send"}
              </Button>
            </form>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-brand-yellow mt-0.5 flex-shrink-0" />
              <a
                href="mailto:epiphanyltdenq@gmail.com"
                className="text-sm text-white/80 hover:text-white transition-colors"
                data-testid="link-footer-email"
              >
                epiphanyltdenq@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-brand-yellow mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white/80">
                Plot 1-5, Epiphany Street, Akiti area,
                <br />
                Egbeda Local Govt., Ibadan, Oyo State
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-brand-yellow mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white/80">
                <a
                  href="tel:+2347068074620"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-phone-1"
                >
                  070 6807 4620
                </a>
                ,{" "}
                <a
                  href="tel:+2349114013237"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-phone-2"
                >
                  091 1401 3237
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src={logoImg}
            alt="Epiphany Global Farms"
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="text-sm text-white/70">
            2025 Epiphany Global Farms. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
