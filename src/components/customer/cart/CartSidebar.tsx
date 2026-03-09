"use client";

import { useDispatch, useSelector } from "react-redux";
import { Service } from "../../../data/services";
import {
  ShoppingCart,
  Sparkles,
  TrendingUp,
  ArrowRight,
  X,
} from "lucide-react";
import { RootState } from "@/store/store";
import { toggleService } from "@/store/slices/customer/services/serviceSlice";
import { setCurrentVehicle } from "@/store/slices/cart/cartSlice";
import { CarCard } from "@/components/landing-page/CarCard";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar({ services }: { services: Service[] }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedServices = useSelector(
    (state: RootState) => state.service.selectedServices
  );
  const selectedNestedServices = useSelector(
    (state: RootState) => state.service.selectedNestedServices
  );
  const currentVehicle = useSelector(
    (state: RootState) => state.car.currentVehicle
  );

  const selectedList = selectedServices
    .map((id: string) => services.find((s: Service) => s.id === id))
    .filter((service): service is Service => service !== undefined);

  // Get nested service names for display
  const getNestedServiceNames = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service?.nestedServices) return [];

    return service.nestedServices
      .filter((ns) => selectedNestedServices.includes(ns.id))
      .map((ns) => ns.name);
  };

  const handleChangeVehicle = () => {
    // In a real app, this would open a vehicle selection modal
    // For now, we'll just show a placeholder action
  };

  return (
    <aside className="w-full lg:w-[330px] space-y-5">
      {/* Vehicle Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CarCard vehicle={currentVehicle} onChange={handleChangeVehicle} />
      </motion.div>

      {/* Cart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      >
        {/* Cart Header with Gradient */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Your Cart</span>
            </div>
            <motion.span
              key={selectedServices.length}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-sm text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full font-medium shadow-sm"
            >
              {selectedServices.length}{" "}
              {selectedServices.length === 1 ? "item" : "items"}
            </motion.span>
          </div>
        </div>

        {/* Cart Content */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            {selectedList.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-2xl text-center border-2 border-dashed border-gray-300 overflow-hidden"
              >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-800 text-base mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">
                    Add services to get started with your quote
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <AnimatePresence>
                  {selectedList.map((s, index) => {
                    const nestedServiceNames = getNestedServiceNames(s.id);
                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="space-y-2"
                      >
                        <div className="group relative bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300">
                          {/* Hover Gradient Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/0 via-orange-50/50 to-orange-50/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>

                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm group-hover:shadow transition-shadow">
                                <Image
                                  src={s.icon}
                                  alt={s.name}
                                  width={26}
                                  height={26}
                                />
                              </div>
                              <div className="flex-1">
                                <span className="font-semibold text-sm text-gray-900 block">
                                  {s.name}
                                </span>
                                {nestedServiceNames.length > 0 && (
                                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    {nestedServiceNames.length} sub-service
                                    {nestedServiceNames.length > 1 ? "s" : ""}
                                  </p>
                                )}
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => dispatch(toggleService(s.id))}
                              className="flex items-center gap-1 text-red-500 hover:text-red-600 text-xs font-semibold hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              Remove
                            </motion.button>
                          </div>
                        </div>

                        {/* Nested Services */}
                        <AnimatePresence>
                          {nestedServiceNames.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-5 space-y-2 overflow-hidden"
                            >
                              {nestedServiceNames.map((name, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="text-xs text-gray-600 flex items-center gap-2.5 p-2.5 bg-white rounded-lg border border-gray-100 hover:border-orange-200 transition-colors"
                                >
                                  <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-sm"></div>
                                  <span className="font-medium">{name}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Recommended Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">
              Recommended for You
            </span>
          </div>
        </div>

        {/* Recommendations Content */}
        <div className="p-5 space-y-3">
          <AnimatePresence mode="wait">
            {(selectedList.length > 0
              ? services
                  .filter((service) => !selectedServices.includes(service.id))
                  .slice(0, 3)
              : services.filter((service) => service.isPopular).slice(0, 3)
            ).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center justify-between p-3.5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm group-hover:shadow transition-shadow">
                    <Image
                      src={service.icon}
                      alt={service.name}
                      width={26}
                      height={26}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {service.name}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(toggleService(service.id))}
                  className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <span>Add</span>
                  <TrendingUp className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Next Button */}
      <AnimatePresence>
        {selectedList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-5 shadow-sm">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => router.push("/customer/workshop")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Continue to Workshop</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
              <p className="text-xs text-center text-green-700 mt-3 font-medium">
                {selectedList.length} service
                {selectedList.length > 1 ? "s" : ""} ready for booking
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
