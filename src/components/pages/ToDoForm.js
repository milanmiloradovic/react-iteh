import React, { useState, useEffect, useRef } from "react";

function ToDoForm(props) {

  const [input, setInput] = useState(props.edit ? props.edit.text : "");

  const [date, setDate] = useState(props.dateTodo);

  useEffect(() => {
    setDate(props.dateTodo);
  }, [props.dateTodo]);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    if (props.realTimeDate) {
      props.realTimeDate(date);
    }
  }, [handleDateChange]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit(input, date);
    setInput("");
  };

  return (
    <div className={props.class}>
      <form className="row g-3" onSubmit={handleSubmit}>
        {props.edit ? (
          <>
            <div className="col-auto">
              <input
                type="text"
                placeholder="Update your todo"
                value={input}
                name="text"
                className="form-control"
                onChange={handleChange}
                ref={inputRef}
              />
            </div>
            <div className="col-auto">
              <input
                type="date"
                id="date"
                onChange={handleDateChange}
                min={props.minDateTodo}
                value={date}
              ></input>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary">Update</button>
            </div>
          </>
        ) : (
          <>
            <div className="col-auto">
              <input
                type="text"
                placeholder="Add a todo"
                value={input}
                name="text"
                className="form-control"
                onChange={handleChange}
                ref={inputRef}
              />
            </div>
            <div className="col-auto">
              <input
                type="date"
                id="date"
                onChange={handleDateChange}
                min={props.minDateTodo}
                value={date}
              ></input>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary">Add toDo</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ToDoForm;
