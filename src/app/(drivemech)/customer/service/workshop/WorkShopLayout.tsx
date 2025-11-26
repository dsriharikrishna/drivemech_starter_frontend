import WorkshopCard from '@/components/customer/workshop/WorkshopCard';
import WorkshopDetailsCard from '@/components/customer/workshop/WorkshopDetailsCard';
import LeftLayout from '../../../../../components/Layout/LeftLayout';
import RightLayout from '../../../../../components/Layout/RightLayout';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import { Service, headerServices } from '../../../../../data/services';
import { WorkshopCardProps, Workshop } from '@/types/workshops';
import React from 'react';
import WorkShopSidebar from '@/components/customer/workshop/WorkShopSidebar';
import { workshops } from '@/data/workshop';

const WorkShopLayout = () => {
  const services: Service[] = headerServices;

  const workshopCards: WorkshopCardProps[] = [
    {
      logo: "/garage.png",
      name: "A to Z Services",
      rating: 4.5,
      reviews: 120,
      distance: "2kms",
      driveTime: "5 Mins Drive",
      services: ["Periodic Service", "AC Repair"],
      ctaType: "book",
      offerText: "Book Now - 20% Off",
    },
    {
      logo: "/carfix.png",
      name: "Car Fix Experts",
      rating: 4.5,
      reviews: 120,
      distance: "2kms",
      driveTime: "5 Mins Drive",
      services: ["Tyre Care", "Wheel Alignment"],
      ctaType: "offer",
      offerText: "View Offers",
    },
  ];

  return (
    <div>
      <main className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <LeftLayout>
            {/* Header */}
            <ServiceHeader />
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 mb-6">
              {workshopCards.map((workshop, index) => (
                <WorkshopCard key={index} {...workshop} />
              ))}
            </div>
            <WorkshopDetailsCard
              logo="/garage.png"
              name="A to Z Services"
              isOpen={true}
              closingTime="9:30 PM"
              distance="2kms"
              driveTime="5 Mins Drive"
              rating={4.5}
              reviews={120}
              categories={[
                "Periodic Service", "Car Wash", "AC Service",
                "Exterior Wash", "Battery", "Radiator",
                "Interior Cleaning", "Transmission"
              ]}
              inspectionServices={[
                "AC Antibacterial Clean",
                "AC Compressor Relay Replacement"
              ]}
              moreInspectionCount={3}
              fixedPriceServices={[
                { name: "Battery Replacement", price: 10 },
                { name: "Roadworthy Inspection / Pink Slips", price: 40 },
                { name: "Spark Plug", price: 50 },
              ]}
              moreFixedCount={3}
              fixedPriceCTA="$ 4999/-"
            />
          </LeftLayout>
          <RightLayout>
           <WorkShopSidebar workshops={workshops  } />
          </RightLayout>
        </div>
      </main>
    </div>
  );
};

export default WorkShopLayout;