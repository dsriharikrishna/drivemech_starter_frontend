import AddVehicleForm from "@/components/customer/profile/vehicles/AddVehicleForm";

interface PageProps {
  params: { id: string };
}

export default async function EditPage({ params }: PageProps) {
  const { id } = params;

  // TODO: Replace with API request
  const initialData: Partial<any> = {
    vehicleType: "car",
    state: "MH",
    regNo: "ABC-1234",
    make: "Toyota",
    model: "Hilux",
    cc: "2800",
    mfgYear: "2021",
    chassisNo: "JT3HN86R9Y0123456",
    insuranceExpiry: "2025-07-30",
    purchaseDate: "2021-01-01",
    insuranceProvider: "GEICO",
    engineNo: "2GD-FTV",
    lastServiceDate: "2025-07-30",
    odometer: "45000",
    isDefault: false,
  };

  return (
    <AddVehicleForm 
      mode="edit"
      initialData={initialData}
      vehicleId={id}
    />
  );
}
