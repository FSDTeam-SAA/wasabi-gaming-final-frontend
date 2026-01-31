import ManageStudentsHeader from "@/components/school/student-management/ManageStudentsHeader";
import ManageStudentsTable from "@/components/school/student-management/ManageStudentsTable";
import NeedHelpSection from "@/components/school/student-management/NeedHelp";

export const metadata = {
    title: "Manage Students | Aspiring",
    description: "Track and monitor student career journeys.",
};

export default function ManageStudentsPage() {
    return (
        <main className="max-w-[1600px] mx-auto pb-20">
            <ManageStudentsHeader />
            <ManageStudentsTable />
            <NeedHelpSection />
        </main>
    );
}
