import React from "react";
import {
  SmoothLandingBox,
  SmoothLandingContainer,
  SmoothLandingItem,
} from "@/components/animations/SmoothLandingBox";

const SmoothLandingBoxExample = () => {
  return (
    <div className="space-y-8">
      {/* Basic Usage */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
        <div className="p-4 border rounded-lg bg-gray-50 overflow-hidden">
          <SmoothLandingBox>
            <div className="bg-white p-4 rounded shadow-sm text-center">
              Content appears with smooth slide-up animation
            </div>
          </SmoothLandingBox>
        </div>
      </div>

      {/* Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Animation Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SmoothLandingBox
            variant="fade"
            className="p-4 bg-blue-50 rounded border border-blue-100 text-center text-blue-800"
          >
            Fade
          </SmoothLandingBox>
          <SmoothLandingBox
            variant="slide-up"
            className="p-4 bg-green-50 rounded border border-green-100 text-center text-green-800"
          >
            Slide Up
          </SmoothLandingBox>
          <SmoothLandingBox
            variant="slide-down"
            className="p-4 bg-purple-50 rounded border border-purple-100 text-center text-purple-800"
          >
            Slide Down
          </SmoothLandingBox>
          <SmoothLandingBox
            variant="slide-left"
            className="p-4 bg-orange-50 rounded border border-orange-100 text-center text-orange-800"
          >
            Slide Left
          </SmoothLandingBox>
          <SmoothLandingBox
            variant="slide-right"
            className="p-4 bg-teal-50 rounded border border-teal-100 text-center text-teal-800"
          >
            Slide Right
          </SmoothLandingBox>
          <SmoothLandingBox
            variant="scale"
            className="p-4 bg-red-50 rounded border border-red-100 text-center text-red-800"
          >
            Scale
          </SmoothLandingBox>
          <SmoothLandingBox
            variant="bounce"
            className="p-4 bg-yellow-50 rounded border border-yellow-100 text-center text-yellow-800"
          >
            Bounce
          </SmoothLandingBox>
        </div>
      </div>

      {/* Interactive */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Interactive (Hover & Tap)
        </h3>
        <div className="flex flex-wrap gap-4">
          <SmoothLandingBox hover tap className="cursor-pointer">
            <div className="bg-white px-6 py-3 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
              Hover & Click Me
            </div>
          </SmoothLandingBox>
          <SmoothLandingBox hover className="cursor-pointer">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors">
              Hover Effect Only
            </div>
          </SmoothLandingBox>
        </div>
      </div>

      {/* Staggered Container */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Staggered Container</h3>
        <div className="p-4 border rounded-lg bg-gray-50">
          <SmoothLandingContainer
            staggerDelay={0.1}
            className="grid grid-cols-2 gap-4"
          >
            {[1, 2, 3, 4].map((item) => (
              <SmoothLandingItem key={item} variant="slide-up">
                <div className="bg-white p-4 rounded shadow-sm text-center">
                  Item {item}
                </div>
              </SmoothLandingItem>
            ))}
          </SmoothLandingContainer>
        </div>
      </div>

      {/* Navigation Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Sidebar Navigation Example
        </h3>
        <div className="w-64 bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <SmoothLandingBox variant="fade" delay={0.1}>
              <div className="font-bold text-gray-800">My App</div>
            </SmoothLandingBox>
          </div>
          <div className="p-2">
            <SmoothLandingContainer staggerDelay={0.05}>
              {["Dashboard", "Users", "Settings", "Logout"].map((item) => (
                <SmoothLandingItem
                  key={item}
                  variant="slide-right"
                  distance={10}
                >
                  <div className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700">
                    {item}
                  </div>
                </SmoothLandingItem>
              ))}
            </SmoothLandingContainer>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">variant</code> -
                Animation style: 'fade' | 'slide-up' | 'slide-down' |
                'slide-left' | 'slide-right' | 'scale' | 'bounce'
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">delay</code> -
                Delay in seconds (default: 0)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">duration</code>{" "}
                - Animation duration in seconds (default: 0.6)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">distance</code>{" "}
                - Slide distance in pixels (default: 24)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">hover</code> -
                Enable hover scale effect (boolean)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">tap</code> -
                Enable tap click effect (boolean)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">once</code> -
                Run animation only once when in view (default: true)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`import { SmoothLandingBox, SmoothLandingContainer, SmoothLandingItem } from '@/components/animations/SmoothLandingBox'

// Single Element
<SmoothLandingBox variant="slide-up" delay={0.2} hover>
  <div className="card">My Content</div>
</SmoothLandingBox>

// Staggered List
<SmoothLandingContainer>
  {items.map(item => (
    <SmoothLandingItem key={item.id}>
      <Card item={item} />
    </SmoothLandingItem>
  ))}
</SmoothLandingContainer>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmoothLandingBoxExample;
