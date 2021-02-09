import React, { useEffect } from "react";
import ToDoForm from "../ToDoForm";
import { Link } from "react-router-dom";

const isWeekly = true;

function Weekly(props) {
  useEffect(() => {
    props.isWeekly(isWeekly);
  }, []);
  
  const todoWeeklyList = () => {
    return props.todos.map((item, index) => {
      if (item.isWeekly) {
        return (
          <li
            key={index}
            className={item.isComplete ? "todo-item complete" : "todo-item"}
          >
            <div className="todo-elements">
              <div className="name-date-wrapper">
                <p className="todo-date">{item.dateTodo}</p>
                <p className="todo-text">{item.text}</p>
              </div>
              <div className="check-buttons">
                <Link
                  to="/"
                  onClick={() => props.redirectToDaily(item.dateTodo)}
                >
                  <i className="fas fa-plus"></i>
                </Link>
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
        <h3 className="page-title">Weekly ToDo </h3>
        <ul className="todo-list">{todoWeeklyList()}</ul>
      </div>
      <p className="explain">
        <b>weekly toDo</b> je dizajniran kao podsetnik za nedeljne aktivnosti,
        planove na nedeljnom nivou i podsetnik na neke Vama bitne datume. Moguće
        je kreirati jedan weekly toDo po datumu. Ukoliko se pojavi potreba za
        preciznijim planiranjem vaših nedeljnih aktivnosti, klikom na + ćete
        moći da napravite daily toDo listu za taj dan.
      </p>
    </div>
  );
}

export default Weekly;
