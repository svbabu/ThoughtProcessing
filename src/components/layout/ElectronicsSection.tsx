import AppLayout from "@layout/AppLayout";
import {LaptopPage} from "@WelcomeSection/LaptopPage";
import {MobilePage} from "@WelcomeSection/MobilePage";
import { Routes, Route } from "react-router-dom";
const ElectronicsSection = () => {
  return (
      <div className="grid-layout">
    <AppLayout
      navTabs={[
        { label: "Laptops", path: "/electronics/laptops" },
        { label: "Accessories", path: "/electronics/Desktops" },
        { label: "Monitors", path: "/electronics/Monitors" },
         { label: "Accessories", path: "/electronics/Accessories" },
          { label: "Deals", path: "/electronics/Deals" },
           { label: "Servers & Storage", path: "/electronics/Servers & Storage" },
            { label: "Offers", path: "/electronics/Offers " },
            { label: "Mobiles", path: "/electronics/Mobiles" }
      ]}
    >
     <Routes>
             <Route path="laptops" element={<LaptopPage />} />
             <Route path="mobiles" element={<MobilePage />} />
              <Route path="/electronics/*" element={<ElectronicsSection />} />

             {/* add AccessoriesPage, OffersPage similarly */}
           </Routes>
    </AppLayout>
    </div>
  );
};

export default ElectronicsSection;
