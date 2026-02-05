import heroImg from "@assets/nature_product_backdrop_farm_sunlight_1_2d74e6_1770289247872.jpg";

export default function PigletSales() {
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
    </div>
  );
}
