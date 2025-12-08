"use client";

export default function AboutSection() {
  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-5xl mx-auto text-center px-4">

        {/* Heading */}
        <h2 className="text-gray-heading text-3xl font-semibold">
          About <span className="text-gray-900">Our</span> Towing Service
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          We are India's leading 24/7 roadside assistance and towing service provider with over
          15 years of experience. Our mission is to provide fast, reliable, and professional towing
          services to drivers across the country.
          <br /><br />
          With a fleet of modern tow trucks and trained professionals, we're equipped to handle
          everything from small cars to heavy vehicles. We understand that breakdowns are stressful,
          which is why we are committed to making your towing process as smooth as possible.
        </p>

      </div>
    </section>
  );
}
