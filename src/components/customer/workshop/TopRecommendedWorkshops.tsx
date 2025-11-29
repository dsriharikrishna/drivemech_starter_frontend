import RecommendedWorkshopCard from "./RecommendedWorkshopCard";

export default function TopRecommendedWorkshops() {
  const workshops = [
    {
      logo: "/garage-logo.png",
      name: "A to Z Services",
      rating: 4.5,
      reviews: 120,
      distance: "2Kms",
      driveTime: "5 Mins Drive",
      tags: ["Periodic Service", "AC Repair"],
      buttonText: "Book Now — 20% Off",
    },
    {
      logo: "/garage-logo.png",
      name: "Car Fix Experts",
      rating: 4.5,
      reviews: 120,
      distance: "2Kms",
      driveTime: "5 Mins Drive",
      tags: ["Tyre Care", "Wheel Alignment"],
      buttonText: "View Offers",
    },
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
      <h2 className="font-semibold text-lg mb-3">Top Recommended Workshops For You</h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {workshops.map((ws) => (
          <RecommendedWorkshopCard
            key={ws.name}
            {...ws}
            onClick={() => alert(ws.name)}
          />
        ))}
      </div>
    </div>
  );
}
