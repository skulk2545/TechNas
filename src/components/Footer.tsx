const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
      <a href="#" className="font-display text-lg font-bold tracking-tight text-foreground">
        Tech<span className="text-primary">Nas</span>
      </a>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} TechNas. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
