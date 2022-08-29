import React from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Home from "./Home";
import TodoList from "./component/TodoList";
import Count from "./component/example/Count";
import Count2 from "./component/example/Count2";
import InputSample from "./component/example/InputSample";
import LifeCycleTest from "./component/example/lifecycletest";
import LifeCycleSample from "./component/example/LifeCycleSample";
import UserList from "./component/example/UserList";
import UserList2 from "./component/example/UserList2";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <Button variant="outline-dark">Home</Button>
        </Link>
        <Link to="/todoList">
          <Button variant="outline-dark">todoList</Button>
        </Link>
        <Link to="/count">
          <Button variant="outline-dark">count_useState</Button>
        </Link>
        <Link to="/count2">
          <Button variant="outline-dark">count_useReducer</Button>
        </Link>
        <Link to="/input">
          <Button variant="outline-dark">InputSample</Button>
        </Link>
        <Link to="/lifeCycle">
          <Button variant="outline-dark">LifeCycle</Button>
        </Link>
        <Link to="/lifeCycleSample">
          <Button variant="outline-dark">LifeCycleSample</Button>
        </Link>
        <Link to="/arrayRender">
          <Button variant="outline-dark">arrayRender_useState</Button>
        </Link>
        <Link to="/arrayRender2">
          <Button variant="outline-dark">arrayRender_useReducer</Button>
        </Link>
      </header>
      <hr />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/count" element={<Count />} />
          <Route path="/count2" element={<Count2 />} />
          <Route path="/input" element={<InputSample />} />
          <Route path="/lifeCycle" element={<LifeCycleTest />} />
          <Route path="/lifeCycleSample" element={<LifeCycleSample />} />
          <Route path="/arrayRender" element={<UserList />} />
          <Route path="/arrayRender2" element={<UserList2 />} />
          <Route element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
