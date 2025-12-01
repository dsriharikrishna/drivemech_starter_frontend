"use client"
import dynamic from "next/dynamic";

const BetterMap = dynamic(() => import("./BetterMap"), {
  ssr: false,
});

export default function PetrolMapPage() {
  return <BetterMap />;
}
