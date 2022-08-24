import React from "react";

function Box(props) {
  const clickMe = () => {
    alert("는 강의를 마쳤습니다.");
  };
  return (
    <div className="box">
      Box{props.num} {props.name}
      <button onClick={clickMe}>button</button>
    </div>
  );
}

export default Box;
