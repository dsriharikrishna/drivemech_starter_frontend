import { SparePartsHero } from "@/components/spare-parts/home/SparePartsHero";
import SparePartsNavbar from "@/components/spare-parts/home/SparePartsNavbar";
import SparePartsFeatures from "@/components/spare-parts/home/SparePartsFeatures";
import BestSellingProducts from "@/components/spare-parts/home/BestSellingProducts";

export const SparePartsLayout = () => {
    return (
        <div className="flex flex-col gap-4 bg-white">
            <SparePartsHero />
            <SparePartsFeatures />
            <BestSellingProducts />
        </div>
    );
};