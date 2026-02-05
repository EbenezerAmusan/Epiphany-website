import heroImg from "@assets/img_20250703_wa0086_1_bc6300_1770290316351.jpg";

export default function BreedShowcase() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Pig in barn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              data-testid="text-showcase-title"
            >
              Breed<br />
              Showcase
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-gray-700">
            <p>
              At Epiphany Global Farms, we believe good pigs should not only grow fast but also be easy to handle. That's why we breed pigs that are calm, friendly, and gentle.
            </p>
            <p>
              From the caring TN70 mother pig to the strong TN Duroc boar, our pigs are peaceful and easy to manage. They behave well with people and other pigs, which makes the farm safer and more enjoyable.
            </p>
            <p>
              Because they are calm, our pigs stay healthy, grow better, and make farm work easier. Whether you run a big farm or a small one, Epiphany Global Farms pigs will help you get the best results with less stress.
            </p>
            <p>
              Our pigs are known not only for good growth but also for their good behavior. They are calm, social, and easy to care for, giving farmers peace of mind and better results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
