"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Edit, Package } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import {
  setBasicInfo,
  updateContact,
} from "@/store/slices/vendor-onboarding/basicInfoSlice";
import {
  setSelectedCategories,
  setSelectedBrands,
} from "@/store/slices/vendor-onboarding/sparePartsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const inventoryItemSchema = z.object({
  partName: z.string().min(1, "Part name required"),
  category: z.string().min(1, "Category required"),
  price: z.number().min(0, "Price must be positive"),
  stockQuantity: z.number().min(0, "Stock must be positive"),
});

const sparePartsReviewSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  email: z.string().email("Invalid email"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),

  selectedCategories: z
    .array(z.string())
    .min(1, "Select at least one category"),
  selectedBrands: z.array(z.string()).min(1, "Select at least one brand"),
  inventory: z.array(inventoryItemSchema),
});

type SparePartsReviewForm = z.infer<typeof sparePartsReviewSchema>;

interface SparePartsReviewSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SparePartsReviewSection: React.FC<SparePartsReviewSectionProps> = ({
  isExpanded,
  onToggle,
}) => {
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((state) => state.vendorBasicInfo);
  const spareParts = useAppSelector((state) => state.vendorSpareParts);
  const [isEditing, setIsEditing] = useState(false);

  // Extract data from Redux
  const companyName = basicInfo.companyName || "Company Name";
  const contactPerson =
    basicInfo.contacts?.[0]?.contactPersonName || "Contact Person";
  const email = basicInfo.contacts?.[0]?.email || "email@example.com";
  const phoneNumber = basicInfo.contacts?.[0]?.phoneNumber || "+00 0000000000";

  // Spare parts data
  const sparePartsCategories = spareParts.selectedCategories || [];
  const sparePartsBrands = spareParts.selectedBrands || [];
  const inventory = spareParts.inventory || [];

  const methods = useForm<SparePartsReviewForm>({
    resolver: zodResolver(sparePartsReviewSchema),
    defaultValues: {
      companyName,
      email,
      contactPerson,
      phoneNumber,
      selectedCategories: sparePartsCategories,
      selectedBrands: sparePartsBrands,
      inventory: inventory.map((item) => ({
        partName: item.partName || "",
        category: item.category || "",
        price: item.price || 0,
        stockQuantity: item.stockQuantity || 0,
      })),
    },
  });

  const { fields: inventoryFields } = useFieldArray({
    control: methods.control,
    name: "inventory",
  });

  useEffect(() => {
    if (isEditing) {
      methods.reset({
        companyName,
        email,
        contactPerson,
        phoneNumber,
        selectedCategories: sparePartsCategories,
        selectedBrands: sparePartsBrands,
        inventory: inventory.map((item) => ({
          partName: item.partName || "",
          category: item.category || "",
          price: item.price || 0,
          stockQuantity: item.stockQuantity || 0,
        })),
      });
    }
  }, [
    isEditing,
    companyName,
    email,
    contactPerson,
    phoneNumber,
    sparePartsCategories,
    sparePartsBrands,
    inventory,
    methods,
  ]);

  const onSave = useCallback(
    (data: SparePartsReviewForm) => {
      dispatch(setBasicInfo({ companyName: data.companyName }));
      if (basicInfo.contacts.length > 0) {
        dispatch(
          updateContact({
            index: 0,
            contact: {
              ...basicInfo.contacts[0],
              contactPersonName: data.contactPerson,
              email: data.email,
              phoneNumber: data.phoneNumber,
            },
          })
        );
      }
      dispatch(setSelectedCategories(data.selectedCategories));
      dispatch(setSelectedBrands(data.selectedBrands));
      // Note: Inventory sync logic simplified/omitted as per previous implementation context
      // Ideally duplicate setInventory logic here if needed

      setIsEditing(false);
    },
    [dispatch, basicInfo, setIsEditing]
  );

  const startEditing = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsEditing(true);
      if (!isExpanded) onToggle();
    },
    [isExpanded, onToggle, setIsEditing]
  );

  return (
    <Accordion
      title="Spare Parts"
      className="p-2"
      icon={<Package size={20} />}
      isExpanded={isExpanded}
      onToggle={onToggle}
      actionButton={
        !isEditing && (
          <Button
            variant="icon-edit"
            size="sm"
            onClick={startEditing}
            title="Edit Spare Parts Details"
          >
            <Edit size={16} />
          </Button>
        )
      }
    >
      {isEditing ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSave)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Business Info */}
              <CommonTextInput
                name="companyName"
                label="Business Name"
                required
              />
              <CommonTextInput name="email" label="Email Address" required />
              <CommonTextInput
                name="contactPerson"
                label="Contact Person"
                required
              />
              <CommonTextInput
                name="phoneNumber"
                label="Phone Number"
                required
              />
            </div>

            {/* Categories */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Categories (View Only)
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {sparePartsCategories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Brands (View Only)
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {sparePartsBrands.map((brand) => (
                  <span
                    key={brand}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Editable Table */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Individual Spare Parts
              </p>
              <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
                <Table
                  columns={[
                    {
                      key: "sno",
                      header: "S.No",
                      width: "60px",
                      render: (_, index) => String(index + 1).padStart(2, "0"),
                    },
                    {
                      key: "partName",
                      header: "Part Name",
                      flex: 1,
                      render: (_, index) => (
                        <CommonTextInput
                          name={`inventory.${index}.partName`}
                          placeholder="Part Name"
                          compact
                          required
                        />
                      ),
                    },
                    {
                      key: "category",
                      header: "Category",
                      flex: 1,
                      render: (_, index) => (
                        <CommonTextInput
                          name={`inventory.${index}.category`}
                          placeholder="Category"
                          compact
                          required
                        />
                      ),
                    },
                    {
                      key: "price",
                      header: "Price",
                      width: "120px",
                      render: (_, index) => (
                        <CommonNumberInput
                          name={`inventory.${index}.price`}
                          placeholder="0.00"
                          compact
                          allowFloat
                          decimalPlaces={2}
                          min={0}
                          required
                        />
                      ),
                    },
                    {
                      key: "stockQuantity",
                      header: "Stock",
                      width: "100px",
                      render: (_, index) => (
                        <CommonNumberInput
                          name={`inventory.${index}.stockQuantity`}
                          placeholder="0"
                          compact
                          min={0}
                          required
                        />
                      ),
                    },
                  ]}
                  data={inventoryFields}
                  keyExtractor={(item) => item.id}
                  hoverable
                  striped={false}
                  className="h-full"
                  style={{ height: "100%" }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Business Info */}
            <div className="space-y-2">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Business Name
                </p>
                <p className="text-sm text-gray-900">{companyName}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Email Address
                </p>
                <p className="text-sm text-gray-900">{email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Contact Person
                </p>
                <p className="text-sm text-gray-900">{contactPerson}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Phone Number
                </p>
                <p className="text-sm text-gray-900">{phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {sparePartsCategories.length > 0 ? (
                sparePartsCategories.map((cat: string) => (
                  <span
                    key={cat}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  No categories selected
                </span>
              )}
            </div>
          </div>

          {/* Brand Associations */}
          <div className="">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Brand Associations
            </p>
            <div className="flex flex-wrap gap-2">
              {sparePartsBrands.length > 0 ? (
                sparePartsBrands.map((brand: string) => (
                  <span
                    key={brand}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {brand}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  No brands selected
                </span>
              )}
            </div>
          </div>

          {/* Individual Spare Parts Table */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Individual Spare Parts ({inventory.length})
            </p>
            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
              <Table
                columns={[
                  {
                    key: "sno",
                    header: "S.No",
                    width: "80px",
                    render: (_, index) => String(index + 1).padStart(2, "0"),
                  },
                  {
                    key: "partName",
                    header: "Part Name",
                    flex: 1,
                  },
                  {
                    key: "category",
                    header: "Category",
                    flex: 1,
                  },
                  {
                    key: "price",
                    header: "Price",
                    width: "100px",
                    render: (item: any) => `$${item.price.toFixed(2)}`,
                  },
                  {
                    key: "stockQuantity",
                    header: "Stock",
                    width: "80px",
                  },
                  {
                    key: "actions",
                    header: "",
                    width: "60px",
                    render: () => (
                      <Button variant="icon-edit" size="sm" title="Edit">
                        <Edit size={14} />
                      </Button>
                    ),
                  },
                ]}
                data={inventory}
                keyExtractor={(item, index) => `spare-part-${index}`}
                hoverable
                striped={false}
                className="h-full"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </div>
      )}
    </Accordion>
  );
};

export default SparePartsReviewSection;
