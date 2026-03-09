import React from "react";

interface IconProps {
    size?: number;
    className?: string;
}

export const ActiveUsersIcon = ({ size = 84, className = "" }: IconProps) => (
    <img
        src="/svgs/sms-campaings/active-users.svg"
        alt="Active Users"
        width={size}
        height={size}
        className={className}
    />
);

export const AudienceIcon = ({ size = 84, className = "" }: IconProps) => (
    <img
        src="/svgs/sms-campaings/audience.svg"
        alt="Audience"
        width={size}
        height={size}
        className={className}
    />
);

export const ContactsIcon = ({ size = 84, className = "" }: IconProps) => (
    <img
        src="/svgs/sms-campaings/contacts.svg"
        alt="Contacts"
        width={size}
        height={size}
        className={className}
    />
);

export const MessagesSentIcon = ({ size = 84, className = "" }: IconProps) => (
    <img
        src="/svgs/sms-campaings/messages-sent.svg"
        alt="Messages Sent"
        width={size}
        height={size}
        className={className}
    />
);

export const SegmentsIcon = ({ size = 84, className = "" }: IconProps) => (
    <img
        src="/svgs/sms-campaings/segments.svg"
        alt="Segments"
        width={size}
        height={size}
        className={className}
    />
);

export const VoiceCampaignIcon = ({ size = 84, className = "" }: IconProps) => (
    <img
        src="/svgs/sms-campaings/voice-campaingn.svg"
        alt="Voice Campaign"
        width={size}
        height={size}
        className={className}
    />
);