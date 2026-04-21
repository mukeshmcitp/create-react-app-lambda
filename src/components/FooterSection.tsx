const links = {
  Company: ["About Us", "Courses", "Blog", "Contact"],
  Services: ["Tools Training", "Support Services", "Corporate Training", "Migration Support"],
  Legal: ["Privacy Policy", "Terms & Conditions"],
};

import logo from "@/assets/logo.png";

const FooterSection = () => (
  <footer className="border-t border-border py-12 px-4">
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="ITIN Abroad Service" width={36} height={36} loading="lazy" className="rounded-md" />
            <h3 className="text-xl font-bold gradient-text">ITIN Abroad Service</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Empowering professionals with industry-ready DevOps skills through hands-on training and real-time project support.
          </p>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="font-semibold text-foreground mb-3">{title}</h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ITIN Abroad Service. All rights reserved.
      </div>
    </div>
  </footer>
);

export default FooterSection;
