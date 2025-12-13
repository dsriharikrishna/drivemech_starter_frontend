// Location data for city selection
export interface City {
    id: string;
    name: string;
    icon: string;
    verifiedGarages: number;
}

export interface Country {
    id: string;
    name: string;
    flag: string;
    cities: City[];
}

export const COUNTRIES: Country[] = [
    {
        id: 'india',
        name: 'India',
        flag: '🇮🇳',
        cities: [
            {
                id: 'delhi-ncr',
                name: 'Delhi NCR',
                icon: '🏛️',
                verifiedGarages: 50,
            },
            {
                id: 'hyderabad',
                name: 'Hyderabad',
                icon: '🏛️',
                verifiedGarages: 50,
            },
            {
                id: 'bangalore',
                name: 'Bangalore',
                icon: '🏛️',
                verifiedGarages: 50,
            },
            {
                id: 'chennai',
                name: 'Chennai',
                icon: '🏛️',
                verifiedGarages: 50,
            },
            {
                id: 'ahmedabad',
                name: 'Ahmedabad',
                icon: '🏛️',
                verifiedGarages: 50,
            },
            {
                id: 'mumbai',
                name: 'Mumbai',
                icon: '🏛️',
                verifiedGarages: 50,
            },
            {
                id: 'kochi',
                name: 'Kochi',
                icon: '🏛️',
                verifiedGarages: 50,
            },
            {
                id: 'kolkata',
                name: 'Kolkata',
                icon: '🏛️',
                verifiedGarages: 50,
            },
        ],
    },
    {
        id: 'malaysia',
        name: 'Malaysia',
        flag: '🇲🇾',
        cities: [
            {
                id: 'kuala-lumpur',
                name: 'Kuala Lumpur',
                icon: '🏛️',
                verifiedGarages: 30,
            },
            {
                id: 'penang',
                name: 'Penang',
                icon: '🏛️',
                verifiedGarages: 25,
            },
            {
                id: 'johor-bahru',
                name: 'Johor Bahru',
                icon: '🏛️',
                verifiedGarages: 20,
            },
        ],
    },
    {
        id: 'australia',
        name: 'Australia',
        flag: '🇦🇺',
        cities: [
            {
                id: 'sydney',
                name: 'Sydney',
                icon: '🏛️',
                verifiedGarages: 40,
            },
            {
                id: 'melbourne',
                name: 'Melbourne',
                icon: '🏛️',
                verifiedGarages: 35,
            },
            {
                id: 'brisbane',
                name: 'Brisbane',
                icon: '🏛️',
                verifiedGarages: 28,
            },
        ],
    },
];
