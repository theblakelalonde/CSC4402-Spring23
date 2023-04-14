import "./workout.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const Workout = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [rows, setRows] = useState([{}]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [saveWorkoutMessage, setSaveWorkoutMessage] = useState(false);
  const columnsArray = ["Exercise", "Sets", "Reps", "Weight"]; // pass columns here dynamically
  let exerciseIDValue = null;
  let setsValue = null;
  let repsValue = null;
  let weightValue = null;
  let workoutID = null;

  const { isLoading: exerciseLoading, data: exerciseArrayData } = useQuery(
    ["workouts"],
    () =>
      makeRequest.get("/workouts/exercises/").then((res) => {
        return res.data;
      })
  );
  var exerciseArray = exerciseArrayData;

  const handleAddRow = () => {
    const item = {};
    setRows([...rows, item]);
    setErrorMessage(false);
    setSaveWorkoutMessage(false);
  };

  const handleRemoveSpecificRow = (idx) => {
    const tempRows = [...rows];
    if (tempRows.length !== 1) {
      tempRows.splice(idx, 1);
      setRows(tempRows);
      setErrorMessage(false);
      setSaveWorkoutMessage(false);
    }
  };

  const updateInputState = (e) => {
    let prope = e.target.attributes.column.value;
    let index = e.target.attributes.index.value;
    let fieldValue = e.target.value;

    const tempRows = [...rows];
    const tempObj = rows[index];
    tempObj[prope] = fieldValue;

    tempRows[index] = tempObj;
    setRows(tempRows);
  };

  const updateDropdownState = (e) => {
    let dropdownValue = e.target.value;
    let index = e.target.attributes.index.value;

    const tempRows = [...rows];
    const tempObj = rows[index];
    tempObj["ExerciseID"] = dropdownValue;

    tempRows[index] = tempObj;
    setRows(tempRows);
  };

  const postResults = () => {
    postWorkout();
  };

  const { refetch: postWorkout } = useQuery(
    ["postworkout"],
    () =>
      makeRequest
        .post("/workouts/postworkout?userID=" + currentUser.userID)
        .then((res) => {
          workoutID = res.data;
          return res.data;
        }),
    {
      enabled: false,
      onSuccess: async () => {
        console.log(workoutID);
        for (var i = 0; i < rows.length; i++) {
          exerciseIDValue = rows[i].ExerciseID;
          console.log("exerciseIDValue: " + exerciseIDValue);
          setsValue = rows[i].Sets;
          repsValue = rows[i].Reps;
          weightValue = rows[i].Weight;
          rows[i].workoutID = workoutID;

          if (
            !exerciseIDValue ||
            exerciseIDValue === "Select an exercise" ||
            !setsValue ||
            !repsValue ||
            !weightValue
          ) {
            console.log("inside if");
            // if all the input boxes are not filled out
            setErrorMessage(true);
            setSaveWorkoutMessage(false);
          } else {
            console.log("adding row " + (i + 1) + "/" + rows.length);
            setErrorMessage(false);

            // postWorkoutSet();

            //we pass the rows[i] object to the mutation function and use the
            //rows[i] attributes in the post link it does seem to update correctly
            //idk if we need the await or not honestly i just know it works and im tired
            //even if the await doesnt work i dont think there is an async issue now that we're just
            //sending the object to the function
            await mutation.mutate(rows[i]);

            console.log("please fuck off");
            setSaveWorkoutMessage(true);
          }
        }
      },
    }
  );

  //new refetch function
  //the onSuccess still doesnt run until both are already done
  //idk whats up with that
  const mutation = useMutation(
    (row) => {
      return makeRequest.post(
        "/workouts/postworkoutset?workoutID=" +
          row.workoutID +
          "&exerciseIDValue=" +
          row.ExerciseID +
          "&setsValue=" +
          row.Sets +
          "&repsValue=" +
          row.Reps +
          "&weightValue=" +
          row.Weight
      );
    },
    {
      onSuccess: () => {
        console.log("ran postWorkoutSet");
      },
    }
  );

  // const { refetch: postWorkoutSet } = useQuery(
  //   ["postworkoutset"],
  //   () =>
  //     makeRequest
  //       .post(
  //         "/workouts/postworkoutset?workoutID=" +
  //           workoutID +
  //           "&exerciseIDValue=" +
  //           exerciseIDValue +
  //           "&setsValue=" +
  //           setsValue +
  //           "&repsValue=" +
  //           repsValue +
  //           "&weightValue=" +
  //           weightValue
  //       )
  //       .then((res) => {
  //         console.log("in .then");
  //         return res.data;
  //       }),
  //   {
  //     enabled: false,
  //     onSuccess: () => {
  //       console.log("ran postWorkoutSet");
  //     },
  //   }
  // );

  return (
    <div className="workout">
      <div className="container" id="checkIn">
        <div className="center">
          <div className="checkInTitle">
            <h1>Check In</h1>
            <p>
              Check in to increase your streak, or select 'Rest Day' to retain
              your streak
            </p>
          </div>
          <div className="checkInButtons">
            <button id="check-in-button">Check In</button>
            <button id="rest-day-button">Rest Day</button>
          </div>
        </div>
      </div>
      <div className="container" id="workoutTable">
        <div className="center">
          <div className="tableDiv">
            <table className="workoutTable">
              <thead>
                <tr>
                  {columnsArray.map((column, index) => (
                    <th className="tableHeader" key={index}>
                      {column}
                    </th>
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <select
                        id={"exerciseDropdown" + idx}
                        onChange={(e) => updateDropdownState(e)}
                        index={idx}
                        value={rows[idx]["ExerciseID"]}
                      >
                        <option>Select an exercise</option>
                        {exerciseLoading
                          ? "loading"
                          : exerciseArray.map((exercise) => {
                              return (
                                <option
                                  value={exercise.exerciseID}
                                  key={exercise.exerciseID}
                                >
                                  {exercise.exerciseName}
                                </option>
                              );
                            })}
                      </select>
                    </td>
                    {columnsArray.slice(1).map((column, index) => (
                      <td key={index}>
                        <input
                          id={"optionInput" + column + index}
                          type="text"
                          column={column}
                          value={rows[idx][column]}
                          index={idx}
                          className="form-control"
                          onChange={(e) => updateInputState(e)}
                          required
                        />
                      </td>
                    ))}

                    <td>
                      <button
                        className="removeRowButton"
                        onClick={() => handleRemoveSpecificRow(idx)}
                      >
                        <RemoveRoundedIcon
                          sx={{ fontSize: 18 }}
                        ></RemoveRoundedIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {errorMessage ? (
            <p id="inputBoxesErrorMessage">
              Either no exercise is selected or not all of the input boxes are
              filled. Please correctly update the row or remove it.
            </p>
          ) : saveWorkoutMessage ? (
            <p id="savedWorkoutMessage">Workout saved!</p>
          ) : (
            ""
          )}
          <div className="tableButtons">
            <div className="addRowDiv">
              <button onClick={handleAddRow} id="addRowButton">
                <AddRoundedIcon></AddRoundedIcon>
              </button>
            </div>
            <div className="saveWorkoutDiv">
              <button onClick={postResults} id="saveWorkoutButton">
                Save Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Workout;
