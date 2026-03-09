"use client";

import React, { useEffect } from "react";
import WelcomeSection from "@/components/vendor/dashboard/WelcomeSection";
import MetricsGrid from "@/components/vendor/dashboard/MetricsGrid";
import StatusGrid from "@/components/vendor/dashboard/StatusGrid";
import RevenueTrends from "@/components/vendor/dashboard/RevenueTrends";
import NewRequests from "@/components/vendor/dashboard/NewRequests";
import ServiceStatusOverview from "@/components/vendor/dashboard/ServiceStatusOverview";
import QuickActions from "@/components/vendor/dashboard/QuickActions";
import PartsStatus from "@/components/vendor/dashboard/PartsStatus";
import InventoryOverview from "@/components/vendor/dashboard/InventoryOverview";
import TopSellingItems from "@/components/vendor/dashboard/TopSellingItems";
import LowStockAlerts from "@/components/vendor/dashboard/LowStockAlerts";
import TowingFleet from "@/components/vendor/dashboard/TowingFleet";
import SystemConfigurations from "@/components/vendor/dashboard/SystemConfigurations";
import RecentActivity from "@/components/vendor/dashboard/RecentActivity";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";

// Redux Integration
import { useAppDispatch, useAppSelector, RootState } from "@/store/store";
import { getDashboardData } from "@/store/slices/vendor/dashboard/dashboardSlice";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  // Select dashboard state
  const {
    workshopName,
    metrics,
    statusMetrics,
    revenueTrends,
    newRequests,
    isLoading,
  } = useAppSelector((state: RootState) => state.vendorDashboard);

  // Fetch dashboard data on component mount
  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  // Loading state (Basic implementation)
  if (isLoading && metrics.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Welcome Section & Metrics */}
        <SmoothLandingBox variant="fade" duration={0.8}>
          <div className="p-3 rounded-lg bg-white flex flex-col gap-4">
            <WelcomeSection workshopName={workshopName} />
            {/* Metrics Grid with data from Redux */}
            <MetricsGrid metrics={metrics} />
          </div>
        </SmoothLandingBox>

        {/* Revenue & New Requests */}
        <SmoothLandingBox variant="slide-up" delay={0.1} distance={30}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-2">
              {/* Revenue Trends Chart with data from Redux */}
              <RevenueTrends data={revenueTrends} />
            </div>
            <div className="flex-1">
              {/* New Requests List with data from Redux */}
              <NewRequests requests={newRequests} />
            </div>
          </div>
        </SmoothLandingBox>

        {/* Status Grid with data from Redux */}
        <SmoothLandingBox variant="slide-up" delay={0.15} distance={30}>
          <div className="py-2 rounded-lg ">
            <StatusGrid statusMetrics={statusMetrics} />
          </div>
        </SmoothLandingBox>

        {/* Service Status & Quick Actions */}
        <SmoothLandingBox variant="slide-up" delay={0.2} distance={30}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-3">
              <ServiceStatusOverview />
            </div>
            <div className="flex-1">
              <QuickActions />
            </div>
          </div>
        </SmoothLandingBox>

        {/* Additional Components (Can be integrated similarly in future) */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-3 flex flex-col gap-4">
            <SmoothLandingBox variant="slide-up" delay={0.25} distance={30}>
              <PartsStatus />
            </SmoothLandingBox>

            <SmoothLandingBox variant="slide-up" delay={0.3} distance={30}>
              <InventoryOverview />
            </SmoothLandingBox>

            <SmoothLandingBox variant="slide-up" delay={0.35} distance={30}>
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                <TopSellingItems />
                <LowStockAlerts />
              </div>
            </SmoothLandingBox>

            <SmoothLandingBox variant="slide-up" delay={0.4} distance={30}>
              <TowingFleet />
            </SmoothLandingBox>

            <SmoothLandingBox variant="slide-up" delay={0.45} distance={30}>
              <SystemConfigurations />
            </SmoothLandingBox>
          </div>

          <SmoothLandingBox variant="slide-left" delay={0.3} distance={30}>
            <div className="flex-1">
              <RecentActivity />
            </div>
          </SmoothLandingBox>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
