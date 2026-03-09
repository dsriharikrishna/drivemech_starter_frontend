import React from "react";

interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const CaretDown: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
}) => {
  const w = width || size;
  const h = height || size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.3999 10.2266H14.6124H7.59993C6.39993 10.2266 5.79993 11.6766 6.64993 12.5266L13.1249 19.0016C14.1624 20.0391 15.8499 20.0391 16.8874 19.0016L19.3499 16.5391L23.3624 12.5266C24.1999 11.6766 23.5999 10.2266 22.3999 10.2266Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CaretUp: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
}) => {
  const w = width || size;
  const h = height || size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.4004 19.7734H14.6129H7.60042C6.40042 19.7734 5.80042 18.3234 6.65042 17.4734L13.1254 10.9984C14.1629 9.96094 15.8504 9.96094 16.8879 10.9984L19.3504 13.4609L23.3629 17.4734C24.2004 18.3234 23.6004 19.7734 22.4004 19.7734Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
}) => {
  const w = width || size;
  const h = height || size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.6664 8.74063L11.0247 7.09896L8.34974 4.42396C7.78307 3.86563 6.81641 4.26563 6.81641 5.06563V10.2573V14.9323C6.81641 15.7323 7.78307 16.1323 8.34974 15.5656L12.6664 11.249C13.3581 10.5656 13.3581 9.4323 12.6664 8.74063Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className = "",
}) => {
  const w = width || size;
  const h = height || size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: "rotate(180deg)" }}
    >
      <path
        d="M12.6664 8.74063L11.0247 7.09896L8.34974 4.42396C7.78307 3.86563 6.81641 4.26563 6.81641 5.06563V10.2573V14.9323C6.81641 15.7323 7.78307 16.1323 8.34974 15.5656L12.6664 11.249C13.3581 10.5656 13.3581 9.4323 12.6664 8.74063Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EditIcon = ({
  size = 24,
  width,
  height,
  className = "",
}: IconProps) => {
  const w = width || size;
  const h = height || size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 18.3359H2.5C2.15833 18.3359 1.875 18.0526 1.875 17.7109C1.875 17.3693 2.15833 17.0859 2.5 17.0859H17.5C17.8417 17.0859 18.125 17.3693 18.125 17.7109C18.125 18.0526 17.8417 18.3359 17.5 18.3359Z"
        fill="currentColor"
      />
      <path
        d="M15.8495 2.90005C14.2328 1.28338 12.6495 1.24172 10.9912 2.90005L9.98283 3.90838C9.89949 3.99172 9.86616 4.12505 9.89949 4.24172C10.5328 6.45005 12.2995 8.21672 14.5078 8.85005C14.5412 8.85838 14.5745 8.86672 14.6078 8.86672C14.6995 8.86672 14.7828 8.83338 14.8495 8.76672L15.8495 7.75838C16.6745 6.94172 17.0745 6.15005 17.0745 5.35005C17.0828 4.52505 16.6828 3.72505 15.8495 2.90005Z"
        fill="currentColor"
      />
      <path
        d="M13.0089 9.60573C12.7673 9.48906 12.5339 9.3724 12.3089 9.23906C12.1256 9.13073 11.9506 9.01406 11.7756 8.88906C11.6339 8.7974 11.4673 8.66406 11.3089 8.53073C11.2923 8.5224 11.2339 8.4724 11.1673 8.40573C10.8923 8.1724 10.5839 7.8724 10.3089 7.53906C10.2839 7.5224 10.2423 7.46406 10.1839 7.38906C10.1006 7.28906 9.95892 7.1224 9.83392 6.93073C9.73392 6.80573 9.61726 6.6224 9.50892 6.43906C9.37559 6.21406 9.25892 5.98906 9.14226 5.75573C9.1246 5.7179 9.10752 5.68026 9.09096 5.64284C8.96798 5.36508 8.60578 5.28387 8.39098 5.49867L3.61726 10.2724C3.50892 10.3807 3.40892 10.5891 3.38392 10.7307L2.93392 13.9224C2.85059 14.4891 3.00892 15.0224 3.35892 15.3807C3.65892 15.6724 4.07559 15.8307 4.52559 15.8307C4.62559 15.8307 4.72559 15.8224 4.82559 15.8057L8.02559 15.3557C8.17559 15.3307 8.38392 15.2307 8.48392 15.1224L13.2517 10.3546C13.468 10.1383 13.3864 9.76712 13.105 9.64707C13.0734 9.63356 13.0414 9.61978 13.0089 9.60573Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DeleteIcon = ({
  size = 24,
  width,
  height,
  className = "",
}: IconProps) => {
  const w = width || size;
  const h = height || size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5574 4.35573C16.2157 4.2224 14.8741 4.1224 13.5241 4.0474V4.03906L13.3407 2.95573C13.2157 2.18906 13.0324 1.03906 11.0824 1.03906H8.89907C6.95741 1.03906 6.77407 2.13906 6.64074 2.9474L6.46574 4.01406C5.69074 4.06406 4.91574 4.11406 4.14074 4.18906L2.44074 4.35573C2.09074 4.38906 1.84074 4.6974 1.87407 5.03906C1.90741 5.38073 2.20741 5.63073 2.55741 5.5974L4.25741 5.43073C8.62407 4.9974 13.0241 5.16406 17.4407 5.60573C17.4657 5.60573 17.4824 5.60573 17.5074 5.60573C17.8241 5.60573 18.0991 5.36406 18.1324 5.03906C18.1574 4.6974 17.9074 4.38906 17.5574 4.35573Z"
        fill="#FB2C36"
      />
      <path
        d="M16.0245 6.78594C15.8245 6.5776 15.5495 6.46094 15.2661 6.46094H4.7328C4.44947 6.46094 4.16613 6.5776 3.97447 6.78594C3.7828 6.99427 3.67447 7.2776 3.69113 7.56927L4.2078 16.1193C4.29947 17.3859 4.41613 18.9693 7.32447 18.9693H12.6745C15.5828 18.9693 15.6995 17.3943 15.7911 16.1193L16.3078 7.5776C16.3245 7.2776 16.2161 6.99427 16.0245 6.78594ZM11.3828 14.7943H8.6078C8.26613 14.7943 7.9828 14.5109 7.9828 14.1693C7.9828 13.8276 8.26613 13.5443 8.6078 13.5443H11.3828C11.7245 13.5443 12.0078 13.8276 12.0078 14.1693C12.0078 14.5109 11.7245 14.7943 11.3828 14.7943ZM12.0828 11.4609H7.91613C7.57447 11.4609 7.29113 11.1776 7.29113 10.8359C7.29113 10.4943 7.57447 10.2109 7.91613 10.2109H12.0828C12.4245 10.2109 12.7078 10.4943 12.7078 10.8359C12.7078 11.1776 12.4245 11.4609 12.0828 11.4609Z"
        fill="#FB2C36"
      />
    </svg>
  );
};


export const DocumentTextIcon = ({
  size = 24,
  width,
  height,
  className = "",
}: IconProps) => {
  const w = width || size;
  const h = height || size;

  return (
    <img src="/svgs/document-text.svg" alt=""  className={className} />
  );
};


export const ChartIcon = ({
  size = 24,
  width,
  height,
  className = "",
}: IconProps) => {
  const w = width || size;
  const h = height || size;

  return (
    <img src="/svgs/chart.svg" alt=""  className={className} />
  );
};


export const DownloadIcon = ({
  size = 24,
  width,
  height,
  className = "",
}: IconProps) => {
  const w = width || size;
  const h = height || size;

  return (
    <img src="/svgs/download_outline.svg" alt=""  className={className} />
  );
};

export const PrinterIcon = ({
  size = 24,
  width,
  height,
  className = "",
}: IconProps) => {
  const w = width || size;
  const h = height || size;

  return (
    <img src="/svgs/printer.svg" alt=""  className={className} />
  );
};

