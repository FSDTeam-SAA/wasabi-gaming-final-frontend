import ManageStudentsHeader from "../../components/school/student-management/ManageStudentsHeader";
import ManageStudentsTable from "../../components/school/student-management/ManageStudentsTable";
import NeedHelpSection from "../../components/school/student-management/NeedHelp";

export default function ManageStudents() {
  return (
    <div className="min-h-screen">
      <ManageStudentsHeader />
      <ManageStudentsTable />
      <NeedHelpSection />
    </div>
  );
}
