import heroImg from "@assets/photorealistic_woman_organic_sustainable_garden_harvesting_pro_1770290917087.jpg";

export default function FarmExperience() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Woman in farm field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              data-testid="text-experience-title"
            >
              Guided Farm<br />
              Experience
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-2"
                data-testid="text-visit-title"
              >
                Guided Farm Visit:
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="line-through">₦50,000</span> for up to 2 people
              </p>
              <p className="text-gray-700 mb-4">
                (Extra guests: <span className="line-through">₦20,000</span> per adult / <span className="line-through">₦15,000</span> per child)
              </p>
              <p className="text-gray-700">
                Epiphany Global Farms is home to friendly pigs and other farm animals. Come visit our farm and see how we raise our animals in a natural and happy way. You'll get to meet our calm and gentle pigs, learn about how they live, and enjoy time outdoors with nature.
              </p>
            </div>

            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-3"
                data-testid="text-included-title"
              >
                What's Included:
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Free bottled water</li>
                <li>Free parking space</li>
              </ul>
            </div>

            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-3"
                data-testid="text-meeting-title"
              >
                Meeting Place & Pickup:
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>
                  Epiphany Global Farms,<br />
                  Plot 1-5, Epiphany Street, Akiti area, Egbeda Local Govt, Osun State
                </p>
                <p>
                  Start Time: 10:00 AM<br />
                  End Time: 12:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
