import ManageStudentsHeader from "@/components/school/student-management/ManageStudentsHeader";
import ManageStudentsTable from "@/components/school/student-management/ManageStudentsTable";
import NeedHelpSection from "@/components/school/student-management/NeedHelp";

export const metadata = {
    title: "School Dashboard | Aspiring",
    description: "Comprehensive dashboard for institutional student management.",
};

export default function SchoolDashboardPage() {
    return (
        <main className="max-w-[1600px] mx-auto pb-20">
            <ManageStudentsHeader />
            <div className="px-6 mb-12">
                <div className="bg-black rounded-[40px] p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400/5 blur-[100px]" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">Welcome back, Administrator.</h2>
                        <p className="text-gray-400 text-lg font-medium max-w-2xl">
                            Your institutional network is growing. Review recent student outcomes and manage your cohort from here.
                        </p>
                    </div>
                </div>
            </div>
            <ManageStudentsTable />
            <NeedHelpSection />
        </main>
    );
}
