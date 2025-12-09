import Navbar from '@/components/Layout/Navbar'

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