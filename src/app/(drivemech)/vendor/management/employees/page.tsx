import React from 'react'

const EmployeesPage = () => {
    return (
        <div className="w-full h-full p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Employees</h1>
                <p className="text-gray-600 mb-8">
                    Manage employee information and performance
                </p>

                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Employees</h3>
                        <p className="text-gray-500">This section is under development</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeesPage
