import React from 'react'

const TowingServicesPage = () => {
    return (
        <div className="w-full h-full p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Towing Services</h1>
                <p className="text-gray-600 mb-8">
                    Manage towing requests and service providers
                </p>

                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Towing Services</h3>
                        <p className="text-gray-500">This section is under development</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TowingServicesPage
