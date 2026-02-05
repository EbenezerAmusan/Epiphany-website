import heroImg from "@assets/img_20250703_wa0086_1_bc6300_1770290316351.jpg";
import tn20BoarImg from "@assets/img_20250703_wa0068_1_bc8fd2_1770290316350.jpg";
import tn20PigletImg from "@assets/img_20250703_wa0067_1_4017df_1770290316348.jpg";
import tn70BoarImg from "@assets/img_20250703_wa0069_1_b1da4c_1770290316350.jpg";
import durocLandraceImg from "@assets/img_20250703_wa0107_1_9500cb_1770290316352.jpg";
import durocBrownImg from "@assets/img_20250703_wa0108_1_fe09fb_1770290316353.jpg";
import tn20SowImg from "@assets/img_20250703_wa0090_1_5f69e9_1770290316352.jpg";

const breedGallery = [
  {
    id: "tn20-boar",
    image: tn20BoarImg,
    title: "Topigs Norsvin (TN20) Boar",
  },
  {
    id: "tn20-piglet",
    image: tn20PigletImg,
    title: "Topigs Norsvin (TN20) Piglet",
  },
  {
    id: "tn70-boar",
    image: tn70BoarImg,
    title: "Topigs Norsvin (TN70) Boar\nHighbreed of TN20 and landrace",
  },
  {
    id: "duroc-landrace",
    image: durocLandraceImg,
    title: "Duroc and Landrace Breed",
  },
  {
    id: "duroc-brown",
    image: durocBrownImg,
    title: "Duroc (Brown)\nLandrace (White with Yellow Ear tag)",
  },
  {
    id: "tn20-sow",
    image: tn20SowImg,
    title: "Topigs Norsvin (TN20) Sow",
  },
];

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

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {breedGallery.map((breed) => (
              <div key={breed.id} data-testid={`card-breed-${breed.id}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                  <img
                    src={breed.image}
                    alt={breed.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="text-sm text-brand-green font-medium whitespace-pre-line"
                  data-testid={`text-breed-title-${breed.id}`}
                >
                  {breed.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
