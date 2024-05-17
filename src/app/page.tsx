import Topics from "./components/home/Topics";
import PopularQuestions from "./components/home/PopularQuestions";
import withPortalAppBar from "./components/common/portalLayout";
import Banner from "./components/home/Banner";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <div className="grid grid-cols-2 gap-4 p-4">
        <Topics />
        <PopularQuestions />
      </div>
      <ToastContainer />
    </div>
  );
};

export default withPortalAppBar(Home, {});
