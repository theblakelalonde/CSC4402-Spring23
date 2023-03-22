import "./home.scss";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";

const Home = () => {
  window.scrollTo(0, 0);

  return (
    <div className="home">
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
