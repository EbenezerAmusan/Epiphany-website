import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/logo_1770291650027.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/piglet-sales", label: "Piglet for Sale" },
  { href: "/showcase", label: "Showcase" },
  { href: "/farm-experience", label: "Farm Experience" },
  { href: "/events", label: "Host an Event" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="absolute top-0 left-0 right-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center" data-testid="link-home-logo">
            <img
              src={logoImg}
              alt="Epiphany Global"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span
                  className={`text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-brand-orange"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden lg:block">
              <Button
                className="bg-brand-green text-white font-medium px-6 rounded-full"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-black/80 backdrop-blur-sm rounded-lg mt-2 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span
                    className={`block px-4 py-3 text-base font-medium transition-colors ${
                      location === link.href
                        ? "text-brand-orange"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                data-testid="link-mobile-nav-contact-us"
              >
                <span className="block px-4 py-3 text-base font-medium text-brand-green">
                  Contact Us
                </span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
