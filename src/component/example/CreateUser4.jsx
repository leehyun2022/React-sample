import React, { useContext, useRef } from "react";
import { UserDispatch } from "./UserList4";

function CreateUser4({ username, email, id, onChange, reset }) {
  console.log("username::", username);
  console.log("email::", email);
  console.log("id::", id);
  const dispatch = useContext(UserDispatch);
  const nextId = useRef(4);
  console.log("username", username);
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button
        onClick={() => {
          dispatch({
            type: "CREATE_USER",
            user: {
              id: nextId.current,
              username,
              email,
            },
          });
          reset();
        }}
      >
        등록
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "UPDATE_USER",
            user: {
              id,
              username,
              email,
            },
          });
          reset();
        }}
      >
        업데이트
      </button>
    </div>
  );
}

export default React.memo(CreateUser4);
