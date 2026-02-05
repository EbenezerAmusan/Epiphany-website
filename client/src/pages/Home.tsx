import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

import heroImg from "@assets/agriculture_healthy_food__1__d54b44_1770114904940.jpg";
import palmOilImg from "@assets/palm_oil_1_a75e74_1770114904945.jpg";
import tomatoImg from "@assets/tomato_1_fb9d01_1770114904946.jpg";
import pepperImg from "@assets/pepper_2_1_bda6b5_1770114904945.jpg";
import pigImg from "@assets/img_20250703_wa0086_2_bc6300_1770114904941.jpg";
import pigsImg from "@assets/img_20250703_wa0107_2_9500cb_1770114904942.jpg";
import farmersImg from "@assets/medium_shot_smiley_african_people_1_637361_1770114904944.jpg";
import farmBuildingImg from "@assets/img_20251016_wa0030_1_d46390_1770114904943.jpg";
import goatImg from "@assets/adorable_black_goat_with_brown_patterns_zoo_3_07320f_1770114904939.jpg";

const productImages: Record<string, string> = {
  "Palm Oil - 5 Ltr": palmOilImg,
  "Tomatoes": tomatoImg,
  "Pepper": pepperImg,
  "TN - Piglet": pigImg,
  "Goat": goatImg,
};

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cropsProducts = products
    .filter((p) => p.category === "crops")
    .slice(0, 3)
    .map((p) => ({
      ...p,
      image: productImages[p.name] || p.image,
    }));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Farm field with tractor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <span className="text-white">Premium, Farm-fresh</span>
              <br />
              <span className="text-white">produce. </span>
              <span className="text-brand-orange italic">Grown Responsibly,</span>
              <br />
              <span className="text-brand-orange italic">Delivered Nationwide.</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-10">
              From Field to your Doorstep, Shop
              <br />
              Trusted Quality from our Mixed Farm.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-brand-green text-white font-semibold px-10 py-6 rounded-full text-base"
                data-testid="button-hero-shop-now"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Preview Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-brand-green mb-12">
            Shop
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden p-4">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <div className="pt-4">
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-4 w-1/3 mt-2" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              cropsProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4"
                  data-testid={`card-shop-product-${product.id}`}
                >
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <img
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-bold text-gray-900">{product.name.split(" - ")[0]}</h3>
                    <p className="text-gray-600 mt-1">NGN {product.price.toLocaleString()}</p>
                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1 border-brand-green text-brand-green rounded-full"
                        data-testid={`button-add-to-cart-${product.id}`}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        className="flex-1 bg-brand-green text-white rounded-full"
                        data-testid={`button-buy-now-${product.id}`}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop">
              <Button
                variant="outline"
                className="border-brand-green text-brand-green rounded-full px-6"
                data-testid="button-view-all-shop"
              >
                View all <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Piglet Reserve & Sales Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Piglet - Reserve & Sales
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  TN Piglet start at 150,000 naira at weaning. Price goes up with age.
                </p>
                <p>
                  Landrace Piglet start at 150,000 naira at weaning. Price goes up with age.
                </p>
                <p>
                  Proven Breeding Stock starts at 200,000 naira. Discounts are available for multiple purchases
                </p>
              </div>
              <Link href="/piglet-sales">
                <Button
                  className="mt-8 bg-brand-blue text-white"
                  data-testid="button-view-piglet-sales"
                >
                  View all
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={pigImg}
                  alt="Farm pig"
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breed Showcase Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-lg overflow-hidden">
              <img
                src={pigsImg}
                alt="Pig breeds at Epiphany Farms"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Breed Showcase
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At Epiphany Farms, we believe good pigs should not only grow well but also be easy to care for. That's why our breeding program focuses on pigs with calm and friendly behavior.
                </p>
                <p>
                  From the caring TN70 sow to the strong TN Duroc boar, our pigs are gentle, easy to handle, and cause less stress on the farm — making your work smoother and more enjoyable every day.
                </p>
              </div>
              <Link href="/showcase">
                <Button
                  className="mt-8 bg-brand-blue text-white"
                  data-testid="button-view-showcase"
                >
                  View all
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guided Farm Experience Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Guided Farm Experience
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Walk through our fields, meet our farmers, and see the care behind every harvest.
                </p>
                <p>
                  We blend traditional methods with innovation using smart irrigation, organic composting, and responsible livestock management to keep our soil fertile and our produce pure.
                </p>
                <div className="flex items-start gap-2 pt-2">
                  <MapPin className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Located in Plot 1-5, Epiphany Street, Akiti area, Egbeda Local Govt., Ibadan, Oyo State
                  </p>
                </div>
              </div>
              <Link href="/farm-experience">
                <Button
                  className="mt-8 bg-brand-blue text-white"
                  data-testid="button-view-farm-experience"
                >
                  View all
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={farmersImg}
                  alt="Farmers at Epiphany Farms"
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host an Event Section */}
      <section className="py-16 md:py-24 bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Host an Event
          </h2>
          <h3 className="text-xl md:text-2xl text-brand-yellow font-semibold mb-8">
            Welcome to Epiphany Farms!
          </h3>
          <div className="max-w-3xl mx-auto space-y-6 text-white/90">
            <p>
              We love to share our farm with visitors, families, schools, and groups. Come and see how real food is grown. You can join our farm tours, taste fresh food, and enjoy special farm events that help you connect with nature.
            </p>
            <p>
              Need a nice countryside place for your event? Our farm is open for retreats, photoshoots, birthdays, and private gatherings — all in a calm and beautiful environment filled with fresh air.
            </p>
          </div>
          <Button
            size="lg"
            className="mt-10 bg-brand-yellow text-brand-blue-dark font-semibold px-8"
            data-testid="button-events-coming-soon"
          >
            Coming Soon
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            About Us
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-center">
            <p>
              At Epiphany Global, we believe good pigs should not only grow well but also be easy to handle.
            </p>
            <p>
              That's why we focus on breeding pigs that are calm, friendly, and gentle.
            </p>
            <p>
              From the caring TN70 mother pig to the strong TN Duroc boar, our pigs are peaceful and easy to manage. They mix well with people and other pigs, making the farm safer and more enjoyable.
            </p>
            <p>
              Because of their calm nature, our pigs are healthier, grow better, and make daily work easier. Whether you have a big farm or a small one, Epiphany Farms can help you get the best results with less stress.
            </p>
          </div>
        </div>
      </section>

      {/* Farm Building Image Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden">
              <img
                src={farmBuildingImg}
                alt="Epiphany Farm building"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={goatImg}
                alt="Farm goat"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
