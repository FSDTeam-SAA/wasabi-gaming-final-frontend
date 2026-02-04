import StudentNavbar from "@/components/shared/StudentNavbar";
import PortfolioEvents from "./_components/portfolio-events";
import PortfolioHero from "./_components/portfolio-hero";

export default function PortfolioPage() {
    return (
        <div className="bg-[#FEFDF6]">
            <PortfolioHero />
            <PortfolioEvents />
        </div>
    );
}
