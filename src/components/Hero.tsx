import React from "react";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 bg-surface rounded-lg shadow-lg m-lg">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Welcome to DriveMech</h1>
      <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl">
        Your one-stop platform for all your automotive needs. Book services, connect with experts, and keep your vehicle in top shape effortlessly.
      </p>
      <a href="#get-started" className="inline-block px-8 py-3 rounded bg-primary text-white font-semibold shadow hover:bg-secondary transition-colors text-lg">
        Get Started
      </a>
    </section>
  );
}

