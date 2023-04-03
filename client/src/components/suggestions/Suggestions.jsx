import "./suggestions.scss";
import Suggestion from "../suggestion/Suggestion";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Suggestions = () => {
  const { isLoading, error, data } = useQuery(["suggestions"], () =>
    makeRequest.get("/suggestions").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="suggestions">
      <div className="suggestionTitle">
        <span>Suggestions For You</span>
        <div
          title="These users are suggested for you based on friends of your friends"
          className="iconDiv"
        >
          <InfoOutlinedIcon id="suggestionInfoIcon" />
        </div>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((user) => <Suggestion user={user} key={user.userID} />)}
    </div>
  );
};

export default Suggestions;
