import Image from "next/image";
import { Phone } from "phosphor-react";
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
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C4.46957 16 3.96086 15.7893 3.58579 15.4142C3.21071 15.0391 3 14.5304 3 14V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V14C21 14.5304 20.7893 15.0391 20.4142 15.4142C20.0391 15.7893 19.5304 16 19 16H14L9 21V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
