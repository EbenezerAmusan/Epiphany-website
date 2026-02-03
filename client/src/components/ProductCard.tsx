import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cartContext";
import { Loader2, Package } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  priceUnit?: string | null;
  image?: string | null;
  category?: string;
}

export function ProductCard({
  id,
  name,
  price,
  priceUnit,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(id);
    } finally {
      setIsAdding(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden bg-white border-gray-100 hover-elevate" data-testid={`card-product-${id}`}>
      <div className="aspect-square overflow-hidden bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1" data-testid={`text-product-name-${id}`}>{name}</h3>
        <p className="text-brand-blue font-semibold mb-4" data-testid={`text-product-price-${id}`}>
          {formatPrice(price)} {priceUnit && <span className="text-gray-500 text-sm font-normal">{priceUnit}</span>}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-brand-blue text-brand-blue"
            onClick={handleAddToCart}
            disabled={isAdding}
            data-testid={`button-add-to-cart-${id}`}
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-brand-blue text-white"
            onClick={handleAddToCart}
            disabled={isAdding}
            data-testid={`button-buy-now-${id}`}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
