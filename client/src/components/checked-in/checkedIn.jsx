import { Link } from "react-router-dom";
import "./checkedIn.scss";
import moment from "moment";

const CheckedIn = ({ user }) => {
  var utcTime = new Date(user.checkInDate);
  var timeAgo = moment(utcTime + "Z").fromNow();

  return (
    <div className="checkedInItem">
      <div className="user">
        <div className="userInfo">
          <img src={"/upload/" + user.profilePic} alt="" />
          {user.isResting === 1 ? (
            <p>
              <Link
                reloadDocument
                to={`/profile/${user.userID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span id="bioName">
                  {user.firstName} {user.lastName}
                </span>
                &nbsp;is resting
              </Link>
              <br></br>
              <span className="date">{timeAgo}</span>
            </p>
          ) : (
            <p>
              <Link
                reloadDocument
                to={`/profile/${user.userID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span id="bioName">
                  {user.firstName} {user.lastName}
                </span>
                &nbsp;checked in
              </Link>
              <br></br>
              <span className="date">{timeAgo}</span>
            </p>
          )}
        </div>
        <div className="streak">
          <p className="streakNumber">{user.streak} 🔥</p>
        </div>
      </div>
    </div>
  );
};
export default CheckedIn;
