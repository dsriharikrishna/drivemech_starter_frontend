"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FeatureCollection } from "geojson";

const MAPTILER_KEY = "kXPdX4QguRMY9ej8ZA4x";

const styleUrl = `https://api.maptiler.com/maps/bright/style.json?key=${MAPTILER_KEY}`;

export default function BetterMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!MAPTILER_KEY) {
      setError("Missing MapTiler key.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userCoords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];

        const map = new maplibregl.Map({
          container: mapRef.current!,
          style: styleUrl,
          center: userCoords,
          zoom: 13,
        });

        mapInstance.current = map;

        map.on("load", async () => {
          //-----------------------------------
          // USER LOCATION MARKER (GREEN)
          //-----------------------------------
          map.addSource("user-location", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "Point", coordinates: userCoords },
              properties: {},
            },
          });

          map.addLayer({
            id: "user-pin",
            type: "circle",
            source: "user-location",
            paint: {
              "circle-radius": 12,
              "circle-color": "#00e676",
              "circle-stroke-color": "#000",
              "circle-stroke-width": 3,
            },
          });

          //-----------------------------------------
          // FETCH NEARBY PETROL STATIONS (OVERPASS API)
          //-----------------------------------------
const url = `https://overpass.kumi.systems/api/interpreter?data=[out:json];(node["amenity"="fuel"](around:5000,${userCoords[1]},${userCoords[0]}););out;`;

          const res = await fetch(url);
          if (!res.ok) {
            console.error("API Error:", res.status, res.statusText);
            console.error("URL:", url);
            setError(`Failed to fetch nearby petrol bunks (${res.status}).`);
            return;
          }

          const data = await res.json();
          console.log("Overpass API Response:", data);

          if (!data.elements || data.elements.length === 0) {
            setError("No petrol stations found nearby.");
            return;
          }

          // Convert Overpass data to GeoJSON format
          const geojson: FeatureCollection = {
            type: "FeatureCollection",
            features: data.elements.map((element: any) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [element.lon, element.lat]
              },
              properties: { 
                name: element.tags?.name || "Petrol Station",
                amenity: element.tags?.amenity || "fuel"
              }
            })),
          };

          //-----------------------------------
          // LOAD PUMP ICON
          //-----------------------------------
          map.loadImage(
            "https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
          ).then((response) => {
            const img = response.data;
            if (!img) return;

            if (!map.hasImage("pump-icon")) {
              map.addImage("pump-icon", img);
            }

            map.addSource("petrol-bunks", {
              type: "geojson",
              data: geojson,
            });

            map.addLayer({
              id: "petrol-layer",
              type: "symbol",
              source: "petrol-bunks",
              layout: {
                "icon-image": "pump-icon",
                "icon-size": 0.08,
                "icon-anchor": "bottom",
                "icon-allow-overlap": true,
              },
            });
          }).catch((err) => {
            console.error("Error loading image:", err);
          });

          //-----------------------------------
          // POPUP ON CLICK
          //-----------------------------------
          map.on("click", "petrol-layer", (e) => {
            const coordinates = (e.features?.[0].geometry as any).coordinates;
            const name = e.features?.[0].properties?.name;

            new maplibregl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<div style="font-weight:600">${name}</div>`)
              .addTo(map);
          });
        });
      },

      (err) => {
        setError("Location access denied.");
      }
    );

    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-[90%] max-w-5xl rounded-xl shadow-xl overflow-hidden border-2 border-blue-300">
        <div className="p-4 bg-blue-50 font-semibold text-gray-700 border-b">
          ⛽ Nearby Petrol Bunks (Current Location)
        </div>

        {error ? (
          <div className="p-4 text-red-600 text-center">{error}</div>
        ) : (
          <div ref={mapRef} className="h-[600px] w-full" />
        )}
      </div>
    </div>
  );
}
