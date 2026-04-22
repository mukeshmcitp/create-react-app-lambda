import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { toast } from "sonner";

export type Course = {
  id: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  level: string;
};

export type CartItem = Course & { qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (course: Course) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "itin_cart_v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items]);

  const addItem = useCallback((course: Course) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === course.id);
      if (existing) {
        toast.info("Already in cart");
        return prev;
      }
      toast.success(`${course.title} added to cart`);
      return [...prev, { ...course, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, total, isOpen, openCart, closeCart, addItem, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    // Safe no-op fallback so components don't crash if rendered outside the
    // provider (e.g. during HMR before the new provider has mounted).
    return {
      items: [],
      count: 0,
      total: 0,
      isOpen: false,
      openCart: () => {},
      closeCart: () => {},
      addItem: () => {},
      removeItem: () => {},
      clear: () => {},
    } as CartContextValue;
  }
  return ctx;
};
