"use client";

import React, { useState } from "react";
import StandaloneTiptap from "@/components/editor/StandaloneTiptap";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

/* ---------------- TEMPLATE TEXT AREA COMPONENT ---------------- */

interface TemplateTextAreaProps {
  title: string;
  placeholder?: string;
  defaultValue?: string;
  showToolbar?: boolean;
  showAddButton?: boolean;
}

const TemplateTextArea: React.FC<TemplateTextAreaProps> = ({
  title,
  placeholder = "Please go to [Settings][Company Lists] and choose or create the appropriate template",
  defaultValue = "",
  showToolbar = true,
  showAddButton = true,
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <StandaloneTiptap
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        showToolbar={showToolbar}
        minHeight="150px"
      />
      {showAddButton && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="sm"
            startIcon={<Plus size={18} />}
            className="rounded-lg"
          >
            Add Template
          </Button>
        </div>
      )}
    </div>
  );
};

/* ---------------- READ ONLY TEXT DISPLAY ---------------- */

interface ReadOnlyTextDisplayProps {
  title: string;
  content: string;
}

const ReadOnlyTextDisplay: React.FC<ReadOnlyTextDisplayProps> = ({
  title,
  content,
}) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
        <p className="text-sm text-gray-700 whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

/* ---------------- MAIN MESSAGES TAB COMPONENT ---------------- */

const MessagesTab = () => {
  return (
    <div className="space-y-8">
      {/* Email Message Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Email Message
        </h3>

        <div className="space-y-6">
          {/* Invoice Email - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemplateTextArea title="Invoice Email Text" />
            <TemplateTextArea title="Supplier Invoice Email Text" />
          </div>

          {/* Statement Email - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemplateTextArea title="Statement Email Text" />
            <TemplateTextArea title="Supplier Email Text" />
          </div>

          {/* Inspection Email - 1 column */}
          <TemplateTextArea title="Inspection Email Text" />
        </div>
      </div>

      {/* SMS Message Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          SMS Message
        </h3>
        <TemplateTextArea title="Invoice SMS Text" showToolbar={false} />
      </div>

      {/* Footer Message Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Footer Message
        </h3>

        <div className="space-y-6">
          {/* Invoice & Job Card Footer - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReadOnlyTextDisplay
              title="Invoice Footer Text"
              content={`Note that our Banking details are Account Name xxxxxxxxxxxxxxxxx | BSB xxx-xxx | Account Number xxxxxxxxxx

Please remember to note the INVOICE or ESTIMATE number on your EFT remittance

Our Terms and Conditions are ...`}
            />
            <ReadOnlyTextDisplay
              title="Job Card Footer Text"
              content={`I hereby authorise (Your Company Name) to repair my vehicle.

Customer Signature: ___________________
Date: _______ / _______ / _______`}
            />
          </div>

          {/* Statement & Quote Footer - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReadOnlyTextDisplay
              title="Statement Footer Text"
              content={`Note that our Banking details are

Bank details         ABCD BANK
IFS code            abc-DDDDXXXX
Swift code          ABCDUEBBXXX
Account #           1xxxxxxxxx0011`}
            />
            <ReadOnlyTextDisplay
              title="Quote Footer Text"
              content={`Please note this Estimate is valid for xx days. Prices may be subject to change without notice.

Our Terms & Conditions are ...`}
            />
          </div>

          {/* Cash Invoice Footer - 1 column */}
          <ReadOnlyTextDisplay title="Cash Invoice Footer" content="" />
        </div>
      </div>

      {/* Booking Message Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Booking Message
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <TemplateTextArea
              title="Email Booking Confirmation"
              defaultValue={`Hello %custfullname%

Your %vehiclemake% %vehiclemodel% booking for a %appointmenttype% is confirmed for %bookdate%.

If there is any change to this booking, please email or call the workshop on (Your Preferred Contact Number).

Thank you for your booking, we look forward to welcoming you to our service centre on %bookdate%.

Thanks Again

The Team @ (Your Business Name)`}
              showAddButton={false}
            />
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p>
                • To insert the booking date, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%bookdate%</code>
              </p>
              <p>
                • To insert the rego number, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%regnumbr%</code>
              </p>
              <p>
                • To insert the make of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehiclemake%</code>
              </p>
              <p>
                • To insert the model of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehiclemodel%</code>
              </p>
              <p>
                • To insert the year of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehicleyear%</code>
              </p>
              <p>
                • To insert the full name of the customer, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%custfullname%</code>
              </p>
              <p>
                • To insert the type of appointment, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">
                  %appointmenttype%
                </code>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <TemplateTextArea
              title="SMS Booking Confirmation"
              defaultValue={`Hello %custfullname%

Your %vehiclemake% %vehiclemodel% booking for a %appointmenttype% is confirmed for %bookdate%.

If there is any change to this booking, please email or call the workshop on (Your Preferred Contact Number).

Thank you for your booking, we look forward to welcoming you to our service centre on %bookdate%.

Thanks Again

The Team @ (Your Business Name)`}
              showAddButton={false}
              showToolbar={false}
            />
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p>
                • To insert the booking date, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%bookdate%</code>
              </p>
              <p>
                • To insert the rego number, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%regnumbr%</code>
              </p>
              <p>
                • To insert the make of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehiclemake%</code>
              </p>
              <p>
                • To insert the model of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehiclemodel%</code>
              </p>
              <p>
                • To insert the year of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehicleyear%</code>
              </p>
              <p>
                • To insert the full name of the customer, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%custfullname%</code>
              </p>
              <p>
                • To insert the type of appointment, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">
                  %appointmenttype%
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Message Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Other Message
        </h3>

        <div className="space-y-6">
          {/* Loan Cars Terms */}
          <div className="space-y-3">
            <ReadOnlyTextDisplay
              title="Loan Cars Terms and Conditions"
              content={`SAMPLE

Terms & Conditions

1. That All Running Expenses (Including Fuel) Be Supplied By The Customer.

2. The customer shall not lend the vehicle or allow any person to drive the vehicle, other than a person authorised in writing by the company 'The designated driver the customer or the person noted above as the 'driver'

3. The customer shall indemnify the company for any loss or damage caused to or by the vehicle which occurs whilst it is in the control of or driven by person(s) other than a person authorised in writing by the company.

4. The customer shall indemnify the company for any loss or damage caused to or by the vehicle which, in the reasonable opinion of the company, was caused or contributed to or by the vehicle whilst in the possession of customer. The maximum amount of $1000 or the cost of the repair whichever is the lower. Such amount to be paid within 7 days.

5. The company has the right to require, in any manner and at any time, the immediate return of the vehicle by the customer and the customer shall return the vehicle to the company or to a person nominated by the company.

6. The customer will advise immediately of any damage or breakdown to the vehicle

7. The customer, while in possession of the vehicle, will be fully responsible and liable for any traffic/parking offences or any other fines imposed from time to time by local council and/or other controlling bodies regulations and will indemnify the company for any such offences.

8. Consumption of any alcohol or any drug (unless prescribed by a medical practitioner) is not permitted whilst driving or in control of the vehicle.

9. The vehicle will be used within a 50 kilometre radius of the company address unless otherwise agreed by the company

10. The vehicle is to be maintained in a clean and tidy condition. A charge (payable within 7 days) may be imposed if the vehicle is returned in any unreasonable condition.

I, the above named Customer have read the conditions for use of the loan car and agree to these terms.`}
            />
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p>
                • To insert the booking date, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%bookdate%</code>
              </p>
              <p>
                • To insert the rego number, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%regnumbr%</code>
              </p>
              <p>
                • To insert the make of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehiclemake%</code>
              </p>
              <p>
                • To insert the model of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehiclemodel%</code>
              </p>
              <p>
                • To insert the year of the vehicle, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%vehicleyear%</code>
              </p>
              <p>
                • To insert the full name of the customer, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%custfullname%</code>
              </p>
              <p>
                • To insert the type of appointment, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">
                  %appointmenttype%
                </code>
              </p>
            </div>
          </div>

          {/* Default Bulk SMS */}
          <div className="space-y-3">
            <TemplateTextArea
              title="Default Bulk SMS"
              showAddButton={false}
              showToolbar={false}
            />
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p>
                To insert the full name of the customer, use the placeholder{" "}
                <code className="bg-gray-200 px-1 rounded">%custfullname%</code>
                , customer first name:{" "}
                <code className="bg-gray-200 px-1 rounded">
                  %custfirstname%
                </code>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;
