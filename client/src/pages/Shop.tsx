import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cartContext";
import type { Product } from "@shared/schema";

import shopHeroImg from "@assets/happy__1_1_9eb14b_1770286207009.jpg";
import goatImg from "@assets/adorable_black_goat_with_brown_patterns_zoo_1_4543c9_1770286207003.jpg";
import pigImg from "@assets/closeup_farm_pig_foraging_food_muddy_ground_beside_wooden_fenc_1770286207004.jpg";
import cowImg from "@assets/cows_standing_green_field_front_fuji_mountain_japan_1_9f27c2_1770286207005.jpg";
import curryImg from "@assets/curry_spice_bowl_1_1_7b3bab_1770286207006.jpg";
import pigSpotImg from "@assets/cute_pig_with_black_spot_d0346e_1770286207007.jpg";
import garlicImg from "@assets/garlic_1_4186e7_1770286207007.jpg";
import gingerImg from "@assets/ginger_1_12e044_1770286207008.jpg";
import palmOilImg from "@assets/palm_oil_1_a75e74_1770286207011.jpg";
import pepperImg from "@assets/pepper_2_1_bda6b5_1770286207011.jpg";
import pigsImg from "@assets/photorealistic_scene_with_pigs_raised_farm_environment_1_41400_1770286207012.jpg";
import snailImg from "@assets/slimy_snail_crawling_green_leaf_outdoors_generated_by_ai_1_b36_1770286207012.jpg";
import thymeImg from "@assets/thyme_1_086877_1770286207013.jpg";
import tomatoImg from "@assets/tomato_1_fb9d01_1770286207014.jpg";

const productImageMap: Record<string, string> = {
  "Palm Oil - 5 Ltr": palmOilImg,
  "Tomatoes": tomatoImg,
  "Pepper": pepperImg,
  "Spices - Curry": curryImg,
  "Spices - Thyme": thymeImg,
  "Spices - Ginger": gingerImg,
  "Spices - Garlic": garlicImg,
  "TN - Piglet": pigSpotImg,
  "Landrace - Piglet": pigImg,
  "Duroc - Piglet": pigsImg,
  "Cow": cowImg,
  "Goat": goatImg,
  "Giant Land Snail": snailImg,
};

export default function Shop() {
  const { addToCart } = useCart();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getProductImage = (product: Product) => {
    return productImageMap[product.name] || product.image || palmOilImg;
  };

  const cropProducts = products.filter((p) => p.category === "crops");
  const animalProducts = products.filter((p) => p.category === "animals");

  const renderProductCard = (product: Product) => (
    <Card
      key={product.id}
      className="overflow-hidden bg-gray-100 border-0"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={getProductImage(product)}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3
          className="font-semibold text-brand-orange mb-1"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <p
          className="text-gray-600 text-sm mb-3"
          data-testid={`text-product-price-${product.id}`}
        >
          {formatPrice(product.price)} {product.priceUnit}
        </p>
        <Button
          variant="outline"
          className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white text-sm px-4 py-1 h-auto"
          onClick={() => addToCart(product.id, 1)}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          Buy Now
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src={shopHeroImg}
            alt="Farm workers with fresh produce"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white"
              data-testid="text-shop-title"
            >
              Shop
            </h1>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse bg-gray-100 border-0">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                className="text-3xl md:text-4xl font-bold text-brand-green mb-8"
                data-testid="text-section-crops"
              >
                Crops
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cropProducts.map(renderProductCard)}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                className="text-3xl md:text-4xl font-bold text-brand-green mb-8"
                data-testid="text-section-animals"
              >
                Animals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {animalProducts.map(renderProductCard)}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
