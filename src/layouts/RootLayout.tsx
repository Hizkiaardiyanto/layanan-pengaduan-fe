import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 ml-64 sm:ml-20 p-6 bg-gray-100"> {/* margin left untuk sidebar */}
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout;
