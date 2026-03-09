import React from "react";

export interface IconProps {
    size?: number;
    className?: string;
}

const ServiceIcon = ({ src, alt, size = 24, className = "" }: IconProps & { src: string; alt: string }) => (
    <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`object-contain ${className}`}
    />
);

export const AirConditioningIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/AirConditioning.png" alt="Air Conditioning" {...props} />
);

export const AutoGlassIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/AutoGlass.png" alt="Auto Glass" {...props} />
);

export const BatteryIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/Battery.png" alt="Battery" {...props} />
);

export const ClutchIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/Clutch.png" alt="Clutch" {...props} />
);

export const OilLeakIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/Oilleakinspection.png" alt="Oil Leak Inspection" {...props} />
);

export const RoadworthyIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/Roadworthyinspection.png" alt="Roadworthy Inspection" {...props} />
);

export const SparkPlugIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/SparkPlug.png" alt="Spark Plug" {...props} />
);

export const SuspensionIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/SuspensionSteering.png" alt="Suspension and Steering" {...props} />
);

export const TimingBeltIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/Timingbelt.png" alt="Timing belt/chain" {...props} />
);

export const TransmissionIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/Transmission.png" alt="Transmission" {...props} />
);

export const WheelsIcon = (props: IconProps) => (
    <ServiceIcon src="/images/ourservices/Wheels.png" alt="Wheels and Tyres" {...props} />
);
