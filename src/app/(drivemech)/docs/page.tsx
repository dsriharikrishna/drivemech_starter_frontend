"use client";

import React from "react";
import DatePickerExample from "@/components/docs/DatePickerExample";
import TimePickerExample from "@/components/docs/TimePickerExample";
import FilledTabsExample from "@/components/docs/FilledTabsExample";
import TabsExample from "@/components/docs/TabsExample";
import TableExample from "@/components/docs/TableExample";
import StepperExample from "@/components/docs/StepperExample";
import HorizontalStepperExample from "@/components/docs/HorizontalStepperExample";
import ButtonExample from "@/components/docs/ButtonExample";
import CardExample from "@/components/docs/CardExample";
import ScrollableTabsExample from "@/components/docs/ScrollableTabsExample";
import AvatarExample from "@/components/docs/AvatarExample";
import DropDownExample from "@/components/docs/DropDownExample";
import DividerExample from "@/components/docs/DividerExample";
import ToggleSwitchExample from "@/components/docs/ToggleSwitchExample";
import LoaderExample from "@/components/docs/LoaderExample";
import TooltipExample from "@/components/docs/TooltipExample";
import CopyClipboardExample from "@/components/docs/CopyClipboardExample";
import TypographyExample from "@/components/docs/TypographyExample";
import StatusBadgeExample from "@/components/docs/StatusBadgeExample";
import DialogExample from "@/components/docs/DialogExample";
import FormInputsExample from "@/components/docs/FormInputsExample";
import AdvancedInputsExample from "@/components/docs/AdvancedInputsExample";
import RichTextEditorExample from "@/components/docs/RichTextEditorExample";
import CommonNumberInputExample from "@/components/docs/CommonNumberInputExample";
import LeftDrawerExample from "@/components/docs/LeftDrawerExample";
import RightDrawerExample from "@/components/docs/RightDrawerExample";
import MenuExample from "@/components/docs/MenuExample";
import MultiSelectDropdownExample from "@/components/docs/MultiSelectDropdownExample";
import ToastExample from "@/components/docs/ToastExample";
import SharePercentageInputExample from "@/components/docs/SharePercentageInputExample";
import LoadingSpinnerExample from "@/components/docs/LoadingSpinnerExample";
import TimelineExample from "@/components/docs/TimelineExample";
import SmoothLandingBoxExample from "@/components/docs/SmoothLandingBoxExample";
import AccordionExample from "@/components/docs/AccordionExample";
import RegoInputExample from "@/components/docs/RegoInputExample";
import DocumentUploadExample from "@/components/docs/DocumentUploadExample";
import MediaUploadSectionExample from "@/components/docs/MediaUploadSectionExample";
import ActionDropdownExample from "@/components/docs/ActionDropdownExample";
import ControlledDropdownExample from "@/components/docs/ControlledDropdownExample";
import FormActionButtonsExample from "@/components/docs/FormActionButtonsExample";

const DocsPage = () => {
  const tabs = [
    // Basic UI Components
    { id: "button", label: "Button" },
    { id: "card", label: "Card" },
    { id: "avatar", label: "Avatar" },
    { id: "statusbadge", label: "StatusBadge" },
    { id: "divider", label: "Divider" },
    { id: "loader", label: "Loader" },
    { id: "loadingspinner", label: "LoadingSpinner" },
    { id: "tooltip", label: "Tooltip" },
    { id: "copyclipboard", label: "CopyClipboard" },
    { id: "typography", label: "Typography" },

    // Form Components
    { id: "forminputs", label: "Form Inputs" },
    { id: "advancedinputs", label: "Advanced Inputs" },
    { id: "commonnumberinput", label: "NumberInput" },
    { id: "sharepercentageinput", label: "SharePercentageInput" },
    { id: "dropdown", label: "DropDown" },
    { id: "multiselectdropdown", label: "MultiSelectDropdown" },
    { id: "datepicker", label: "DatePicker" },
    { id: "timepicker", label: "TimePicker" },
    { id: "toggleswitch", label: "ToggleSwitch" },
    { id: "richtexteditor", label: "RichTextEditor" },
    { id: "regoinput", label: "RegoInput" },
    { id: "documentupload", label: "DocumentUpload" },
    { id: "mediaupload", label: "MediaUploadSection" },
    { id: "formactionbuttons", label: "FormActionButtons" },
    { id: "controlleddropdown", label: "ControlledDropdown" },

    // Layout Components
    { id: "accordion", label: "Accordion" },
    { id: "tabs", label: "Tabs" },
    { id: "filledtabs", label: "FilledTabs" },
    { id: "scrollabletabs", label: "ScrollableTabs" },
    { id: "table", label: "Table" },
    { id: "stepper", label: "Stepper" },
    { id: "horizontal-stepper", label: "HorizontalStepper" },
    { id: "timeline", label: "Timeline" },

    // Feedback Components
    { id: "dialog", label: "Dialog" },
    { id: "toast", label: "Toast" },
    { id: "leftdrawer", label: "LeftDrawer" },
    { id: "rightdrawer", label: "RightDrawer" },
    { id: "menu", label: "Menu" },
    { id: "actiondropdown", label: "ActionDropdown" },

    // Advanced Components
    { id: "smoothanimation", label: "SmoothAnimation" },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Component Documentation
          </h1>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-16">
            {/* Button Section */}
            <section id="button" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Button</h2>
                  <p className="text-cyan-100 mt-1">
                    Versatile button component with multiple variants and sizes
                  </p>
                </div>
                <div className="p-6">
                  <ButtonExample />
                </div>
              </div>
            </section>

            {/* Card Section */}
            <section id="card" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Card</h2>
                  <p className="text-blue-100 mt-1">
                    Custom card component with title, description, and footer
                  </p>
                </div>
                <div className="p-6">
                  <CardExample />
                </div>
              </div>
            </section>

            {/* Avatar Section */}
            <section id="avatar" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Avatar</h2>
                  <p className="text-rose-100 mt-1">
                    User avatar component with initials and image support
                  </p>
                </div>
                <div className="p-6">
                  <AvatarExample />
                </div>
              </div>
            </section>

            {/* StatusBadge Section */}
            <section id="statusbadge" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">StatusBadge</h2>
                  <p className="text-emerald-100 mt-1">
                    Status indicator badges with multiple variants
                  </p>
                </div>
                <div className="p-6">
                  <StatusBadgeExample />
                </div>
              </div>
            </section>

            {/* Divider Section */}
            <section id="divider" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-500 to-slate-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Divider</h2>
                  <p className="text-slate-100 mt-1">
                    Horizontal and vertical dividers with optional text
                  </p>
                </div>
                <div className="p-6">
                  <DividerExample />
                </div>
              </div>
            </section>

            {/* Loader Section */}
            <section id="loader" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Loader</h2>
                  <p className="text-fuchsia-100 mt-1">
                    Loading spinner in multiple sizes
                  </p>
                </div>
                <div className="p-6">
                  <LoaderExample />
                </div>
              </div>
            </section>

            {/* LoadingSpinner Section */}
            <section id="loadingspinner" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    LoadingSpinner
                  </h2>
                  <p className="text-gray-100 mt-1">
                    Simple loading spinner for buttons, cards, and overlays
                  </p>
                </div>
                <div className="p-6">
                  <LoadingSpinnerExample />
                </div>
              </div>
            </section>

            {/* Tooltip Section */}
            <section id="tooltip" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-lime-500 to-lime-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Tooltip</h2>
                  <p className="text-lime-100 mt-1">
                    Contextual tooltips with multiple positions
                  </p>
                </div>
                <div className="p-6">
                  <TooltipExample />
                </div>
              </div>
            </section>

            {/* CopyClipboard Section */}
            <section id="copyclipboard" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    CopyClipboard
                  </h2>
                  <p className="text-red-100 mt-1">
                    Copy-to-clipboard component with visual feedback
                  </p>
                </div>
                <div className="p-6">
                  <CopyClipboardExample />
                </div>
              </div>
            </section>

            {/* Typography Section */}
            <section id="typography" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Typography</h2>
                  <p className="text-yellow-100 mt-1">
                    Text styling component with predefined variants
                  </p>
                </div>
                <div className="p-6">
                  <TypographyExample />
                </div>
              </div>
            </section>

            {/* Form Inputs Section */}
            <section id="forminputs" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Form Inputs</h2>
                  <p className="text-green-100 mt-1">
                    Common form input components with validation support
                  </p>
                </div>
                <div className="p-6">
                  <FormInputsExample />
                </div>
              </div>
            </section>

            {/* Advanced Inputs Section */}
            <section id="advancedinputs" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    Advanced Inputs
                  </h2>
                  <p className="text-indigo-100 mt-1">
                    Advanced form inputs with floating labels and phone
                    formatting
                  </p>
                </div>
                <div className="p-6">
                  <AdvancedInputsExample />
                </div>
              </div>
            </section>

            {/* CommonNumberInput Section */}
            <section id="commonnumberinput" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">NumberInput</h2>
                  <p className="text-teal-100 mt-1">
                    Number input with min/max validation, decimal support, and
                    icons
                  </p>
                </div>
                <div className="p-6">
                  <CommonNumberInputExample />
                </div>
              </div>
            </section>

            {/* SharePercentageInput Section */}
            <section id="sharepercentageinput" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    SharePercentageInput
                  </h2>
                  <p className="text-orange-100 mt-1">
                    Percentage input with slider for ownership and profit shares
                  </p>
                </div>
                <div className="p-6">
                  <SharePercentageInputExample />
                </div>
              </div>
            </section>

            {/* DropDown Section */}
            <section id="dropdown" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto">
                <div className="bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">DropDown</h2>
                  <p className="text-violet-100 mt-1">
                    Dropdown select component with search and filtering
                  </p>
                </div>
                <div className="p-6">
                  <DropDownExample />
                </div>
              </div>
            </section>

            {/* MultiSelectDropdown Section */}
            <section id="multiselectdropdown" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    MultiSelectDropdown
                  </h2>
                  <p className="text-blue-100 mt-1">
                    Multi-selection dropdown with search and chip display
                  </p>
                </div>
                <div className="p-6">
                  <MultiSelectDropdownExample />
                </div>
              </div>
            </section>

            {/* Date Picker Section */}
            <section id="datepicker" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">DatePicker</h2>
                  <p className="text-blue-100 mt-1">
                    Calendar-based date selection with month/year navigation
                  </p>
                </div>
                <div className="p-6">
                  <DatePickerExample />
                </div>
              </div>
            </section>

            {/* Time Picker Section */}
            <section id="timepicker" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">TimePicker</h2>
                  <p className="text-purple-100 mt-1">
                    Scrollable time selector with hours, minutes, seconds, and
                    AM/PM
                  </p>
                </div>
                <div className="p-6">
                  <TimePickerExample />
                </div>
              </div>
            </section>

            {/* ToggleSwitch Section */}
            <section id="toggleswitch" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    ToggleSwitch
                  </h2>
                  <p className="text-sky-100 mt-1">
                    Toggle switch for binary on/off states
                  </p>
                </div>
                <div className="p-6">
                  <ToggleSwitchExample />
                </div>
              </div>
            </section>

            {/* RichTextEditor Section */}
            <section id="richtexteditor" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    RichTextEditor
                  </h2>
                  <p className="text-orange-100 mt-1">
                    Rich text editor with formatting toolbar for creating
                    formatted content
                  </p>
                </div>
                <div className="p-6">
                  <RichTextEditorExample />
                </div>
              </div>
            </section>

            {/* RegoInput Section */}
            <section id="regoinput" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">RegoInput</h2>
                  <p className="text-blue-100 mt-1">
                    Combined state selector and vehicle registration number
                    input
                  </p>
                </div>
                <div className="p-6">
                  <RegoInputExample />
                </div>
              </div>
            </section>

            {/* DocumentUpload Section */}
            <section id="documentupload" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    DocumentUpload
                  </h2>
                  <p className="text-indigo-100 mt-1">
                    File upload component with image/PDF preview and removal
                    logic
                  </p>
                </div>
                <div className="p-6">
                  <DocumentUploadExample />
                </div>
              </div>
            </section>

            {/* MediaUploadSection Section */}
            <section id="mediaupload" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-rose-600 to-orange-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    MediaUploadSection
                  </h2>
                  <p className="text-rose-100 mt-1">
                    Large drag-and-drop zone for multiple high-resolution photos
                  </p>
                </div>
                <div className="p-6">
                  <MediaUploadSectionExample />
                </div>
              </div>
            </section>

            {/* FormActionButtons Section */}
            <section id="formactionbuttons" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    FormActionButtons
                  </h2>
                  <p className="text-emerald-100 mt-1">
                    Standardized Save and Cancel button pairs for form submisson
                  </p>
                </div>
                <div className="p-6">
                  <FormActionButtonsExample />
                </div>
              </div>
            </section>

            {/* ControlledDropdown Section */}
            <section id="controlleddropdown" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    ControlledDropdown
                  </h2>
                  <p className="text-fuchsia-100 mt-1">
                    React Hook Form wrapper for standardized dropdown selects
                  </p>
                </div>
                <div className="p-6">
                  <ControlledDropdownExample />
                </div>
              </div>
            </section>

            {/* Accordion Section */}
            <section id="accordion" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Accordion</h2>
                  <p className="text-slate-100 mt-1">
                    Collapsible accordion component with customizable header
                    colors and icons
                  </p>
                </div>
                <div className="p-6">
                  <AccordionExample />
                </div>
              </div>
            </section>

            {/* Tabs Section */}
            <section id="tabs" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Tabs</h2>
                  <p className="text-green-100 mt-1">
                    Underline-style tab navigation with smooth transitions
                  </p>
                </div>
                <div className="p-6">
                  <TabsExample />
                </div>
              </div>
            </section>

            {/* Filled Tabs Section */}
            <section id="filledtabs" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">FilledTabs</h2>
                  <p className="text-orange-100 mt-1">
                    Filled background tab navigation with active state
                  </p>
                </div>
                <div className="p-6">
                  <FilledTabsExample />
                </div>
              </div>
            </section>

            {/* ScrollableTabs Section */}
            <section id="scrollabletabs" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    ScrollableTabs
                  </h2>
                  <p className="text-amber-100 mt-1">
                    Scrollable tab navigation with arrow controls and touch
                    support
                  </p>
                </div>
                <div className="p-6">
                  <ScrollableTabsExample />
                </div>
              </div>
            </section>

            {/* Table Section */}
            <section id="table" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Table</h2>
                  <p className="text-indigo-100 mt-1">
                    Feature-rich data table with sorting, pagination, selection,
                    and custom rendering
                  </p>
                </div>
                <div className="p-6">
                  <TableExample />
                </div>
              </div>
            </section>

            {/* Stepper Section */}
            <section id="stepper" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    Stepper (Vertical)
                  </h2>
                  <p className="text-pink-100 mt-1">
                    Vertical step indicator for multi-step processes
                  </p>
                </div>
                <div className="p-6">
                  <StepperExample />
                </div>
              </div>
            </section>

            {/* Horizontal Stepper Section */}
            <section id="horizontal-stepper" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    HorizontalStepper
                  </h2>
                  <p className="text-teal-100 mt-1">
                    Horizontal step indicator for multi-step workflows
                  </p>
                </div>
                <div className="p-6">
                  <HorizontalStepperExample />
                </div>
              </div>
            </section>

            {/* Timeline Section */}
            <section id="timeline" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Timeline</h2>
                  <p className="text-blue-100 mt-1">
                    Vertical timeline component for tracking status, history,
                    and progress
                  </p>
                </div>
                <div className="p-6">
                  <TimelineExample />
                </div>
              </div>
            </section>

            {/* Dialog Section */}
            <section id="dialog" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Dialog</h2>
                  <p className="text-purple-100 mt-1">
                    Modal dialog component with header, body, and footer
                  </p>
                </div>
                <div className="p-6">
                  <DialogExample />
                </div>
              </div>
            </section>

            {/* Toast Section */}
            <section id="toast" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Toast</h2>
                  <p className="text-amber-100 mt-1">
                    Toast notifications with queue management and auto-dismiss
                  </p>
                </div>
                <div className="p-6">
                  <ToastExample />
                </div>
              </div>
            </section>

            {/* LeftDrawer Section */}
            <section id="leftdrawer" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">LeftDrawer</h2>
                  <p className="text-gray-200 mt-1">
                    Slide-in drawer from left with navigation and content
                  </p>
                </div>
                <div className="p-6">
                  <LeftDrawerExample />
                </div>
              </div>
            </section>

            {/* RightDrawer Section */}
            <section id="rightdrawer" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">RightDrawer</h2>
                  <p className="text-gray-200 mt-1">
                    Slide-in drawer from right for carts, notifications, and
                    filters
                  </p>
                </div>
                <div className="p-6">
                  <RightDrawerExample />
                </div>
              </div>
            </section>

            {/* Menu Section */}
            <section id="menu" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-stone-600 to-stone-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Menu</h2>
                  <p className="text-stone-100 mt-1">
                    Kebab menu with auto-positioning and portal rendering
                  </p>
                </div>
                <div className="p-6">
                  <MenuExample />
                </div>
              </div>
            </section>

            {/* ActionDropdown Section */}
            <section id="actiondropdown" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    ActionDropdown
                  </h2>
                  <p className="text-blue-100 mt-1">
                    Portal-based contextual action menu for tables and lists
                  </p>
                </div>
                <div className="p-6">
                  <ActionDropdownExample />
                </div>
              </div>
            </section>

            {/* Smooth Animation Section */}
            <section id="smoothanimation" className="scroll-mt-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    Smooth Animation
                  </h2>
                  <p className="text-pink-100 mt-1">
                    Animated entrance components for smooth page transitions and
                    reveals
                  </p>
                </div>
                <div className="p-6">
                  <SmoothLandingBoxExample />
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-16 text-center text-gray-500 text-sm pb-8">
              <p>DriveMech Component Library • Built with React & TypeScript</p>
            </div>
          </div>

          {/* Quick Navigation Sidebar */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quick Jump
                </h3>
                <nav className="space-y-2">
                  {tabs.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
