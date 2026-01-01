import { Shield, Headphones, Package, FileText, BarChart3, CreditCard } from 'lucide-react';

export default function CustomerGarageSection() {
  return (
    <section id="garages" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">

          {/* Left Side - Heading */}
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Are you a <span className="text-orange-500">Customer</span> or a{' '}
              <span className="text-orange-500">Garage Owner?</span>
            </h2>
          </div>

          {/* Right Side - Cards Container */}
          <div className="flex-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

            {/* For Car Owners Card */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">For Car Owners</h3>
              <p className="text-white/90 mb-6 text-sm">
                Experience premium vehicle care with complete peace of mind
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Verified Technicians</h4>
                    <p className="text-white/80 text-xs">All mechanics are background-checked and certified</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Headphones className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">24/7 Support</h4>
                    <p className="text-white/80 text-xs">Round-the-clock customer assistance</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Genuine Parts</h4>
                    <p className="text-white/80 text-xs">Only authentic OEM and branded parts</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-orange-500 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Book My Service
              </button>
            </div>

            {/* For Garages Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-900 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">For Garages</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Streamline your operations and grow your business
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                  <div>
                    <h4 className="font-semibold text-sm">Digital Job Cards</h4>
                    <p className="text-gray-400 text-xs">Paperless and flow management</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                  <div>
                    <h4 className="font-semibold text-sm">Inventory Management</h4>
                    <p className="text-gray-400 text-xs">Real-time stock tracking and alerts</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                  <div>
                    <h4 className="font-semibold text-sm">Billing Automation</h4>
                    <p className="text-gray-400 text-xs">Instant invoices and payment tracking</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Request For A Demo
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
