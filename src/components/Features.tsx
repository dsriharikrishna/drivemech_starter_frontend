import React from "react";

const features = [
  {
    icon: "🚗",
    title: "Easy Booking",
    description: "Book car services and repairs in just a few clicks."
  },
  {
    icon: "🛠️",
    title: "Expert Mechanics",
    description: "Connect with certified professionals for quality service."
  },
  {
    icon: "📱",
    title: "Track & Manage",
    description: "Track your service history and manage appointments online."
  }
];

export default function Features() {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">Features</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center bg-surface rounded-lg shadow p-lg border border-border w-full md:w-1/3">
            <span className="text-5xl mb-4" aria-hidden>{feature.icon}</span>
            <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
            <p className="text-muted text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

