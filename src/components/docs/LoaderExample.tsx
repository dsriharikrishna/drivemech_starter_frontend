import Loader from "@/components/ui/Loader";

const LoaderExample = () => {
  return (
    <div className="space-y-12">
      {/* Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Loader Variants</h3>
        <div className="flex items-center gap-12 flex-wrap">
          <div className="text-center">
            <Loader variant="spinner" size="lg" />
            <p className="text-sm text-gray-600 mt-3">Spinner</p>
          </div>
          <div className="text-center">
            <Loader variant="dots" size="lg" />
            <p className="text-sm text-gray-600 mt-3">Dots</p>
          </div>
          <div className="text-center">
            <Loader variant="pulse" size="lg" />
            <p className="text-sm text-gray-600 mt-3">Pulse</p>
          </div>
          <div className="text-center">
            <Loader variant="bars" size="lg" />
            <p className="text-sm text-gray-600 mt-3">Bars</p>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Loader size="sm" />
            <p className="text-sm text-gray-600 mt-2">Small</p>
          </div>
          <div className="text-center">
            <Loader size="md" />
            <p className="text-sm text-gray-600 mt-2">Medium</p>
          </div>
          <div className="text-center">
            <Loader size="lg" />
            <p className="text-sm text-gray-600 mt-2">Large</p>
          </div>
          <div className="text-center">
            <Loader size="xl" />
            <p className="text-sm text-gray-600 mt-2">Extra Large</p>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Color Options</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Loader color="primary" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Primary</p>
          </div>
          <div className="text-center">
            <Loader color="secondary" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Secondary</p>
          </div>
          <div className="text-center bg-gray-800 p-4 rounded-lg">
            <Loader color="white" size="lg" />
            <p className="text-sm text-white mt-2">White</p>
          </div>
          <div className="text-center">
            <Loader color="gray" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Gray</p>
          </div>
        </div>
      </div>

      {/* With Text */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Loading Text</h3>
        <div className="flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-lg">
          <Loader variant="spinner" size="lg" />
          <p className="text-gray-700 font-medium">Loading data...</p>
        </div>
      </div>

      {/* Different Variants with Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Variants with Different Colors
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Loader variant="spinner" color="primary" size="lg" />
            <p className="text-xs text-gray-600 mt-2">Spinner Primary</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Loader variant="dots" color="secondary" size="lg" />
            <p className="text-xs text-gray-600 mt-2">Dots Secondary</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Loader variant="pulse" color="primary" size="lg" />
            <p className="text-xs text-gray-600 mt-2">Pulse Primary</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Loader variant="bars" color="secondary" size="lg" />
            <p className="text-xs text-gray-600 mt-2">Bars Secondary</p>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">size</code> -
                Loader size: "sm" | "md" | "lg" | "xl"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">color</code> -
                Loader color (optional)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Four size options</li>
              <li>Smooth spinning animation</li>
              <li>Customizable color</li>
              <li>Lightweight and performant</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Loader from "@/components/ui/Loader";

<Loader size="md" />
<Loader size="lg" color="blue" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderExample;
