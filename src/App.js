import "./App.css";
import React, { useState } from "react";
import TodoBoard from "./component/TodoBoard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import Box from "./Box";

function App() {
  // let count = 0;
  // const [count2, setCount2] = useState(0);
  // const [name, setName] = useState("철수");
  // const increase = () => {
  //   setCount2(count2 + 1);
  // };
  // const change = () => {
  //   setName("영희");
  // };
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const addItem = () => {
    console.log("here !", inputValue);
    setTodoList([...todoList, inputValue]);
  };
  const deleteItem = (id) => {
    console.log("id::::", id);
    setTodoList((todoList) => {
      return todoList.filter((item, index) => {
        return index !== id;
      });
    });
  };

  return (
    <main>
      <h3 className="title">할일</h3>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="할일 입력"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={addItem}
        >
          추가
        </Button>
      </InputGroup>
      <TodoBoard todoList={todoList} onChecked={deleteItem} />
    </main>
    // <main>
    //   <input
    //     type="text"
    //     value={inputValue}
    //     onChange={(event) => setInputValue(event.target.value)}
    //   ></input>
    //   <button onClick={addItem}>추가</button>
    //   <TodoBoard todoList={todoList} onChecked={deleteItem} />
    //   {/* <div>{count}</div>
    //   <div>state : {count2}</div>
    //   <button onClick={increase}>증가</button>
    //   <div>{name}</div>
    //   <button onClick={change}>이름변경</button>
    //   <Box name="코알누" num="1" /> */}
    // </main>
  );
}

export default App;
