import Image from "next/image";
import { Phone, ChatCircle } from "phosphor-react";
import { Star } from "lucide-react";

interface DriverDetailsCardProps {
    name: string;
    rating: number;
    trips: number;
    vehicleType: string;
    avatar?: string;
    onChat?: () => void;
    onCall?: () => void;
}

export default function DriverDetailsCard({
    name,
    rating,
    trips,
    vehicleType,
    avatar = "/images/default-avatar.png",
    onChat,
    onCall,
}: DriverDetailsCardProps) {
    return (
        <div className="border border-gray-200 rounded-2xl bg-white p-3">
            {/* Title */}
            <h2 className="text-md font-semibold text-gray-900 mb-2">
                Driver Details
            </h2>

            {/* Driver Info Section */}
            <div className="flex items-start gap-2 mb-2">
                {/* Avatar */}
                <Image
                    src={avatar}
                    width={40}
                    height={40}
                    alt={name}
                    className="rounded-full object-cover"
                />

                {/* Info */}
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                        {name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-gray-600">
                        <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                        <span className="text-sm font-semibold text-gray-900">{rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{trips} trips</span>
                    </div>

                    <p className="text-sm text-gray-500 mt-0.5">
                        {vehicleType}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
                {/* Chat Button */}
                <button
                    onClick={onChat}
                    className="flex items-center justify-center gap-2 px-2 py-1.5 border-2 border-orange-500 text-orange-500 rounded-xl text-base font-semibold hover:bg-orange-50 transition"
                >
                    <ChatCircle size={18} weight="duotone" />
                    Chat
                </button>

                {/* Call Button */}
                <button
                    onClick={onCall}
                    className="flex items-center justify-center gap-2 px-2 py-1.5 bg-orange-500 text-white rounded-xl text-base font-semibold hover:bg-orange-600 transition"
                >
                    <Phone size={18} weight="duotone" />
                    Call
                </button>
            </div>
        </div>
    );
}
