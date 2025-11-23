
/* CardProps stays the same */
type CardProps = {
  image: string;
  title: string;
  description: string;
  buttonText: string;
};

const Card = ({ image, title, description, buttonText }: CardProps) => (
  <div className="bg-white flex flex-row rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300  overflow-hidden h-full w-full">
    {/* Image section */}
    <div className="relative w-[150px] h-full flex items-center justify-center p-2">
      <img 
        src={image}
        alt={title}
        className="object-cover w-[130px] h-[130px] rounded-2xl"
        sizes="(max-width: 768px) 100vw, 25vw"
        style={{ border: '1px solid #E5E7EB' }}
      />
    </div>
    {/* Content section */}
    <div className="flex flex-col flex-1 p-4 gap-2">
      <h3 className="font-manrope text-xl font-bold leading-[1.5] text-gray-900 mb-1">
        {title}
      </h3>
      <p className="font-manrope text-sm font-normal text-gray-600 leading-[1.5] mb-4">
        {description}
      </p>
      <button
        className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-colors font-manrope font-bold text-[14px] w-fit"
        style={{ letterSpacing: '0%' }}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

export default function CustomerGarageSection() {
  return (
    <section id="garages" className="py-16 bg-gray-50 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 font-manrope leading-[1.5]">
          Are you a customer or a Garage Owner?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto">
          <Card
            image="/images/MechBoy.png"
            title="Get Expert Car Care, Hassle-Free"
            description="Find trusted mechanics near you, book car services instantly, and track every repair. Enjoy transparent pricing and personalized care for total peace of mind."
            buttonText="Find Garage"
          />
          <Card
            image="/images/MechGarage.png"
            title="Grow Your Garage, Reach More Customers"
            description="Join DriveMech as a partner to showcase your garage, streamline jobs, and boost your business. Access a larger market, professional management tools, and dedicated support."
            buttonText="Join as Partner"
          />
        </div>
      </div>
    </section>
  );
}
