import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { formatINR } from "@/data/courses";
import CheckoutDialog from "@/components/CheckoutDialog";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, total, isOpen, closeCart, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (!user) {
      toast.info("Please sign in to continue checkout");
      closeCart();
      navigate("/student-login", { state: { from: "/", openCart: true } });
      return;
    }
    setCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(o) => (o ? null : closeCart())}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag size={20} /> Your Cart ({items.length})
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-3">
              <ShoppingBag size={48} className="opacity-30" />
              <p>Your cart is empty</p>
              <Button variant="outline" onClick={closeCart}>Browse Courses</Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-lg border border-border bg-card/60"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-primary font-semibold">{item.category}</div>
                        <div className="font-semibold text-sm leading-snug truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.duration}</div>
                        <div className="text-base font-bold mt-1">{formatINR(item.price)}</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatINR(total)}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="gradient-text">{formatINR(total)}</span>
                </div>
                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
};

export default CartDrawer;
