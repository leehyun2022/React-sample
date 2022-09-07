import React from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Home from "./Home";
import TodoMain from "./component/TodoMain";
import TodoList2 from "./component/TodoList2";
import Count from "./component/example/Count";
import Count2 from "./component/example/Count2";
import InputSample from "./component/example/InputSample";
import LifeCycleTest from "./component/example/lifecycletest";
import LifeCycleSample from "./component/example/LifeCycleSample";
import UserList from "./component/example/UserList";
import UserList2 from "./component/example/UserList2";
import UserList3 from "./component/example/UserList3";
import UserList4 from "./component/example/UserList4";
import UserList5 from "./component/example/UserList5";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <Button variant="outline-dark">Home</Button>
        </Link>
        <Link to="/todoMain">
          <Button variant="outline-dark">todoList</Button>
        </Link>
        <Link to="/todoList2">
          <Button variant="outline-dark">todoList2</Button>
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
        <Link to="/arrayState">
          <Button variant="outline-dark">array_useState</Button>
        </Link>
        <Link to="/arrayReducer">
          <Button variant="outline-dark">array_useReducer</Button>
        </Link>
        <Link to="/arrayCustomHook">
          <Button variant="outline-dark">array_customHooks</Button>
        </Link>
        <Link to="/contextApi">
          <Button variant="outline-dark">contextApi</Button>
        </Link>
        <Link to="/immer">
          <Button variant="outline-dark">immer</Button>
        </Link>
      </header>
      <hr />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todoMain" element={<TodoMain />} />
          <Route path="/todoList2" element={<TodoList2 />} />
          <Route path="/count" element={<Count />} />
          <Route path="/count2" element={<Count2 />} />
          <Route path="/input" element={<InputSample />} />
          <Route path="/lifeCycle" element={<LifeCycleTest />} />
          <Route path="/lifeCycleSample" element={<LifeCycleSample />} />
          <Route path="/arrayState" element={<UserList />} />
          <Route path="/arrayReducer" element={<UserList2 />} />
          <Route path="/arrayCustomHook" element={<UserList3 />} />
          <Route path="/contextApi" element={<UserList4 />} />
          <Route path="/immer" element={<UserList5 />} />
          <Route element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
