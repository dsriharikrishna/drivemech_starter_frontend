import Navbar from '@/components/Layout/Navbar'
import React from 'react'

const layout = ({ children }: any) => {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default layout