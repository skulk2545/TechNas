import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "./ConsultationModal";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const links = [
    { label: "Approach", href: "#approach" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Why TechNas", href: "#why" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 lg:h-20 items-center justify-between px-6 lg:px-8">
        <a href="#" className="font-display text-xl lg:text-2xl font-bold tracking-tight text-foreground">
          Tech<span className="text-primary">Nas</span>
        </a>

        <div className="hidden items-center gap-8 lg:gap-10 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm lg:text-base text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <Button size="sm" className="glow-sm lg:h-11 lg:px-6 lg:text-base" onClick={() => setModalOpen(true)}>
            Request a Consultation
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <Button size="sm" className="mt-3 w-full glow-sm" onClick={() => setModalOpen(true)}>
            Request a Consultation
          </Button>
        </div>
      )}

      <ConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </nav>
  );
};

export default Navbar;
