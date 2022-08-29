import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
// import TodoItem from "./TodoItem";
// import Accordion from "react-bootstrap/Accordion";

/**
 * hook의 종류 중에서 상태 관리를 해주는 useState가 있다.
 * 함수형 업데이트 형식으로 적어주기.
 * 이벤트 주는 경우에는 함수명만 적어주기. => ()까지 쓰면 렌더링 되는 시점에 실행된다.
 * 다른 파일 가져오거나 useState 이용하는 경우에는 import 이용하기.
 * 컴포넌트 대문자로 작성하기.
 * export default 잊지 않기.
 * @returns
 */
//<p>카운터 값이 1 씩 올라감</p>
function Count() {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.dir(count);
  };

  //배치로 처리되어 <p>카운터 값이 2 씩 올라감</p>
  //   const onClick = () => {
  //     setCount((count) => count + 1);
  //     setCount((count) => count + 1);
  //     console.dir(count);
  //   };
  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>기본 설명</Accordion.Header>
          <Accordion.Body>
            *hook의 종류 중에서 상태 관리를 해주는 useState가 있다. <br />
            *함수형업데이트 형식으로 적어주기. <br />
            *이벤트 주는 경우에는 함수명만적어주기. onClick= 에서 함수명 뒤에
            ()까지 쓰면 렌더링 되는 시점에 실행된다. <br />
            *다른 파일 가져오거나 useState 이용하는 경우에는 import 이용하기.{" "}
            <br />
            *컴포넌트대문자로 작성하기. <br />
            *export default 잊지 않기.
            <br />
            <a
              href="https://react.vlpt.us/basic/07-useState.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              전체 내용 보기
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p>{count}</p>
      <button onClick={onClick}>클릭</button>
    </>
  );
}

export default Count;
