import "./rightBar.scss";
// import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activites</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover photo
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> made a post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> updated their bio
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                alt=""
              />
              <p>
                <span>Jane Doe</span> edited an activity
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
