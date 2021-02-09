import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Daily from "./components/pages/daily/Daily";
import Weekly from "./components/pages/weekly/Weekly";
import Time from "./components/pages/Time";
import ToDoForm from "./components/pages/ToDoForm";

function App() {
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [todos, setTodos] = useState([]);

  const [edit, setEdit] = useState({
    id: null,
    text: "",
  });

  const addTodo = (text, datum) => {
    if (!text || /^\s*$/.test(text)) {
      return;
    }
    if (
      todos.find(
        (todo) =>
          todo.dateTodo === datum && todo.isWeekly === true && isWeekly === true
      )
    ) {
      alert(
        "Beleska za izabrani datum vec postoji, mozete izmeniti postojecu ili dodadjte Daily Todos za izabrani dan"
      );
    } else {
      let todo = {
        id: Math.floor(Math.random() * 10000),
        text: text,
        isComplete: false,
        dateTodo: datum,
        isWeekly: isWeekly,
        created: `Kreirano: ${currentTime()}`,
      };

      const newTodos = [todo, ...todos];

      newTodos.sort(function (a, b) {
        return new Date(a.dateTodo) - new Date(b.dateTodo);
      });
      setTodos(newTodos);
    }
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const clickEdit = (ed, id, text, check, date, checkWeekly) => {
    if (ed.id === null) {
      setEdit({
        id: id,
        text: text,
        isComplete: check,
        dateTodo: date,
        isWeekly: checkWeekly,
        created: `Modifikovano: ${currentTime()}`,
      });
    }
    else {
      setEdit({
        id: null,
        text: "",
      });
    }
  };

  const updateTodo = (id, text, datum) => {
    if (!text || /^\s*$/.test(text)) {
      return;
    }
    let updatedTodos = todos;
    for (let i = 0; i < updatedTodos.length; i++) {
      if (
        updatedTodos[i].dateTodo === datum &&
        updatedTodos[i].id !== id &&
        updatedTodos[i].isWeekly === true &&
        isWeekly === true
      ) {
        alert(
          `ToDo za datum ${updatedTodos[i].dateTodo} vec postoji. Preporucujemo vam da uredite daily todo za taj dan`
        );
        return;
      }
      if (updatedTodos[i].id === id) {
        updatedTodos[i].text = text;
        updatedTodos[i].dateTodo = datum;

        setTodos(updatedTodos);
      }
    }
  };

  const submitUpdate = (text, datum) => {
    updateTodo(edit.id, text, datum);
    setEdit({
      id: null,
      text: "",
    });
  };

  const removeTodo = (id) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const currentDate = () => {
    let d = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    let m =
      today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth();
    let y = today.getFullYear();
    return `${y}-${m}-${d}`;
  };

  const currentTime = () => {
    let h = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    let m =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    return `${h}:${m}`;
  };

  const currentDayinWeek = () => {
    const dun = today.getDay();
    switch (dun) {
      case 1:
        return "Ponedeljak";
      case 2:
        return "Utorak";
      case 3:
        return "Sreda";
      case 4:
        return "Cetvrtak";
      case 5:
        return "Petak";
      case 6:
        return "Subota";
      case 0:
        return "Nedelja";
      default:
        break;
    }
  };

  const [dailyDate, setDaily] = useState(currentDate());

  const [iDate, setrtDate] = useState(null);

  const inputDate = (d) => {
    setrtDate(d);
  };

  const [isWeekly, setIsWeekly] = useState(undefined);
  const checkWeekly = (iw) => {
    setIsWeekly(iw);
  };

  const redirectToDaily = (date) => {
    console.log("redirected:", date);
    setDaily(date);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />

        <div className="main-window">
          <Time
            currentDate={() => currentDate()}
            currentTime={() => currentTime()}
            currentDayinWeek={() => currentDayinWeek()}
          />
          <ToDoForm
            onSubmit={addTodo}
            dateTodo={dailyDate}
            minDateTodo={currentDate()}
            class="form-normal"
            realTimeDate={inputDate}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Daily
                  todos={todos}
                  edit={edit}
                  addTodo={addTodo}
                  completeTodo={completeTodo}
                  submitUpdate={submitUpdate}
                  clickEdit={clickEdit}
                  removeTodo={removeTodo}
                  currentDate={currentDate()}
                  dailyDate={dailyDate}
                  rtDate={iDate}
                  isWeekly={checkWeekly}
                />
              )}
            />
            <Route
              path="/weekly"
              exact
              render={(props) => (
                <Weekly
                  todos={todos}
                  edit={edit}
                  addTodo={addTodo}
                  completeTodo={completeTodo}
                  submitUpdate={submitUpdate}
                  clickEdit={clickEdit}
                  removeTodo={removeTodo}
                  currentDate={currentDate()}
                  dailyDate={dailyDate}
                  redirectToDaily={redirectToDaily}
                  isWeekly={checkWeekly}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
