import { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user).then((res) => {
        window.location.reload(false);
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        return res.data;
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <div className="container">
        <button id="exitButton" onClick={() => setOpenUpdate(false)}>
          X
        </button>
        <div className="title">
          <h1>Update User Profile</h1>
        </div>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <div className="inputDiv">
            <span>Email</span>
            <input
              type="text"
              value={texts.email}
              name="email"
              onChange={handleChange}
            />
            <span>First Name</span>
            <input
              type="text"
              name="firstName"
              value={texts.firstName}
              onChange={handleChange}
            />
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              value={texts.lastName}
              onChange={handleChange}
            />
            <span>Username</span>
            <input
              type="text"
              name="userName"
              value={texts.userName}
              onChange={handleChange}
            />
            <span>City</span>
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
          </div>
          <div className="updateButtonDiv">
            <button id="updateButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
