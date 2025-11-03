import React from "react";

const testimonials = [
  {
    name: "Alex P.",
    quote: "DriveMech made it so easy to book my car's service. The mechanic was professional and the whole process was seamless!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya S.",
    quote: "I love being able to track my service history online. Highly recommend DriveMech to anyone!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "John D.",
    quote: "The best platform for car owners. Booking, tracking, and managing appointments has never been easier.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center bg-surface rounded-lg shadow m-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {testimonials.map((t, idx) => (
          <div key={idx} className="flex flex-col items-center bg-background rounded-lg border border-border p-lg shadow w-full md:w-1/3">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 shadow" />
            <blockquote className="italic text-muted mb-2">"{t.quote}"</blockquote>
            <span className="font-semibold text-primary">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

