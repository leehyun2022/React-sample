import React from "react";

function CreateUser({ username, id, email, onChange, onCreate, onUpdate }) {
  console.log("username::", username);
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
      <button onClick={onCreate}>등록</button>
      <button
        onClick={() => {
          onUpdate(id);
        }}
      >
        업데이트
      </button>
    </div>
  );
}

export default React.memo(CreateUser);
