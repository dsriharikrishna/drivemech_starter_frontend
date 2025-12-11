import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";
import { Clock, Flag, MapPin } from "phosphor-react";

export const LiveTrackingScreen = () => (
  <section className="w-full py-6 px-4">
    <div className="mx-auto flex flex-col lg:flex-row gap-6">

      {/* LEFT MAIN AREA */}
      <div className="flex flex-col gap-5 flex-1">

        {/* MAP AREA */}
        <div className="w-full h-[340px] md:h-[420px] bg-gray-200 rounded-xl overflow-hidden">
          <img
            src="/map-placeholder.png"
            className="w-full h-full object-cover"
            alt="Map"
          />
        </div>

        {/* INFO CARDS ROW */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Pickup */}
          <div className="flex items-start gap-3 border border-gray-200 p-4 rounded-xl flex-1">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Pickup Location</p>
              <p className="text-gray-600 text-xs">
                123 Main Road, NH-123, Hyderabad-54
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-3 border border-gray-200 p-4 rounded-xl flex-1">
            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Destination</p>
              <p className="text-gray-600 text-xs">
                Joe’s Auto Repair, ABC Road, Secunderabad
              </p>
            </div>
          </div>

          {/* ETA */}
          <div className="border border-gray-200 p-4 rounded-xl flex-1">
            <p className="font-semibold text-gray-heading text-sm mb-1">
              Estimate Arrival
            </p>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-700" />
              <span className="font-semibold text-sm">12 Minutes</span>
            </div>

            <div className="mt-2 w-full h-2 bg-orange-100 rounded-full">
              <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>

            <p className="text-gray-500 text-xs mt-1">
              ETA calculated using real-time traffic data
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col gap-6 w-full lg:w-[360px]">

        {/* DRIVER CARD */}
        <CustomCard className="border border-gray-200 rounded-xl p-5">
          <p className="font-semibold text-gray-heading text-sm mb-3">
            Your Driver
          </p>

          <div className="flex items-center gap-3">
            <Avatar
              src="https://randomuser.me/api/portraits/men/32.jpg"
              size="lg"
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Michael Rodriguez</p>
              <p className="text-gray-600 text-xs">⭐ 4.5 (342 Trips)</p>
            </div>
          </div>

          <div className="mt-5 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Number</span>
              <span className="font-semibold text-gray-800">DL 01 AB 1234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Type</span>
              <span className="font-semibold text-gray-800">Flatbed Tow Truck</span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Button variant="gradient" fullWidth>
              Call Driver
            </Button>
            <Button variant="outline" fullWidth>
              Chat
            </Button>
          </div>
        </CustomCard>

        {/* STATUS TIMELINE */}
        <CustomCard className="border border-gray-200 rounded-xl p-5">
          <p className="font-semibold text-gray-heading text-sm mb-4">
            Status Timeline
          </p>

          <div className="flex flex-col gap-0">

            {/* Timeline Steps */}
            {[
              { label: "Request Received", time: "2:15 PM", completed: true },
              { label: "Driver Assigned", time: "2:17 PM", completed: true },
              { label: "En Route to Pickup", time: "2:20 PM", current: true },
              { label: "Vehicle Picked Up", pending: true },
              { label: "In Transit to Dropoff", pending: true },
              { label: "Dropoff", pending: true },
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">

                {/* Bullet + Line */}
                <div className="flex flex-col items-center">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      step.completed || step.current ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>

                  {i < 5 && (
                    <span
                      className={`w-[2px] h-10 ${
                        step.completed || step.current ? "bg-green-300" : "bg-gray-200"
                      }`}
                    ></span>
                  )}
                </div>

                {/* Step Text */}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800 text-sm">{step.label}</p>
                    {step.current && (
                      <span className="px-2 py-[2px] text-[10px] bg-orange-100 text-orange-600 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs">{step.time || "Pending"}</p>
                </div>

              </div>
            ))}

          </div>
        </CustomCard>
      </div>
    </div>
  </section>
);
