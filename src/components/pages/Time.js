import React from "react";

function Time(props) {
  return (
    <div className="time">
      <h4>
        {props.currentDayinWeek()}, {props.currentTime()}, {props.currentDate()}
      </h4>
    </div>
  );
}

export default Time;
