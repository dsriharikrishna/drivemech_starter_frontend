'use client';

import { useEffect, useState } from 'react';

/* ---------------- TYPES ---------------- */

interface State {
    name: string;
}

interface City {
    id: string;
    name: string;
    flag: string;
    verifiedGarages: number;
    states: State[];
}

/* ---------------- PAGE ---------------- */

export default function GaragesPage() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const PAGE_SIZE = 8;

    /* ---------------- API CALL ---------------- */

    const fetchCities = async () => {
        setLoading(true);

        try {
            // Fetch countries with states
            const statesRes = await fetch(
                'https://countriesnow.space/api/v0.1/countries/states'
            );

            if (!statesRes.ok) throw new Error('Failed to fetch countries');

            const statesData = await statesRes.json();

            let mapped: City[] = statesData.data.map((item: any) => ({
                id: item.iso2 || item.name,
                name: item.name,
                flag: `https://flagcdn.com/w40/${item.iso2?.toLowerCase()}.png`,
                verifiedGarages: Math.floor(Math.random() * 40) + 10,
                states: item.states || [],
            }));



            // Pagination
            const start = (page - 1) * PAGE_SIZE;
            const paginated = mapped.slice(start, start + PAGE_SIZE);

            setCities(paginated);
            setTotalPages(Math.ceil(mapped.length / PAGE_SIZE));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- EFFECTS ---------------- */

    useEffect(() => {
        fetchCities();
    }, [page]);

    /* ---------------- PAGINATION HELPER ---------------- */

    const getPaginationRange = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range: (number | string)[] = [];
        const rangeWithDots: (number | string)[] = [];

        // Always show first page
        range.push(1);

        // Calculate range around current page
        for (let i = page - delta; i <= page + delta; i++) {
            if (i > 1 && i < totalPages) {
                range.push(i);
            }
        }

        // Always show last page
        if (totalPages > 1) {
            range.push(totalPages);
        }

        // Add dots where there are gaps
        let prev = 0;
        for (const i of range) {
            if (typeof i === 'number') {
                if (prev && i - prev > 1) {
                    rangeWithDots.push('...');
                }
                rangeWithDots.push(i);
                prev = i;
            }
        }

        return rangeWithDots;
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen bg-white text-black p-6">
            {/* HERO */}
            <div className="py-20 px-4 text-center">
                <h1 className="text-3xl font-bold mb-3">
                    Find Trusted Garages Near You
                </h1>
                <p className="text-gray-500 mb-8">
                    Discover verified garages and services across different countries.
                </p>
            </div>

            {/* CONTENT */}
            <div className="bg-gray-50 py-12 px-6">
                <h2 className="text-center text-xl font-semibold mb-8">
                    Popular Cities
                </h2>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : cities.length === 0 ? (
                    <p className="text-center text-gray-500">No cities found</p>
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {cities.map(city => (
                                <div
                                    key={city.id}
                                    className="flex flex-col rounded-xl border bg-white p-5 shadow-sm"
                                >
                                    {/* HEADER */}
                                    <div className="flex items-center gap-3 mb-3 pb-3 border-b">
                                        <img
                                            src={city.flag}
                                            alt={city.name}
                                            className="h-6 w-9 rounded object-cover border"
                                            onError={e =>
                                                ((e.target as HTMLImageElement).style.display = 'none')
                                            }
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{city.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {city.verifiedGarages}+ Verified Garages
                                            </p>
                                        </div>
                                    </div>

                                    {/* STATES */}
                                    <div className="flex-1 max-h-32 overflow-y-auto text-xs text-gray-600">
                                        {city.states.length > 0 ? (
                                            <div className="space-y-1">
                                                {city.states.map((state, idx) => (
                                                    <p key={`${state.name}-${idx}`} className="truncate">
                                                        • {state.name}
                                                    </p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 italic">No states available</p>
                                        )}
                                    </div>

                                    {/* STATE COUNT */}
                                    <div className="mt-3 pt-3 border-t">
                                        <p className="text-xs text-gray-500">
                                            {city.states.length} {city.states.length === 1 ? 'State' : 'States'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <nav aria-label="Page navigation" className="mt-10 flex justify-center px-6">
                                <ul className="flex -space-x-px text-sm">
                                    {/* Previous Button */}
                                    <li>
                                        <button
                                            disabled={page === 1}
                                            onClick={() => setPage(p => p - 1)}
                                            className="flex items-center justify-center text-gray-700 bg-white box-border border border-gray-300 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-s-lg text-sm w-10 h-10 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                                            </svg>
                                        </button>
                                    </li>

                                    {/* Page Numbers */}
                                    {getPaginationRange().map((pageNum, idx) => (
                                        <li key={pageNum === '...' ? `ellipsis-${idx}` : pageNum}>
                                            {pageNum === '...' ? (
                                                <span className="flex items-center justify-center text-gray-700 bg-white box-border border border-gray-300 font-medium text-sm w-10 h-10">
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => setPage(pageNum as number)}
                                                    aria-current={page === pageNum ? 'page' : undefined}
                                                    className={`flex items-center justify-center box-border border border-gray-300 font-medium text-sm w-10 h-10 focus:outline-none ${page === pageNum
                                                        ? 'text-orange-600 bg-orange-50 hover:text-orange-600'
                                                        : 'text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-900'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            )}
                                        </li>
                                    ))}

                                    {/* Next Button */}
                                    <li>
                                        <button
                                            disabled={page === totalPages}
                                            onClick={() => setPage(p => p + 1)}
                                            className="flex items-center justify-center text-gray-700 bg-white box-border border border-gray-300 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-e-lg text-sm w-10 h-10 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
