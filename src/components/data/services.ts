export interface Service {
  id: string;
  name: string;
  isPopular?: boolean;
  icon: string;
  hasNested?: boolean;
  nestedServices?: NestedService[];
}

export interface NestedService {
  id: string;
  name: string;
  description?: string;
  price?: number;
}

export const headerServices : Service[] = [
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
]

export const services: Service[] = [
  {
    id: 'air-conditioning',
    name: 'Air Conditioning',
    icon: '❄️',
    hasNested: true,
    nestedServices: [
      { id: 'ac-regas', name: 'AC Regassing', description: 'Recharge your AC system', price: 120 },
      { id: 'ac-compressor', name: 'Compressor Replacement', description: 'Replace AC compressor', price: 450 },
      { id: 'ac-filter', name: 'Cabin Filter Replacement', description: 'Replace cabin air filter', price: 60 }
    ]
  },
  {
    id: 'spark-plug',
    name: 'Spark Plug',
    icon: '⚡',
    hasNested: true,
    nestedServices: [
      { id: 'spark-plug-replacement', name: 'Spark Plug Replacement', description: 'Replace all spark plugs', price: 180 },
      { id: 'ignition-coil', name: 'Ignition Coil Service', description: 'Service ignition coils', price: 250 }
    ]
  },
  {
    id: 'brakes',
    name: 'Brakes',
    icon: '🛑',
    hasNested: true,
    nestedServices: [
      { id: 'brake-pads', name: 'Brake Pad Replacement', description: 'Replace front brake pads', price: 220 },
      { id: 'brake-discs', name: 'Brake Disc Machining', description: 'Machine brake discs', price: 150 },
      { id: 'brake-fluid', name: 'Brake Fluid Flush', description: 'Flush brake fluid system', price: 120 }
    ]
  },
  {
    id: 'transmission',
    name: 'Transmission / Differential',
    icon: '⚙️',
    hasNested: true,
    nestedServices: [
      { id: 'transmission-service', name: 'Transmission Service', description: 'Full transmission service', price: 350 },
      { id: 'differential-service', name: 'Differential Service', description: 'Differential oil change', price: 200 }
    ]
  },
  {
    id: 'pre-purchase',
    name: 'Pre-Purchase Inspection',
    icon: '🔍'
  },
  {
    id: 'roadworthy-inspection',
    name: 'Roadworthy inspection',
    icon: '✅'
  },
  {
    id: 'battery',
    name: 'Battery',
    icon: '🔋',
    hasNested: true,
    nestedServices: [
      { id: 'battery-replacement', name: 'Battery Replacement', description: 'Replace car battery', price: 180 },
      { id: 'battery-testing', name: 'Battery Testing', description: 'Test battery condition', price: 45 }
    ]
  },
  {
    id: 'timing-belt',
    name: 'Timing belt/chain',
    icon: '⏱️',
    hasNested: true,
    nestedServices: [
      { id: 'timing-belt-replacement', name: 'Timing Belt Replacement', description: 'Replace timing belt', price: 550 },
      { id: 'timing-chain', name: 'Timing Chain Service', description: 'Timing chain inspection', price: 300 }
    ]
  },
  {
    id: 'oil-leak',
    name: 'Oil leak inspection',
    icon: '🛢️'
  },
  {
    id: 'window-tinting',
    name: 'Window tinting',
    icon: '🪟',
    hasNested: true,
    nestedServices: [
      { id: 'full-tint', name: 'Full Car Tinting', description: 'Tint all windows', price: 350 },
      { id: 'front-tint', name: 'Front Windows Only', description: 'Tint front windows', price: 200 }
    ]
  },
  {
    id: 'auto-glass',
    name: 'Auto Glass',
    icon: '🚗',
    hasNested: true,
    nestedServices: [
      { id: 'windshield-replacement', name: 'Windshield Replacement', description: 'Replace windshield', price: 450 },
      { id: 'window-repair', name: 'Chip Repair', description: 'Repair glass chips', price: 120 }
    ]
  },
  {
    id: 'suspension-steering',
    name: 'Suspension and Steering',
    icon: '🔄',
    hasNested: true,
    nestedServices: [
      { id: 'shock-absorbers', name: 'Shock Absorber Replacement', description: 'Replace shock absorbers', price: 400 },
      { id: 'wheel-alignment', name: 'Wheel Alignment', description: 'Four wheel alignment', price: 120 }
    ]
  },
  {
    id: 'clutch',
    name: 'Clutch',
    icon: '🎚️',
    hasNested: true,
    nestedServices: [
      { id: 'clutch-replacement', name: 'Clutch Replacement', description: 'Full clutch replacement', price: 850 },
      { id: 'clutch-cable', name: 'Clutch Cable Adjustment', description: 'Adjust clutch cable', price: 80 }
    ]
  },
  {
    id: 'wheels-tyres',
    name: 'Wheels & Tyres',
    icon: '🛞',
    hasNested: true,
    nestedServices: [
      { id: 'tyre-rotation', name: 'Tyre Rotation', description: 'Rotate all tyres', price: 60 },
      { id: 'tyre-replacement', name: 'Tyre Replacement', description: 'Replace tyres', price: 150 },
      { id: 'wheel-balancing', name: 'Wheel Balancing', description: 'Balance all wheels', price: 80 }
    ]
  },
  {
    id: 'radiator',
    name: 'Radiator',
    icon: '🌡️',
    hasNested: true,
    nestedServices: [
      { id: 'radiator-replacement', name: 'Radiator Replacement', description: 'Replace radiator', price: 450 },
      { id: 'coolant-flush', name: 'Coolant Flush', description: 'Flush cooling system', price: 120 }
    ]
  }
];
