import React from "react";

export interface IconProps {
    size?: number;
    className?: string;
}

const InventoryIcon = ({ src, alt, size = 24, className = "" }: IconProps & { src: string; alt: string }) => (
    <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`object-contain ${className}`}
    />
);

export const PackageIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/box.svg" alt="Package" {...props} />
);

export const DocumentTextIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/document-text.svg" alt="Document" {...props} />
);

export const HistoryIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/history_anticlockwise_fill.svg" alt="History" {...props} />
);

export const PriceTagsIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/pricetags-sharp.svg" alt="Price Tags" {...props} />
);

export const ReceiptMinusIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/receipt-minus.svg" alt="Receipt Minus" {...props} />
);

export const SettingIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/setting-2.svg" alt="Settings" {...props} />
);

export const TransmissionIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/Transmission.svg" alt="Transmission" {...props} />
);

export const AttachSquareIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/attach-square.svg" alt="Attach Square" {...props} />
);

export const FolderOpenIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/folder-open.svg" alt="Folder Open" {...props} />
);

export const OnlineBookingIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/online-booking.svg" alt="Online Booking" {...props} />
);

export const ReceiptItemIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/receipt-item.svg" alt="Receipt Item" {...props} />
);

export const SearchingCarIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/searching-car.svg" alt="Searching Car" {...props} />
);

export const ChatIcon = (props: IconProps) => (
    <InventoryIcon src="/svgs/inventory/messages-2.svg" alt="Chat" {...props} />
);
