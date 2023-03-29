import "./checkedInContainer.scss";
import CheckedIn from "../checked-in/checkedIn";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CheckedInContainer = ({ userID }) => {
  const { isLoading, error, data } = useQuery(["checkedIn"], () =>
    makeRequest.get("/checkedIn").then((res) => {
      return res.data;
    })
  );
  return (
    <div className="checkedInContainer">
      <div className="checkedInTitle">
        <span>Gym Check In</span>
        <div
          title="See which friends have checked into the gym today"
          className="iconDiv"
        >
          <InfoOutlinedIcon id="checkedInInfoIcon" />
        </div>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((user) => <CheckedIn user={user} />)}
    </div>
  );
};

export default CheckedInContainer;
