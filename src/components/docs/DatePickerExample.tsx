import React, { useState } from "react";
import DatePicker from "@/components/ui/DatePicker";

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [estimatedDate, setEstimatedDate] = useState<Date | null>(null);

  return (
    <div className="space-y-8 max-w-md">
      {/* Basic Date Picker */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Date Picker</h3>
        <DatePicker
          label="Select Date"
          placeholder="Choose a date"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        {selectedDate && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedDate.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* With Decline Button */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Decline Button</h3>
        <DatePicker
          label="Estimated Date"
          placeholder="Select Date"
          value={estimatedDate}
          onChange={setEstimatedDate}
          required
          showDeclineButton
        />
        {estimatedDate && (
          <p className="mt-2 text-sm text-gray-600">
            Estimated: {estimatedDate.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Without Label */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Without Label</h3>
        <DatePicker placeholder="Pick a date" />
      </div>

      {/* Required Field */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Required Field</h3>
        <DatePicker
          label="Appointment Date"
          placeholder="Select appointment date"
          required
        />
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
                Selected date (Date | null)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onChange</code>{" "}
                - Change handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">required</code>{" "}
                - Mark as required field
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  showDeclineButton
                </code>{" "}
                - Show decline/clear button
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Calendar popup with month/year navigation</li>
              <li>Today button for quick selection</li>
              <li>Optional decline/clear button</li>
              <li>Keyboard navigation support</li>
              <li>Click outside to close</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import DatePicker from "@/components/ui/DatePicker";
import { useState } from "react";

const [date, setDate] = useState<Date | null>(null);

<DatePicker
  label="Select Date"
  placeholder="Choose a date"
  value={date}
  onChange={setDate}
  required
  showDeclineButton
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerExample;
