import { motion } from "framer-motion";
import { Target, Users, Briefcase, Lightbulb, Rocket } from "lucide-react";

const features = [
  { icon: Target, title: "DevOps Engineering", desc: "Full-lifecycle DevOps consulting and implementation" },
  { icon: Users, title: "Cloud Computing", desc: "AWS, Azure, GCP architecture and deployment" },
  { icon: Briefcase, title: "CI/CD Automation", desc: "Streamlined pipelines for rapid delivery" },
  { icon: Lightbulb, title: "Infrastructure as Code", desc: "Terraform, Ansible, CloudFormation mastery" },
  { icon: Rocket, title: "Monitoring & Observability", desc: "End-to-end visibility across your stack" },
];

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
            Global DevOps Training & <span className="gradient-text">Consulting</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            ITIN Abroad Service is a global DevOps training and consulting company dedicated to bridging the gap between theory and real-world implementation. We offer live projects, mentorship, and job-oriented training.
          </p>
          <div className="p-5 rounded-xl glow-border bg-card/50">
            <p className="text-foreground font-medium italic">
              "Our mission is to empower professionals with industry-ready DevOps skills through hands-on training, live project experience, and continuous support."
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-card/50 glow-border card-hover"
            >
              <div className="p-2.5 rounded-lg gradient-bg shrink-0">
                <f.icon size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
