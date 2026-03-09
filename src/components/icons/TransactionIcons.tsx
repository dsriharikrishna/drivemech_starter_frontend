import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ViewIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10ZM11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 10C19 13.5 14 16 10 16C6 16 1 13.5 1 10C1 6.5 6 4 10 4C14 4 19 6.5 19 10ZM17.5 10C17.5 10.9827 16.7806 12.0838 15.2215 13.0303C13.7054 13.9508 11.7245 14.5 10 14.5C8.27549 14.5 6.29462 13.9508 4.77847 13.0303C3.21944 12.0838 2.5 10.9827 2.5 10C2.5 9.01731 3.21944 7.91623 4.77847 6.96968C6.29462 6.04916 8.27549 5.5 10 5.5C11.7245 5.5 13.7054 6.04916 15.2215 6.96968C16.7806 7.91623 17.5 9.01731 17.5 10Z"
      fill="currentColor"
    />
  </svg>
);

export const PhoneIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.62 10.7496C17.19 10.7496 16.85 10.3996 16.85 9.97961C16.85 9.60961 16.48 8.83961 15.86 8.16961C15.25 7.51961 14.58 7.13961 14.02 7.13961C13.59 7.13961 13.25 6.78961 13.25 6.36961C13.25 5.94961 13.6 5.59961 14.02 5.59961C15.02 5.59961 16.07 6.13961 16.99 7.10961C17.85 8.01961 18.4 9.14961 18.4 9.96961C18.4 10.3996 18.05 10.7496 17.62 10.7496Z"
      fill="currentColor"
    />
    <path
      d="M21.2317 10.75C20.8017 10.75 20.4617 10.4 20.4617 9.98C20.4617 6.43 17.5717 3.55 14.0317 3.55C13.6017 3.55 13.2617 3.2 13.2617 2.78C13.2617 2.36 13.6017 2 14.0217 2C18.4217 2 22.0017 5.58 22.0017 9.98C22.0017 10.4 21.6517 10.75 21.2317 10.75Z"
      fill="currentColor"
    />
    <path
      d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z"
      fill="currentColor"
    />
    <path
      d="M21.9716 18.33C21.9716 18.61 21.9216 18.9 21.8216 19.18C21.7916 19.26 21.7616 19.34 21.7216 19.42C21.5516 19.78 21.3316 20.12 21.0416 20.44C20.5516 20.98 20.0116 21.37 19.4016 21.62C19.3916 21.62 19.3816 21.63 19.3716 21.63C18.7816 21.87 18.1416 22 17.4516 22C16.4316 22 15.3416 21.76 14.1916 21.27C13.0416 20.78 11.8916 20.12 10.7516 19.29C10.3616 19 9.97156 18.71 9.60156 18.4L12.8716 15.13C13.1516 15.34 13.4016 15.5 13.6116 15.61C13.6616 15.63 13.7216 15.66 13.7916 15.69C13.8716 15.72 13.9516 15.73 14.0416 15.73C14.2116 15.73 14.3416 15.67 14.4516 15.56L15.2116 14.81C15.4616 14.56 15.7016 14.37 15.9316 14.25C16.1616 14.11 16.3916 14.04 16.6416 14.04C16.8316 14.04 17.0316 14.08 17.2516 14.17C17.4716 14.26 17.7016 14.39 17.9516 14.56L21.2616 16.91C21.5216 17.09 21.7016 17.3 21.8116 17.55C21.9116 17.8 21.9716 18.05 21.9716 18.33Z"
      fill="currentColor"
    />
  </svg>
);

export const EmailIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MessageIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M21.9989 12.8595C21.9989 15.1495 20.8189 17.1795 18.9989 18.4595L17.6589 21.4095C17.3489 22.0795 16.4489 22.2095 15.9789 21.6395L14.4989 19.8595C12.6389 19.8595 10.9289 19.2295 9.62891 18.1795L10.2289 17.4695C14.8489 17.1195 18.4989 13.4595 18.4989 8.99953C18.4989 8.23953 18.3889 7.48953 18.1889 6.76953C20.4589 7.96953 21.9989 10.2495 21.9989 12.8595Z"
      fill="currentColor"
    />
    <path
      d="M16.3 6.07C15.13 3.67 12.52 2 9.5 2C5.36 2 2 5.13 2 9C2 11.29 3.18 13.32 5 14.6L6.34 17.55C6.65 18.22 7.55 18.34 8.02 17.78L8.57 17.12L9.5 16C13.64 16 17 12.87 17 9C17 7.95 16.75 6.96 16.3 6.07ZM12 9.75H7C6.59 9.75 6.25 9.41 6.25 9C6.25 8.59 6.59 8.25 7 8.25H12C12.41 8.25 12.75 8.59 12.75 9C12.75 9.41 12.41 9.75 12 9.75Z"
      fill="currentColor"
    />
  </svg>
);

export const PrintIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7 5C7 3.34 8.34 2 10 2H14C15.66 2 17 3.34 17 5C17 5.55 16.55 6 16 6H8C7.45 6 7 5.55 7 5Z"
      fill="currentColor"
    />
    <path
      d="M17.75 15C17.75 15.41 17.41 15.75 17 15.75H16V19C16 20.66 14.66 22 13 22H11C9.34 22 8 20.66 8 19V15.75H7C6.59 15.75 6.25 15.41 6.25 15C6.25 14.59 6.59 14.25 7 14.25H17C17.41 14.25 17.75 14.59 17.75 15Z"
      fill="currentColor"
    />
    <path
      d="M18 7H6C4 7 3 8 3 10V15C3 17 4 18 6 18H6.375C6.72018 18 7 17.7202 7 17.375C7 17.0298 6.71131 16.7604 6.38841 16.6384C5.72619 16.3882 5.25 15.7453 5.25 15C5.25 14.04 6.04 13.25 7 13.25H17C17.96 13.25 18.75 14.04 18.75 15C18.75 15.7453 18.2738 16.3882 17.6116 16.6384C17.2887 16.7604 17 17.0298 17 17.375C17 17.7202 17.2798 18 17.625 18H18C20 18 21 17 21 15V10C21 8 20 7 18 7ZM10 11.75H7C6.59 11.75 6.25 11.41 6.25 11C6.25 10.59 6.59 10.25 7 10.25H10C10.41 10.25 10.75 10.59 10.75 11C10.75 11.41 10.41 11.75 10 11.75Z"
      fill="currentColor"
    />
  </svg>
);

export const CalendarIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
      fill="currentColor"
    />
    <path
      d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z"
      fill="currentColor"
    />
  </svg>
);

export const SortIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2.25 5.25H15.75"
      stroke="#314158"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M4.5 9H13.5Z" fill="#314158" />
    <path
      d="M4.5 9H13.5"
      stroke="#314158"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M7.5 12.75H10.5"
      stroke="#314158"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const DownloadIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.6 6.75H9.5625V11.4375C9.5625 11.745 9.3075 12 9 12C8.6925 12 8.4375 11.745 8.4375 11.4375V6.75H5.4C3 6.75 1.5 8.25 1.5 10.65V12.5925C1.5 15 3 16.5 5.4 16.5H12.5925C14.9925 16.5 16.4925 15 16.4925 12.6V10.65C16.5 8.25 15 6.75 12.6 6.75Z"
      fill="currentColor"
    />
    <path
      d="M9.56238 3.41812L11.1149 4.97063C11.2274 5.08313 11.3699 5.13562 11.5124 5.13562C11.6549 5.13562 11.7974 5.08313 11.9099 4.97063C12.1274 4.75313 12.1274 4.39313 11.9099 4.17563L9.39738 1.66313C9.17988 1.44563 8.81988 1.44563 8.60238 1.66313L6.08988 4.17563C5.87238 4.39313 5.87238 4.75313 6.08988 4.97063C6.30738 5.18813 6.66738 5.18813 6.88488 4.97063L8.43738 3.41812V6.74812H9.56238V3.41812Z"
      fill="currentColor"
    />
  </svg>
);


export const WhatsAppIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/vendor/whatsapp.svg"
    alt="WhatsApp"
    width={size}
    height={size}
    className={className}
  />
);

export const UserIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/vendor/user-icon.svg"
    alt="User"
    width={size}
    height={size}
    className={className}
  />
);

export const HashtagIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/vendor/hashtag.svg"
    alt="Hashtag"
    width={size}
    height={size}
    className={className}
  />
);

export const SmsIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/vendor/sms-icon.svg"
    alt="SMS"
    width={size}
    height={size}
    className={className}
  />
);

export const MessagesIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/vendor/messages.svg"
    alt="Messages"
    width={size}
    height={size}
    className={className}
  />
);


export const StoryIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/vendor/story.svg"
    alt="Story"
    width={size}
    height={size}
    className={className}
  />
);


export const ChipIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/vendor/chip.svg"
    alt="Chip"
    width={size}
    height={size}
    className={className}
  />
);

export const InvoiceIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17 1H7C4 1 2 2.5 2 6V18C2 21.5 4 23 7 23H17C20 23 22 21.5 22 18V6C22 2.5 20 1 17 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 6H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 14H11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShareIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L11 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export const SendIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/transaction-center/send-icon.svg"
    alt="Send"
    width={size}
    height={size}
    className={className}
  />
);

export const ReceiptItemIcon = ({ size = 20, className = "" }: IconProps) => (
  <img
    src="/svgs/transaction-center/receipt-item.svg"
    alt="Receipt"
    width={size}
    height={size}
    className={className}
  />
);