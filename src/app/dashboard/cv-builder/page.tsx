import TitleProgress from "./_components/title-progress";
import ChooseCVStyle from "./_components/choose-cv-style";

const page = () => {
  return (
    <div className="container p-4 space-y-5">
      <TitleProgress />
      <ChooseCVStyle />
    </div>
  );
};

export default page;
