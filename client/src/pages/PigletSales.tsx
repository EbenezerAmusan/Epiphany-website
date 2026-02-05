import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cartContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

import heroImg from "@assets/nature_product_backdrop_farm_sunlight_1_2d74e6_1770289247872.jpg";
import reservePigImg from "@assets/img_20250703_wa0113_1_2d7170_1770289247870.jpg";
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
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/piglet-reservations", formData);
      toast({
        title: "Reservation Submitted",
        description: "We'll contact you soon about your piglet reservation.",
      });
      setFormData({ name: "", phone: "", email: "", comments: "" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                data-testid="text-reserving-title"
              >
                RESERVING A PIG
              </h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  A non refundable deposit of $100 per animal will secure your purchase of a pig or piglet. Deposits are applied on specific piglets after 8 weeks of age.
                </p>
                <p>
                  Piglets are reserved on a first-come, first-serve basis and come with care instructions.
                </p>
                <p>
                  Deposits are non-refundable, but can be applied to another litter of choosing if the first choice can not be fulfilled.
                </p>
                <p>
                  Best Place Farms retains the right to reserve any piglet from a litter for our own breeding program.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={reservePigImg}
                alt="Pig in pen"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold text-gray-900 mb-8"
            data-testid="text-form-title"
          >
            To get put on a waiting list for reserve a piglet, please complete the form below:
          </h2>

          <form onSubmit={handleSubmit} className="max-w-md space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Name:</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-300"
                required
                data-testid="input-reservation-name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone number:</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-gray-300"
                required
                data-testid="input-reservation-phone"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Email Address:</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-gray-300"
                required
                data-testid="input-reservation-email"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Comments (if any):</label>
              <Textarea
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="border-gray-300 min-h-[120px]"
                data-testid="input-reservation-comments"
              />
            </div>

            <Button
              type="submit"
              className="bg-brand-green text-white"
              disabled={isSubmitting}
              data-testid="button-reservation-submit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
