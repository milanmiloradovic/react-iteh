import React, { useEffect } from "react";
import ToDoForm from "../ToDoForm";

const isWeekly = false;

function Daily(props) {
  useEffect(() => {
    props.isWeekly(isWeekly);
  }, []);

  const todoDailyList = () => {
    return props.todos.map((item, index) => {
      if (!item.isWeekly && item.dateTodo === props.rtDate) {
        return (
          <li
            key={index}
            className={item.isComplete ? "todo-item complete" : "todo-item"}
          >
            <div className="todo-elements">
              <div className="name-date-wrapper">
                <p className="todo-text">{item.text}</p>
              </div>
              <div className="check-buttons">
                <i
                  className={
                    props.edit.id === item.id
                      ? "fas fa-check none"
                      : item.isComplete
                        ? "fas fa-check complete"
                        : "fas fa-check"
                  }
                  onClick={() =>
                    props.edit.id === item.id
                      ? props.clickEdit(
                        props.edit,
                        item.id,
                        item.text,
                        item.isComplete,
                        item.dateTodo
                      )
                      : props.completeTodo(item.id)
                  }
                ></i>
                <i
                  className={
                    item.isComplete
                      ? "fas fa-edit none"
                      : props.edit.id === item.id
                        ? "fas fa-edit active"
                        : "fas fa-edit"
                  }
                  onClick={() =>
                    item.isComplete
                      ? alert("Nije moguce editovati zavrsen toDo")
                      : props.clickEdit(
                        props.edit,
                        item.id,
                        item.text,
                        item.isComplete,
                        item.dateTodo,
                        item.isWeekly
                      )
                  }
                ></i>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => props.removeTodo(item.id)}
                ></i>
              </div>
            </div>
            {props.edit.id === item.id ? (
              <ToDoForm
                edit={props.edit}
                onSubmit={props.submitUpdate}
                dateTodo={props.edit.dateTodo}
                minDateTodo={props.currentDate}
                class="form-update"
              />
            ) : null}
          </li>
        );
      }
    });
  };

  return (
    <div className="pages">
      <div className="todo-container">
        <h3 className="page-title">Daily ToDo / {props.rtDate}</h3>
        <ul className="todo-list">{todoDailyList()}</ul>
      </div>
      <p className="explain">
        <b>daily toDo</b> je dizajniran kao jednostavan podsetnik za dnevne
        aktivnosti i planove na dnevnom nivou. Moguće je kreirati daily toDo
        listu za bilo koji dan.
      </p>
    </div>
  );
}

export default Daily;
