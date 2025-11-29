import { Star } from "lucide-react";

interface ServiceItem {
  title: string;
  price: string;
}

interface Props {
  logo: string;
  name: string;
  status: string;
  distance: string;
  ratings: string;
  reviews: string;
  tags: string[];
  highlights: string[];
  services: ServiceItem[];
  onBookNow: () => void;
}

export default function MechanicCard({
  logo,
  name,
  status,
  distance,
  ratings,
  reviews,
  tags,
  highlights,
  services,
  onBookNow
}: Props) {
  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-2xl p-4">

      {/* ===================== ROW 1 ===================== */}
      <div className="flex gap-6">

        {/* IMAGE */}
        <div className="bg-gray-50 border rounded-xl h-[130px] w-[200px] flex items-center justify-center shrink-0">
          <img src={logo} className="h-24 object-contain" />
        </div>

        {/* CENTER CONTENT */}
        <div className="flex flex-col justify-between py-1 flex-grow">

          {/* TITLE + STATUS + DISTANCE */}
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>

            <div className="text-green-600 text-sm font-medium">
              Open <span className="text-gray-400 mx-1">•</span> Closes 9:30 PM
            </div>

            <div className="flex items-center gap-2 text-sm mt-1">
              <img src="/icons/bike.svg" className="w-4" />
              <span>{distance}</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="flex items-center gap-1 text-blue-600">
                5 Mins Drive
                <img src="/icons/direction.svg" className="w-3" />
              </span>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2 text-sm mt-2">
              <span className="text-[22px] font-semibold">{ratings}</span>
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-500">({reviews} Reviews)</span>
            </div>
          </div>
        </div>

        {/* WHAT WE DO – RIGHT */}
        <div className="w-[270px]">
          <h3 className="font-semibold mb-2">What we do</h3>

          <div className="grid grid-cols-3 gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 bg-gray-100 border rounded-full px-3 py-1.5 text-xs"
              >
                <img src="/icons/tag.svg" className="w-4 h-4" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== ROW 2 ===================== */}
      <div className="flex gap-4 mt-5">

        {/* PEACH BOX LEFT */}
        <div className="bg-[#FFF3EA] border border-[#F5D6C5] rounded-xl p-4 w-1/2">
          <h3 className="font-semibold text-sm">Services Requiring Inspection</h3>

          <p className="text-xs text-gray-600 mt-1 mb-3">
            Pricing for these services is available at the workshop.
          </p>

          <ul className="text-sm space-y-1">
            {highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span>{i + 1}.</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <p className="text-blue-600 text-sm mt-1 cursor-pointer">+ 3 more services</p>

          <div className="flex justify-end mt-3">
            <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm">
              Quote on Inspection
            </button>
          </div>
        </div>

        {/* GREEN BOX RIGHT */}
        <div className="bg-[#E8F9F1] border border-[#CDEFE1] rounded-xl p-4 w-1/2">
          <h3 className="font-semibold text-sm">Fixed Price Services</h3>

          <p className="text-xs text-gray-600 mt-1 mb-3">
            These services have fixed prices
          </p>

          <div className="text-sm space-y-1">
            {services.map((s, i) => (
              <div key={i} className="flex justify-between">
                <span>{i + 1}. {s.title}</span>
                <span>{s.price}</span>
              </div>
            ))}
          </div>

          <p className="text-blue-600 text-sm mt-1 cursor-pointer">+ 3 more services</p>

          <div className="flex justify-end mt-3">
            <button
              onClick={onBookNow}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm"
            >
              $4999/-
            </button>
          </div>
        </div>
      </div>

      {/* ===================== ROW 3 (BOOK NOW BUTTON) ===================== */}
      <div className="flex justify-end mt-6">
        <button className="bg-orange-500 text-white px-20 py-3 rounded-xl text-sm">
          Book Now
        </button>
      </div>
    </div>
  );
}
