import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Copy, Check, Phone, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PHONE = "+91-9529994652";
const PHONE_RAW = "919529994652"; // E.164 without +
const UPI_ID = "9529994652@upi"; // generic UPI handle using the number

const waLink =
  "https://api.whatsapp.com/send?phone=919529994652&text=Hi%20I%20am%20interested%20in%20your%20services";
const gpayLink = `upi://pay?pa=${UPI_ID}&pn=ITIN%20Abroad%20Service&cu=INR`;
const phonepeLink = `phonepe://pay?pa=${UPI_ID}&pn=ITIN%20Abroad%20Service&cu=INR`;

const ContactPaymentWidget = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      toast({ title: "Copied!", description: `${label} copied to clipboard.` });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please copy manually." });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] rounded-2xl bg-card/95 border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base">Quick Contact & Pay</h4>
                  <p className="text-xs opacity-90">We typically reply within minutes</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Phone with copy */}
              <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background/80 px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Phone size={16} className="text-primary shrink-0" />
                  <span className="font-mono text-sm truncate">{PHONE}</span>
                </div>
                <button
                  onClick={() => copy(PHONE, "Phone number")}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                  aria-label="Copy phone number"
                >
                    {copied === "Phone number" ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} className="text-muted-foreground" />
                    )}
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold py-2.5 transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <MessageCircle size={18} fill="currentColor" />
                Chat on WhatsApp
              </a>

              {/* Payments */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Pay via UPI
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={gpayLink}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg border border-border bg-background/80 hover:bg-muted py-3 transition-all hover:scale-[1.03] hover:border-primary"
                  >
                    <span className="font-bold text-base bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
                      G Pay
                    </span>
                    <span className="text-[10px] text-muted-foreground">Google Pay</span>
                  </a>
                  <a
                    href={phonepeLink}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg border border-border bg-background/80 hover:bg-muted py-3 transition-all hover:scale-[1.03] hover:border-primary"
                  >
                    <span className="font-bold text-base text-[#5f259f]">PhonePe</span>
                    <span className="text-[10px] text-muted-foreground">UPI Payment</span>
                  </a>
                </div>

                {/* UPI ID copy */}
                <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-dashed border-border bg-background/60 px-3 py-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase text-muted-foreground tracking-wider">UPI ID</span>
                    <span className="font-mono text-xs truncate">{UPI_ID}</span>
                  </div>
                  <button
                    onClick={() => copy(UPI_ID, "UPI ID")}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors"
                    aria-label="Copy UPI ID"
                  >
                    {copied === "UPI ID" ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} className="text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Trust note */}
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck size={12} className="text-green-600" />
                Secure payments via UPI (Google Pay / PhonePe)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact widget" : "Open contact and payment options"}
        className="relative h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
        {open ? <X size={24} /> : <MessageCircle size={26} fill="currentColor" />}
      </motion.button>
    </div>
  );
};

export default ContactPaymentWidget;
