'use client'

import React from 'react'

interface UserProfileProps {
    name: string
    email: string
    avatarUrl: string
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, avatarUrl }) => {
    return (
        <div className="px-4 pb-4">
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl overflow-hidden bg-gray-300 flex-shrink-0">
                    <img
                        src={avatarUrl}
                        alt="User Avatar"
                        width={44}
                        height={44}
                        className="object-cover rounded-full w-full h-full"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-tight mt-0.5">
                        {email}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
