import React, { useReducer } from "react";
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

function reducer(state, action) {
  switch (action.type) {
    case "INCREASE_COUNT":
      return state + 1;
    case "DECREASE_COUNT":
      return state - 1;

    default:
      return state;
  }
}

function Count() {
  const [state, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({
      type: "INCREASE_COUNT",
    });
  };

  const onDecrease = () => {
    dispatch({
      type: "DECREASE_COUNT",
    });
  };
  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>기본 설명</Accordion.Header>
          <Accordion.Body>
            ■useReducer * 상태를 업데이트 할 때에는 useState 를 사용해서 새로운
            상태를 설정
            <br />
            * 동일한 기능으로 useReducer 사용
            <br />
            * 이 Hook 함수를 사용하면 컴포넌트의 상태 업데이트 로직을
            컴포넌트에서 분리시킬 수 있음.
            <br />
            * 샘플 count 감소 증가
            <br />
            * function reducer(state, action) &#123;
            <br />
            * switch (action.type) &#123;
            <br />
            * case 'INCREMENT':
            <br />
            * return state + 1;
            <br />
            * case 'DECREMENT':
            <br />
            * return state - 1;
            <br />
            * default:
            <br />
            * return state;
            <br />
            * &#125;
            <br />
            * &#125;
            <br />
            * function Counter() &#123;
            <br />
            * const [state, dispatch] = useReducer(reducer, 0); <br />
            * const onIncrease = () =&#62; &#123;
            <br />
            * dispatch(&#123; type: 'INCREMENT' &#125;);
            <br />
            * &#125;;
            <br />
            * <br />
            * const onDecrease = () =&#62; &#123;
            <br />
            * dispatch(&#123; type: 'DECREMENT' &#125;);
            <br />
            * &#125;; <br />
            <br />
            강의목록 20
            <br />
            <a
              href="https://react.vlpt.us/basic/20-useReducer.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              전체 내용 보기
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p>{state}</p>
      <button onClick={onIncrease}>증가</button>
      <button onClick={onDecrease}>감소</button>
    </>
  );
}

export default Count;
