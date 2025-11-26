'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { Workshop } from "@/types/workshops";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom workshop icon
const workshopIcon = new L.Icon({
  iconUrl: "/garage.png", // Fallback to existing garage image
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [0, -42],
});

export default function WorkshopMap({ workshops }: { workshops: Workshop[] }) {
  // Default center (Hyderabad)
  const center = workshops.length > 0 
    ? [workshops[0].lat, workshops[0].lng] 
    : [17.3850, 78.4867];

  return (
    <div className="w-full h-[260px] rounded-xl overflow-hidden shadow-sm border">
      <MapContainer
        center={center as [number, number]}
        zoom={12}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {workshops.map((w) => (
          <Marker 
            key={w.id} 
            position={[w.lat, w.lng]} 
            icon={workshopIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-sm">{w.name}</h3>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mt-1">
                  <span>⭐</span>
                  <span>{w.rating}</span>
                  <span>({w.reviews})</span>
                </div>
                <div className="mt-2">
                  {w.services.slice(0, 2).map((service, idx) => (
                    <span 
                      key={idx}
                      className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
