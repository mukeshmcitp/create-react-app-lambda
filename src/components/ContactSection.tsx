import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const subjectFromType = (type: string | null) => {
  if (type === "enroll") return "Course Enrollment Enquiry";
  if (type === "demo") return "Demo Request";
  return "";
};

const ContactSection = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Pre-fill subject based on ?type=enroll | demo
  useEffect(() => {
    const type = searchParams.get("type");
    const preset = subjectFromType(type);
    if (preset) {
      setForm((f) => ({ ...f, subject: preset }));
      // Scroll to contact section
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [searchParams]);

  const heading = (() => {
    const type = searchParams.get("type");
    if (type === "enroll") return "Enroll Now";
    if (type === "demo") return "Book Your Demo";
    return "Get In Touch";
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    if (form.name.length > 100 || form.email.length > 255 || form.message.length > 2000) {
      toast({ title: "Input exceeds maximum length", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-enquiry", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          subject: form.subject.trim() || "Website Enquiry",
          message: form.message.trim(),
        },
      });

      if (error) throw error;

      toast({
        title: "Enquiry submitted successfully!",
        description: "Our team will contact you shortly.",
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            {heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text">{heading.split(" ").slice(-1)}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="space-y-6 mb-8">
              {[
                { icon: MapPin, label: "Pune, India" },
                { icon: Mail, label: "support@itinabroadservices.com" },
                { icon: Phone, label: "+91-9529994652" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <c.icon size={20} className="text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{c.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setForm((f) => ({ ...f, subject: "Course Enrollment Enquiry" }))}
                className="gradient-bg text-primary-foreground font-bold flex-1"
              >
                Enroll Now
              </Button>
              <Button
                onClick={() => setForm((f) => ({ ...f, subject: "Demo Request" }))}
                variant="outline"
                className="border-border text-foreground hover:bg-muted font-bold flex-1"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 p-6 rounded-xl bg-card/80 border border-border shadow-sm"
          >
            <Input
              placeholder="Your Name *"
              value={form.name}
              maxLength={100}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <Input
              placeholder="Email Address *"
              type="email"
              value={form.email}
              maxLength={255}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <Input
              placeholder="Phone Number"
              value={form.phone}
              maxLength={20}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <Input
              placeholder="Subject"
              value={form.subject}
              maxLength={150}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <Textarea
              placeholder="Your Message *"
              rows={4}
              value={form.message}
              maxLength={2000}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="w-full gradient-bg text-primary-foreground font-bold py-6 text-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
