import React from 'react'

const BookingDiaryPage = () => {
    return (
        <div className="w-full h-full p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Diary</h1>
                <p className="text-gray-600 mb-8">
                    View and manage all workshop bookings and appointments
                </p>

                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Diary</h3>
                        <p className="text-gray-500">This section is under development</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDiaryPage
