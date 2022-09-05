import React, { useContext } from "react";
import { UserDispatch } from "./UserList4";
// import useInputs from "./hooks/useInputs";

const User = React.memo(function User({ user, onModify }) {
  console.log("onModify", onModify);
  console.log("user", user);
  const dispatch = useContext(UserDispatch);
  // const [{ username, email, id }, onChange, reset, onModify] = useInputs({
  //   username: "",
  //   email: "",
  //   id: "",
  // });
  // console.log("user", user);
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => {
          dispatch({ type: "TOGGLE_USER", id: user.id });
        }}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button
        onClick={() => {
          dispatch({ type: "REMOVE_USER", id: user.id });
        }}
      >
        삭제
      </button>
      <button onClick={() => onModify(user)}>수정</button>
    </div>
  );
});

function UserItem({ users, onModify }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onModify={onModify} />
      ))}
    </div>
  );
}

export default React.memo(UserItem);
