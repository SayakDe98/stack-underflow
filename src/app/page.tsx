import Topics from "./components/home/Topics";
import PopularQuestions from "./components/home/PopularQuestions";
import withPortalAppBar from "./components/common/portalLayout";
import Banner from "./components/home/Banner";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <div className="grid grid-cols-2 gap-4 p-4">
        <Topics />
        <PopularQuestions />
      </div>
    </div>
  );
};

export default withPortalAppBar(Home, {});
