import React, { useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
/**
 * 1. input
 * input의 onChange를 사용하면 이벤트 객체 e를 파라미터로 받아올 수 있다.
 * 이 객체의 e.target은 이벤트가 발생한 DOM을 가리킨다.
 * e.target.value를 조회하면 현재 input의 value값을 알 수 있다.
 *
 * 2. 여러개 input 관리 방법 샘플. 하나의 input 처리방법은 젤 하단 주석처리
 *
 * 3. useRef 로 특정 DOM 선택하기
 * useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 합니다.
 * 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 됩니다.
 * onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를 호출해주었습니다.
 * @returns
 */
function InputSample() {
  const [inputs, setInputs] = useState({
    //여러개의 input 인 경우
    name: "",
    nickname: "",
  });
  const nameInput = useRef(); //useRef
  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { name, value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log("e.target", e.target);
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus(); //useRef
  };

  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>기본 설명</Accordion.Header>
          <Accordion.Body>
            * 1. input <br />
            * input의 onChange를 사용하면 이벤트 객체 e를 파라미터로 받아올 수
            있다.
            <br />
            * 이 객체의 e.target은 이벤트가 발생한 DOM을 가리킨다.
            <br />
            * e.target.value를 조회하면 현재 input의 value값을 알 수 있다.
            <br />
            *<br />
            * 2. 여러개 input 관리 방법 샘플. 하나의 input 처리방법은 젤 하단
            주석처리
            <br />
            *<br />
            * 3. useRef 로 특정 DOM 선택하기
            <br />
            * useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고
            싶은 DOM 에 ref 값으로 설정해주어야 합니다.
            <br />
            * 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게
            됩니다.
            <br />
            * onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를
            호출해주었습니다.
            <br />
            <a
              href="https://react.vlpt.us/basic/08-useState.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              전체 내용 보기
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div>
        <input
          name="name"
          placeholder="이름"
          onChange={onChange}
          value={name}
          ref={nameInput} //useRef
        />
        <input
          name="nickname"
          placeholder="닉네임"
          onChange={onChange}
          value={nickname}
        />
        <button onClick={onReset}>초기화</button>
        <div>
          <b>값: </b>
          {name} ({nickname})
        </div>
      </div>
    </>
  );

  //한건의 input
  //   const [text, setText] = useState('');

  //   const onChange = (e) => {
  //     setText(e.target.value);
  //   };

  //   const onReset = () => {
  //     setText('');
  //   };

  //   return (
  //     <div>
  //       <input onChange={onChange} value={text}  />
  //       <button onClick={onReset}>초기화</button>
  //       <div>
  //         <b>값: {text}</b>
  //       </div>
  //     </div>
  //   );
}

export default InputSample;
