import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CartItem } from "@shared/schema";

function getOrCreateCartId(): string {
  const CART_ID_KEY = "epiphany_cart_id";
  let cartId = localStorage.getItem(CART_ID_KEY);
  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(CART_ID_KEY, cartId);
  }
  return cartId;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState<string>("");

  useEffect(() => {
    setCartId(getOrCreateCartId());
  }, []);

  const { data: items = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart", cartId],
    queryFn: async () => {
      if (!cartId) return [];
      const res = await fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: !!cartId,
  });

  const addMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      return apiRequest("POST", "/api/cart", { productId, quantity, sessionId: cartId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", cartId] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return apiRequest("DELETE", `/api/cart/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", cartId] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${itemId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", cartId] });
    },
  });

  const addToCart = useCallback(
    async (productId: string, quantity = 1) => {
      await addMutation.mutateAsync({ productId, quantity });
    },
    [addMutation]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      await removeMutation.mutateAsync(itemId);
    },
    [removeMutation]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      await updateMutation.mutateAsync({ itemId, quantity });
    },
    [updateMutation]
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
