import SchoolNavbar from "@/components/shared/SchoolNavbar";
import Footer from "@/components/shared/Footer";

export default function SchoolLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <SchoolNavbar />
            <main className="flex-1 bg-[#FAFAFA]">{children}</main>
            <Footer />
        </div>
    );
}
