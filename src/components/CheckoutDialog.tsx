import { useEffect, useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Loader2, Smartphone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/data/courses";
import { toast } from "sonner";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
});

// Configure your business UPI ID here
const UPI_ID = "itinabroadservices@upi";
const UPI_PAYEE = "ITIN Abroad Services";

type Step = "details" | "pay" | "success";

const CheckoutDialog = ({ open, onOpenChange }: Props) => {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("details");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && user) {
      setForm((f) => ({ ...f, email: f.email || user.email || "" }));
    }
    if (!open) {
      setStep("details");
      setErrors({});
      setOrderId(null);
    }
  }, [open, user]);

  const buildUpiLink = (app: "phonepe" | "gpay") => {
    const tn = `Order ${orderId?.slice(0, 8) ?? ""}`;
    const params = new URLSearchParams({
      pa: UPI_ID,
      pn: UPI_PAYEE,
      am: total.toFixed(2),
      cu: "INR",
      tn,
      tr: orderId ?? `ORD${Date.now()}`,
    });
    const query = params.toString();
    if (app === "phonepe") return `phonepe://pay?${query}`;
    if (app === "gpay") return `tez://upi/pay?${query}`;
    return `upi://pay?${query}`;
  };

  const handleCreateOrder = async () => {
    const parsed = detailsSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!user) {
      toast.error("Please sign in first");
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        customer_name: parsed.data.name,
        customer_email: parsed.data.email,
        customer_phone: parsed.data.phone,
        items: items.map((i) => ({ id: i.id, title: i.title, price: i.price, qty: i.qty })),
        total_amount: total,
        status: "pending",
      })
      .select("id")
      .single();

    setSubmitting(false);
    if (error || !data) {
      toast.error(error?.message ?? "Could not create order");
      return;
    }
    setOrderId(data.id);
    setStep("pay");
  };

  const handlePay = (app: "phonepe" | "gpay") => {
    const link = buildUpiLink(app);
    const fallback = `upi://pay?${new URLSearchParams({
      pa: UPI_ID,
      pn: UPI_PAYEE,
      am: total.toFixed(2),
      cu: "INR",
      tn: `Order ${orderId?.slice(0, 8) ?? ""}`,
      tr: orderId ?? "",
    }).toString()}`;

    // Try app-specific deep link, fall back to generic UPI intent
    const win = window.open(link, "_self");
    setTimeout(() => {
      if (!win || win.closed) window.location.href = fallback;
    }, 400);

    toast.info("Complete payment in your UPI app, then return here.");
  };

  const handleConfirmPaid = async () => {
    if (!orderId) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("id", orderId);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setStep("success");
    clear();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>Confirm your details to proceed to payment.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4 bg-card/40 space-y-2 max-h-48 overflow-y-auto">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span className="truncate pr-2">{i.title}</span>
                    <span className="font-medium shrink-0">{formatINR(i.price)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="gradient-text">{formatINR(total)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="co-name">Full Name</Label>
                  <Input
                    id="co-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="co-email">Email</Label>
                  <Input
                    id="co-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="co-phone">Phone (10-digit)</Label>
                  <Input
                    id="co-phone"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleCreateOrder} disabled={submitting}>
                {submitting && <Loader2 className="animate-spin" />} Proceed to Payment
              </Button>
            </div>
          </>
        )}

        {step === "pay" && (
          <>
            <DialogHeader>
              <DialogTitle>Pay with UPI</DialogTitle>
              <DialogDescription>
                Choose your UPI app. After completing payment, return and tap "I've Paid".
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4 bg-card/40 text-center">
                <div className="text-xs text-muted-foreground">Amount Payable</div>
                <div className="text-3xl font-bold gradient-text mt-1">{formatINR(total)}</div>
                <div className="text-xs text-muted-foreground mt-2">UPI ID: {UPI_ID}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-auto py-4 flex-col gap-1.5"
                  onClick={() => handlePay("phonepe")}
                >
                  <Smartphone className="text-primary" />
                  <span className="font-semibold">PhonePe</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-auto py-4 flex-col gap-1.5"
                  onClick={() => handlePay("gpay")}
                >
                  <Smartphone className="text-primary" />
                  <span className="font-semibold">Google Pay</span>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                UPI app links work on mobile devices. On desktop, use the UPI ID above.
              </p>

              <Separator />

              <Button className="w-full" size="lg" onClick={handleConfirmPaid} disabled={submitting}>
                {submitting && <Loader2 className="animate-spin" />} I've Completed Payment
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep("details")}>
                Back
              </Button>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="sr-only">Payment successful</DialogTitle>
            </DialogHeader>
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Payment Confirmed!</h3>
              <p className="text-muted-foreground">
                Thank you{form.name ? `, ${form.name}` : ""}. Your enrollment is being processed and a
                confirmation email will be sent to{" "}
                <span className="text-foreground font-medium">{form.email}</span> shortly.
              </p>
              <div className="text-xs text-muted-foreground">Order ID: {orderId}</div>
              <Button className="w-full" onClick={() => onOpenChange(false)}>
                Continue Browsing
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
