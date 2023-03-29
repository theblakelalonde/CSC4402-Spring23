import "./search.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Search = ({ currentUser }) => {
  var searchText = "";
  const [emptyString, setEmptyString] = useState(true);

  const sendQuery = (event) => {
    console.log(event.target.value);
    searchText = event.target.value;
    setEmptyString(true);
    if (searchText) {
      setEmptyString(false);
      console.log("inside if: " + emptyString);
      refetch();
    }
  };

  const hideSearchResults = (event) => {
    console.log("outside of input");
    setEmptyString(true);
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
          onBlur={hideSearchResults}
          onFocus={sendQuery}
          placeholder={"Search for other users"}
        />
      </div>
      <div className="searchResults">
        {error
          ? "Something went wrong"
          : isLoading || emptyString
          ? ""
          : data.map((foundUser) => (
              <div className="searchResult">
                <img src={foundUser.profilePic} alt="" />
                <span className="bioName">
                  {foundUser.firstName} {foundUser.lastName}
                </span>
                <span className="userName"> @{foundUser.userName}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Search;
