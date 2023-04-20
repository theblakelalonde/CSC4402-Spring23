import "./workout.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const Workout = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [rows, setRows] = useState([{}]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [saveWorkoutMessage, setSaveWorkoutMessage] = useState(false);
  const workoutColumnsArray = ["Exercise", "Sets", "Reps", "Weight"]; // pass columns here dynamically
  const historyColumnsArray = ["exerciseName", "sets", "reps", "weight"];
  let [userPastWorkoutDates, setUserPastWorkoutDates] = useState([]);
  let exerciseIDValue = null;
  let setsValue = null;
  let repsValue = null;
  let weightValue = null;
  let workoutID = null;
  let dateFormatted = "";
  const [newDateFormatted, setNewDateFormatted] = useState("");
  let pastWorkout = [];

  const { isLoading: exerciseLoading, data: exerciseArrayData } = useQuery(
    ["workouts"],
    () =>
      makeRequest.get("/workouts/exercises/").then((res) => {
        return res.data;
      })
  );
  let exerciseArray = exerciseArrayData;

  const { isLoading: workoutDatesLoading } = useQuery(
    ["workoutdates"],
    () =>
      makeRequest.get("/workouts/workoutdates/").then((res) => {
        setUserPastWorkoutDates(res.data);
        return res.data;
      }),
    {}
  );

  if (!workoutDatesLoading && typeof userPastWorkoutDates !== "undefined") {
    let tempArray = [];
    for (var i = 0; i < userPastWorkoutDates.length; i++) {
      var tempString = userPastWorkoutDates[i].date.toString().slice(0, 10);
      tempArray.push(tempString);
    }
    userPastWorkoutDates = tempArray;
  }

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
            setErrorMessage(false);

            // postWorkoutSet();

            //we pass the rows[i] object to the mutation function and use the
            //rows[i] attributes in the post link it does seem to update correctly
            //idk if we need the await or not honestly i just know it works and im tired
            //even if the await doesnt work i dont think there is an async issue now that we're just
            //sending the object to the function
            await mutation.mutate(rows[i]);
            setSaveWorkoutMessage(true);
          }
        }
      },
    }
  );

  const queryClient = useQueryClient();

  const mutationCheckIn = useMutation(
    (status) => {
      return makeRequest.post("/checkedIn", { status }).then((res) => {
        return res.data;
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["checkedIns"]);
        //TODO: this may change to invalidate user query that bryan will make if it works
        //the way i think it does
        currentUser.isCheckedIn = 1;
        localStorage.setItem("user", JSON.stringify(currentUser));
      },
    }
  );

  //new refetch function
  //the onSuccess still doesnt run until both are already done
  //idk whats up with that
  const mutation = useMutation((row) => {
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
  });

  const onDateChange = async (newDate) => {
    dateFormatted = newDate.toISOString().slice(0, 10);
    setNewDateFormatted(
      newDate.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    // console.log("dateFormatted: ");
    // console.log(dateFormatted);
    getWorkoutForDate();
  };

  const {
    isLoading: gettingWorkoutForDate,
    refetch: getWorkoutForDate,
    data: workoutForSelectedDate,
  } = useQuery(
    ["getWorkoutForDate"],
    () =>
      makeRequest
        .get("/workouts/workoutfordate?date=" + dateFormatted)
        .then((res) => {
          pastWorkout = res.data;
          return res.data;
        }),
    {
      enabled: false,
    }
  );

  const handleCheckIn = async (status) => {
    mutationCheckIn.mutate(status);
  };

  return (
    <div className="workout">
      <div className="container" id="checkIn">
        <div className="formatting">
          <div className="description">
            <h1 className="title" id="checkInTitle">
              Check In
            </h1>
            <p className="summary" id="checkInSummary">
              Check in to increase your streak, or select 'Rest Day' to retain
              your streak
            </p>
          </div>
          <div>
            <div
              className="checkInButtons"
              style={
                currentUser.isCheckedIn
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              <button id="check-in-button" onClick={() => handleCheckIn(0)}>
                Check In
              </button>
              <button id="rest-day-button" onClick={() => handleCheckIn(1)}>
                Rest Day
              </button>
            </div>
            <div
              style={
                currentUser.isCheckedIn
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <p>You've checked in for today!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container" id="workoutTable">
        <div className="formatting">
          <div className="description">
            <h1 className="title" id="workoutTitle">
              Save Workout
            </h1>
            <p className="summary" id="workoutSummary">
              Fill out the table below with values from your workout to save and
              view later
            </p>
          </div>
          <div className="tableDiv">
            <table className="workoutTable">
              <thead>
                <tr>
                  {workoutColumnsArray.map((column, index) => (
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
                    {workoutColumnsArray.slice(1).map((column, index) => (
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
      <div className="container" id="history">
        <div className="formatting">
          <div className="description">
            <h1 className="title" id="historyTitle">
              History
            </h1>
            <p className="summary" id="historySummary">
              Interact with the calendar to view previously saved workouts
            </p>
          </div>
          <div id="historyContent">
            <div id="calendarDiv">
              {workoutDatesLoading ? (
                <p>loading</p>
              ) : (
                <Calendar
                  tileClassName={({ date, view }) => {
                    if (
                      userPastWorkoutDates.find(
                        (x) => x === moment(date).format("YYYY-MM-DD")
                      )
                    ) {
                      return "highlight";
                    }
                  }}
                  onChange={onDateChange}
                ></Calendar>
              )}
            </div>
            <div id="pastWorkoutTable">
              <div className="center">
                {gettingWorkoutForDate ? (
                  <p></p>
                ) : workoutForSelectedDate.length < 1 ? (
                  <p>No workout saved on selected date</p>
                ) : (
                  <table className="historyTable">
                    <thead>
                      <tr>
                        <th colspan="4" id="historyTableDateCell">
                          {newDateFormatted}
                        </th>
                      </tr>
                      <tr id="historyTableHeaderRow">
                        <th
                          className="historyTableHeaderCell"
                          id="exerciseColumn"
                        >
                          Exercise
                        </th>
                        <th className="historyTableHeaderCell" id="setsColumn">
                          Sets
                        </th>
                        <th className="historyTableHeaderCell" id="repsColumn">
                          Reps
                        </th>
                        <th
                          className="historyTableHeaderCell"
                          id="weightColumn"
                        >
                          Weight (lb)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {workoutForSelectedDate.map((item, idx) => (
                        <tr key={idx} id="historyTableRow">
                          {historyColumnsArray.map((column, index) => (
                            <td key={index} id="historyTableCell">
                              <p>{workoutForSelectedDate[idx][column]}</p>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Workout;
