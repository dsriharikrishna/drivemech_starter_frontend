"use client";

import React, { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { Product } from "@/schemas/vendor/product.schema";
import Image from "next/image";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogFooter from "@/components/modals/DialogFooter";
import Button from "@/components/ui/Button";
import { EditIcon } from "@/components/icons/ManagementModuleIcons";
import { useRouter } from "next/navigation";

interface ProductsTableProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onRowClick?: (product: Product) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onProductClick,
  onRowClick,
}) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddClick = () => {
    router.push("/vendor/inventory/inventory/add-product");
  };

  const handleEditClick = (product: Product) => {
    router.push(`/vendor/inventory/inventory/add-product/${product.id}`);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const onDeleteProduct = (id: string) => {
    console.log("Deleting product:", id);
    // TODO: Implement actual delete logic
  };

  const handleDelete = () => {
    if (selectedProduct) {
      onDeleteProduct?.(selectedProduct.id);
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  return (
    <>
      {/* Products Table */}
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 200px)" }}>
        <Table
          columns={[
            {
              key: "sno",
              header: "S.No",
              width: "60px",
              render: (_, index) => index + 1,
            },
            {
              key: "itemCode",
              header: "Item Code",
              width: "100px",
            },
            {
              key: "image",
              header: "Image",
              width: "80px",
              render: (product: Product) => (
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No img</span>
                  )}
                </div>
              ),
            },
            {
              key: "name",
              header: "Name",
              width: "200px",
            },
            {
              key: "brand",
              header: "Brand",
              width: "120px",
            },
            {
              key: "retailPrice",
              header: "Retail Price",
              width: "120px",
              render: (product: Product) => `$${product.retailPrice.toFixed(2)}`,
            },
            {
              key: "storePrice",
              header: "Store Price",
              width: "120px",
              render: (product: Product) => `$${product.storePrice.toFixed(2)}`,
            },
            {
              key: "inStock",
              header: "In Stock",
              width: "100px",
            },
            {
              key: "warranty",
              header: "Warranty",
              width: "120px",
            },
            {
              key: "actions",
              header: "Actions",
              width: "100px",
              render: (product: Product) => (
                <div className="flex items-center gap-2">
                  <Button
                    variant="icon-edit"
                    size="sm"
                    rounded="md"
                    onClick={() => handleEditClick(product)}
                    title="Edit"
                    startIcon={<EditIcon size={24} className="text-white bg-green-500 p-1 rounded-full" />}
                  />
                  {/* <Button
                    variant="icon-delete"
                    size="sm"
                    rounded="md"
                    onClick={() => handleDeleteClick(product)}
                    title="Delete"
                    startIcon={<Trash2 size={16} />}
                  /> */}
                </div>
              ),
            },
          ]}
          data={products}
          keyExtractor={(product) => product.id}
          pagination
          pageSize={10}
          hoverable
          striped={false}
          onRowClick={onRowClick ?? onProductClick}
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogBody className="w-md h-auto p-6">
          <DialogHeader
            title="Delete Product"
            subtitle="Are you sure you want to delete this product?"
            onClose={() => setIsDeleteDialogOpen(false)}
          />

          <div className="py-4">
            <p className="text-gray-700">
              You are about to delete:{" "}
              <span className="font-semibold">{selectedProduct?.name}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </p>
          </div>

          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Delete"
            onCancel={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ProductsTable;
