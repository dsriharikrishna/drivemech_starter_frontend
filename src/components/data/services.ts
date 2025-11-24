export interface Service {
  id: string;
  name: string;
  isPopular?: boolean;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'logbook-service',
    name: 'Logbook Service',
    isPopular: true,
    icon: '📋'
  },
  {
    id: 'basic-service',
    name: 'Basic Service',
    icon: '🔧'
  },
  {
    id: 'breakdown',
    name: 'Breakdown',
    icon: '🛠️'
  },
  {
    id: 'air-conditioning',
    name: 'Air Conditioning',
    icon: '❄️'
  },
  {
    id: 'roadworthy-inspection',
    name: 'Roadworthy inspection',
    icon: '✅'
  },
  {
    id: 'auto-glass',
    name: 'Auto Glass',
    icon: '🚗'
  },
  {
    id: 'spark-plug',
    name: 'Spark Plug',
    icon: '⚡'
  },
  {
    id: 'battery',
    name: 'Battery',
    icon: '🔋'
  },
  {
    id: 'suspension-steering',
    name: 'Suspension and Steering',
    icon: '🔄'
  },
  {
    id: 'brakes',
    name: 'Brakes',
    icon: '🛑'
  },
  {
    id: 'timing-belt',
    name: 'Timing belt/chain',
    icon: '⏱️'
  },
  {
    id: 'clutch',
    name: 'Clutch',
    icon: '🎚️'
  },
  {
    id: 'transmission',
    name: 'Transmission / Differential',
    icon: '⚙️'
  },
  {
    id: 'oil-leak',
    name: 'Oil leak inspection',
    icon: '🛢️'
  },
  {
    id: 'wheels-tyres',
    name: 'Wheels & Tyres',
    icon: '🛞'
  },
  {
    id: 'pre-purchase',
    name: 'Pre-Purchase Inspection',
    icon: '🔍'
  },
  {
    id: 'window-tinting',
    name: 'Window tinting',
    icon: '🪟'
  },
  {
    id: 'radiator',
    name: 'Radiator',
    icon: '🌡️'
  }
];
