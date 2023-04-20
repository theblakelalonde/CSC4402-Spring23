import "./search.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const Search = ({ currentUser }) => {
  var searchText = "";
  const [emptyString, setEmptyString] = useState(true);

  const sendQuery = (event) => {
    console.log(event.target.value);
    var element = document.getElementById("searchResults");
    element.style.display = "block";
    searchText = event.target.value;
    setEmptyString(true);
    if (searchText) {
      setEmptyString(false);
      refetch();
    }
  };

  //we need to think of another way to hide results because it hides too fast
  const hideSearchResults = (event) => {
    var element = document.getElementById("searchResults");
    element.style.display = "none";
    setEmptyString(false);
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["searches" + searchText],
    () =>
      makeRequest.get("/searches?searchText=" + searchText).then((res) => {
        console.log(res.data);
        return res.data;
      }),
    {
      enabled: false,
    }
  );

  return (
    <div className="search">
      <div className="searchBox">
        <PersonSearchRoundedIcon className="navbarIcon" id="personSearchIcon" />
        <input
          type="text"
          id="searchInputBox"
          onChange={sendQuery}
          //onBlur={hideSearchResults}
          onFocus={sendQuery}
          placeholder={"Search for other users"}
        />
      </div>
      <div className="searchResults" id="searchResults">
        {error
          ? "Something went wrong"
          : isLoading || emptyString
          ? ""
          : data.map((foundUser) => (
              <div className="searchResult" key={foundUser.userID}>
                <img src={foundUser.profilePic} alt="" />
                <Link
                  reloadDocument
                  to={`/profile/${foundUser.userID}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="bioName">
                    {foundUser.firstName} {foundUser.lastName}
                  </span>
                  <span className="userName"> @{foundUser.userName}</span>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Search;
