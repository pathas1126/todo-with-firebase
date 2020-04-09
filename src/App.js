import React, { useState } from "react";
import { useRef } from "react";
import { TaskAdd, TaskDisplay } from "./components";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const idRef = useRef(1);
  const [modify, setModify] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    if (task !== "") {
      const todo = { todo: task, id: idRef.current };
      setTasks((prevTasks) => tasks.concat(todo));
      setTask("");
      idRef.current += 1;
    }
  };

  const onChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const removeHandler = (id) => {
    setTasks((prevTasks) => tasks.filter((task) => task.id !== id));
  };

  const modifyHandler = (id) => {
    return (e) => {
      setTask("");
      setModify(true);
      e.target.innerText = modify ? "수정" : "완료";
      if (task !== "" && modify) {
        setTasks((prevTasks) =>
          tasks.map((taskOne) =>
            taskOne.id === id ? { ...taskOne, todo: task } : taskOne
          )
        );
        setTask("");
        setModify(false);
      }
    };
  };

  return (
    <div className="App">
      <TaskAdd
        task={task}
        onClickHandler={onClickHandler}
        onChangeHandler={onChangeHandler}
        modify={modify}
      />
      <TaskDisplay
        tasks={tasks}
        removeHandler={removeHandler}
        modifyHandler={modifyHandler}
      />
    </div>
  );
}

export default App;
