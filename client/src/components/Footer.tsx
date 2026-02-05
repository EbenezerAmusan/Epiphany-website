import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SiFacebook, SiInstagram } from "react-icons/si";

export function Footer({ id }: { id?: string }) {
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
    <footer id={id} className="bg-gray-950">
      <div className="h-1 bg-brand-green" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Sign up for
              <br />
              our Newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex max-w-md">
              <Input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-0 rounded-l-full rounded-r-none px-6"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="bg-brand-green text-white font-semibold rounded-l-none rounded-r-full px-6"
                data-testid="button-newsletter-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Send"}
              </Button>
            </form>
          </div>

          <div className="text-right space-y-4">
            <div className="flex justify-end gap-3 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                data-testid="link-footer-facebook"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                data-testid="link-footer-instagram"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
            </div>
            <a
              href="mailto:epiphanyltdenq@gmail.com"
              className="block text-white hover:text-white/80 transition-colors"
              data-testid="link-footer-email"
            >
              epiphanyltdenq@gmail.com
            </a>
            <p className="text-white">
              Plot 1-5, Epiphany Street, Akiti area,
              <br />
              Egbeda Local Govt., Ibadan, Oyo State
            </p>
            <p className="text-white">
              <a
                href="tel:+2347068074620"
                className="hover:text-white/80 transition-colors"
                data-testid="link-footer-phone-1"
              >
                070 6807 4620
              </a>
              ,{" "}
              <a
                href="tel:+2349114013237"
                className="hover:text-white/80 transition-colors"
                data-testid="link-footer-phone-2"
              >
                091 1401 3237
              </a>
            </p>
            <p className="text-white/70 pt-4">
              © 2025 Epiphany Global Farms. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
