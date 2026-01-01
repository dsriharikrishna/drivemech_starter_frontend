// Location data for city selection
export interface City {
    id: string;
    name: string;
    icon: string;
    verifiedGarages: number;
    states?: string[]; // Optional array of states/regions
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
                icon: '/svgs/cities/delhi.svg',
                verifiedGarages: 50,
                states: ['Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'],
            },
            {
                id: 'hyderabad',
                name: 'Hyderabad',
                icon: '/svgs/cities/hyderabad.svg',
                verifiedGarages: 50,
                states: ['Telangana', 'Secunderabad', 'Cyberabad'],
            },
            {
                id: 'bangalore',
                name: 'Bangalore',
                icon: '/svgs/cities/bangalore.svg',
                verifiedGarages: 50,
                states: ['Karnataka', 'Whitefield', 'Electronic City', 'Koramangala'],
            },
            {
                id: 'chennai',
                name: 'Chennai',
                icon: '/svgs/cities/chennai.svg',
                verifiedGarages: 50,
                states: ['Tamil Nadu', 'Anna Nagar', 'T Nagar', 'Velachery'],
            },
            {
                id: 'ahmedabad',
                name: 'Ahmedabad',
                icon: '/svgs/cities/ahmedabad.svg',
                verifiedGarages: 50,
                states: ['Gujarat', 'Gandhinagar', 'Sabarmati'],
            },
            {
                id: 'mumbai',
                name: 'Mumbai',
                icon: '/svgs/cities/mumbai.svg',
                verifiedGarages: 50,
                states: ['Maharashtra', 'Navi Mumbai', 'Thane', 'Pune'],
            },
            {
                id: 'kochi',
                name: 'Kochi',
                icon: '/svgs/cities/kochi.svg',
                verifiedGarages: 50,
                states: ['Kerala', 'Ernakulam', 'Fort Kochi'],
            },
            {
                id: 'kolkata',
                name: 'Kolkata',
                icon: '/svgs/cities/kolkata.svg',
                verifiedGarages: 50,
                states: ['West Bengal', 'Howrah', 'Salt Lake City'],
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
