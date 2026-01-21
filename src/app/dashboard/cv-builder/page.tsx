import TitleProgress from "./_components/title-progress";
import CvMakingForm from "./_components/cv-making-form";

const page = () => {
  return (
    <div className="container p-4 space-y-6">
      <TitleProgress />
      <CvMakingForm />
    </div>
  );
};

export default page;
