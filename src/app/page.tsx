import GlobalFeed from "./components/home/GlobalFeed";
import TrendingTopics from "./components/home/TrendingTopics";
import withPortalAppBar from "./components/common/portalLayout";
import Banner from "./components/home/Banner";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <div className="grid grid-cols-2 gap-4 p-4">
        <GlobalFeed />
        <TrendingTopics />
      </div>
    </div>
  );
}

export default withPortalAppBar(Home, {

});
