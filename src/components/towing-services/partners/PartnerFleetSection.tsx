import CustomCard from "@/components/ui/CustomCard";

export function PartnerFleetSection() {
  const fleet = [
    {
      title: "Flatbed Tow Trucks",
      img: "/images/towing-services/partners/PartnersFleet.png",
      points: ["Secured transportation", "Low-angle loading", "Ideal for luxury cars"],
    },
    {
      title: "Heavy Duty Towing",
      img: "/images/towing-services/partners/PartnersFleet.png",
      points: ["For commercial trucks", "Oversized vehicles", "Specialized equipment"],
    },
    {
      title: "Motorcycle Towing",
      img: "/images/towing-services/partners/PartnersFleet.png",
      points: ["Specialized equipment", "Strap-lock system", "All vehicle types"],
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">

        <h2 className="text-2xl font-semibold text-gray-heading">
          Our Professional Fleet
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Tailor the right tow for your service needs using our strong fleet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {fleet.map((item, idx) => (
            <CustomCard key={idx} className="p-0 border rounded-xl">
              <img
                src={item.img}
                className="w-full h-[160px] rounded-t-xl object-cover"
                alt=""
              />

              <div className="p-4 text-left">
                <h3 className="font-semibold text-gray-heading">{item.title}</h3>

                <ul className="mt-2 space-y-1">
                  {item.points.map((pt, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-1">
                      <span className="text-orange-500">•</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </CustomCard>
          ))}
        </div>

      </div>
    </section>
  );
}
