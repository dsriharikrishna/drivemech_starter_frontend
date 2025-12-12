import Image from "next/image";

export default function ContentSection1() {
  return (
    <section className="py-10 sm:py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 bg-[#EDEDED] rounded-2xl">
        <div
          className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-8 rounded-3xl"
          style={{
            margin: "0 auto",
            opacity: 1,
          }}
        >

          {/* ✅ Text Section */}
          <div className="flex-1 w-full space-y-4 sm:space-y-6 py-5 text-center lg:text-left">
            <h1 className="font-manrope font-bold text-[28px] sm:text-[36px] md:text-[45px] leading-tight text-[#232947]">
              <span className="text-[#FF7A1A] font-bold">For Garages:</span>{" "}
              <span className="text-[#232947] font-bold">
                Streamline<br className="hidden sm:block" />
                Your Operations,<br className="hidden sm:block" />
                Grow Your Business.
              </span>
            </h1>
            <p className="font-manrope text-[15px] sm:text-[16px] text-[#545965] leading-relaxed max-w-[550px] mx-auto lg:mx-0">
              DriveCare empowers mechanics and garage owners with tools to
              manage bookings, optimize workflow, and reach new customers.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                className="font-manrope cursor-pointer bg-primary-500 px-5 py-3 rounded-lg hover:bg-primary-600 font-bold text-white transition-colors flex items-center gap-2"
                style={{ fontSize: "16px" }}
              >
                Join Our Network <span aria-hidden>➔</span>
              </button>
            </div>
          </div>

          {/* ✅ Image Section (now shows on top for mobile) */}
          <div className="flex-1 w-full relative h-[220px] sm:h-[260px] md:h-[300px] lg:h-[360px]">
            <Image
              src="/images/ForGarage.png"
              alt="Garage software dashboard on devices"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
