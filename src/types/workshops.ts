export interface WorkshopCardProps {
  logo: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  driveTime: string;
  services: string[];
  ctaType: "book" | "offer";
  offerText?: string;
}



export interface ServiceItem {
  name: string;
  price?: number; // fixed price services
}

export interface WorkshopDetailProps {
  logo: string;
  name: string;
  isOpen: boolean;
  closingTime: string;
  distance: string;
  driveTime: string;
  rating: number;
  reviews: number;

  categories: string[];

  inspectionServices: string[];
  moreInspectionCount: number;

  fixedPriceServices: ServiceItem[];
  moreFixedCount: number;
  fixedPriceCTA: string; // e.g. "$ 4999/-"
}

export interface WorkshopListProps {
  workshops: WorkshopCardProps[];
}


export interface Workshop {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  description: string;
  services: string[];
  lat: number;
  lng: number;
}

