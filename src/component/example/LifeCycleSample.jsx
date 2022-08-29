import React, { useState } from "react";
import LifeCycleItem from "./LifeCycleItem";

// 랜덤 색상을 생성합니다
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function LifeCycleSample() {
  const [color, setColor] = useState("#000000");
  const [visible, setVisible] = useState(true);

  const onClick = () => {
    setColor(getRandomColor());
  };

  const onToggle = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button onClick={onClick}>랜덤 색상</button>
      <button onClick={onToggle}>토글</button>
      {visible && <LifeCycleItem color={color} />}
    </>
  );
}

export default LifeCycleSample;
