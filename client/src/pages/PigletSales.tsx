import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cartContext";

import heroImg from "@assets/nature_product_backdrop_farm_sunlight_1_2d74e6_1770289247872.jpg";
import tn70Img from "@assets/img_20251016_wa0037_1_9efc43_1770289247870.jpg";
import landraceImg from "@assets/img_20250703_wa0113_1_2d7170_1770289247870.jpg";
import durocImg from "@assets/photorealistic_scene_with_pigs_raised_farm_environment_1_41400_1770286207012.jpg";

const pigletProducts = [
  { id: "tn70", name: "TN70", price: 150000, image: tn70Img },
  { id: "landrace", name: "Landrace", price: 150000, image: landraceImg },
  { id: "duroc", name: "Duroc", price: 180000, image: durocImg },
];

export default function PigletSales() {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Farm at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              data-testid="text-piglet-title"
            >
              Piglet -<br />
              Reserve &<br />
              Sales
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-semibold text-gray-900 mb-6"
            data-testid="text-pig-prices-title"
          >
            Our Pig Prices
          </h2>

          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
            <li>
              TN pigs start from <span className="line-through">₦150,000</span> when they are still young (weaned). The price increases as they grow older.
            </li>
            <li>
              Registered breeding pigs (under 1 year) cost between ₦200,000 and ₦500,000.
            </li>
            <li>
              Proven breeding pigs start from <span className="line-through">₦850,000</span>.
            </li>
            <li>We give discounts when you buy more than one pig.</li>
          </ul>

          <div className="space-y-4 text-gray-700 mb-12">
            <p>
              All our pigs are registered, we don't sell unregistered animals.
              <br />
              Each piglet is registered with AKKPS, and new owners can also register with IKHR if they want.
            </p>
            <p>
              We also have piglets for school farm projects, training, and rearing.
              <br />
              If you are interested or want to ask questions, please send us an email, we'll reply as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pigletProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden bg-gray-100 border-0"
                data-testid={`card-piglet-${product.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold text-brand-orange mb-1"
                    data-testid={`text-piglet-name-${product.id}`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-brand-green font-semibold mb-3"
                    data-testid={`text-piglet-price-${product.id}`}
                  >
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:bg-gray-200 text-sm px-3 py-1 h-auto"
                      onClick={() => addToCart(product.id, 1)}
                      data-testid={`button-add-to-cart-${product.id}`}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      className="bg-brand-green text-white text-sm px-3 py-1 h-auto"
                      onClick={() => addToCart(product.id, 1)}
                      data-testid={`button-buy-now-${product.id}`}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
