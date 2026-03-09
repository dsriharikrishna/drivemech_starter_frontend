import React, { useState } from "react";
import TimePicker from "@/components/ui/TimePicker";

const TimePickerExample = () => {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [time24Hour, setTime24Hour] = useState<string>("");

  return (
    <div className="space-y-8 max-w-md">
      {/* Basic Time Picker */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Basic Time Picker (12-hour)
        </h3>
        <TimePicker
          label="Select Time"
          placeholder="Choose a time"
          value={selectedTime}
          onChange={setSelectedTime}
        />
        {selectedTime && (
          <p className="mt-2 text-sm text-gray-600">Selected: {selectedTime}</p>
        )}
      </div>

      {/* Required Field */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Required Field</h3>
        <TimePicker
          label="Estimated Time"
          placeholder="Select Time"
          value={estimatedTime}
          onChange={setEstimatedTime}
          required
        />
        {estimatedTime && (
          <p className="mt-2 text-sm text-gray-600">
            Estimated: {estimatedTime}
          </p>
        )}
      </div>

      {/* 24-Hour Format */}
      <div>
        <h3 className="text-lg font-semibold mb-4">24-Hour Format</h3>
        <TimePicker
          label="Time (24-hour)"
          placeholder="Select time"
          value={time24Hour}
          onChange={setTime24Hour}
          use24Hour
        />
        {time24Hour && (
          <p className="mt-2 text-sm text-gray-600">Selected: {time24Hour}</p>
        )}
      </div>

      {/* Without Label */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Without Label</h3>
        <TimePicker placeholder="Pick a time" />
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">label</code> -
                Label text above the picker
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  placeholder
                </code>{" "}
                - Placeholder text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">value</code> -
                Selected time string
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onChange</code>{" "}
                - Change handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">required</code>{" "}
                - Mark as required field
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                Scrollable time selection (hours, minutes, seconds, AM/PM)
              </li>
              <li>12-hour and 24-hour format support</li>
              <li>Smooth scrolling interface</li>
              <li>Click outside to close</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import TimePicker from "@/components/ui/TimePicker";

<TimePicker
  label="Select Time"
  placeholder="Choose time"
  value={time}
  onChange={setTime}
  required
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePickerExample;
