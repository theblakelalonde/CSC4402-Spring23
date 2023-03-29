import "./suggestions.scss";
import Suggestion from "../suggestion/Suggestion";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Suggestions = () => {
  const { isLoading, error, data } = useQuery(["suggestions"], () =>
    makeRequest.get("/suggestions").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="suggestions">
      <span>Suggestions For You</span>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((user) => <Suggestion user={user} key={user.userID} />)}
    </div>
  );
};

export default Suggestions;
