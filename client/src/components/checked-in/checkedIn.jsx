import "./checkedIn.scss";
import moment from "moment";

const CheckedIn = ({ user }) => {
  console.log(user);
  return (
    <div className="checkedInItem">
      <div className="user">
        <div className="userInfo">
          <img src={user.profilePic} alt="" />
          {user.isRestingToday === 1 ? (
            <p>
              <span id="bioName">
                {user.firstName} {user.lastName}
              </span>
              &nbsp;is resting today
            </p>
          ) : (
            <p>
              <span id="bioName">
                {user.firstName} {user.lastName}
              </span>
              &nbsp;checked in {moment(user.checkedInTime).fromNow()}
            </p>
          )}
        </div>
        <div className="streak">
          <p className="streakNumber">{user.checkedInStreak} 🔥</p>
        </div>
      </div>
    </div>
  );
};
export default CheckedIn;
