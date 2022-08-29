import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Accordion from "react-bootstrap/Accordion";
import CreateUser from "./CreateUser";
// function User({ user, deleteItem, id }) {
//   console.log("props", user);
//   console.log("key", id);
//   return (
//     <div>
//       <b>{user.username}</b> <span>({user.email})</span>
//       <button
//         onClick={() => {
//           deleteItem(id);
//         }}
//       >
//         삭제
//       </button>
//     </div>
//   );
// }
const User = React.memo(function User(props) {
  useEffect(() => {
    console.log("user 값이 설정됨");
    // console.log(props.user);
    return () => {
      console.log("user 가 바뀌기 전..");
      // console.log(props.user);
    };
  }, []);
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: props.user.active ? "green" : "black",
        }}
        onClick={() => props.onToggle(props.user.id)}
      >
        {props.user.username}
      </b>{" "}
      <span>({props.user.email})</span>
      <button
        onClick={() => {
          props.deleteItem(props.user.id);
        }}
      >
        삭제
      </button>
      <button onClick={() => props.onModify(props.user)}>수정</button>
    </div>
  );
});

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function UserList() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    id: "",
  });
  const { username, email, id } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);
  const nextId = useRef(4);

  //useCallback 미사용
  // const onCreate = () => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email,
  //   };
  //   setUsers(users.concat(user));

  //   setInputs({
  //     username: "",
  //     email: "",
  //   });
  //   nextId.current += 1;
  // };

  //useCallback 사용
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // setUsers(users.concat(user));
    setUsers((users) => users.concat(user)); //etUsers 에 등록하는 콜백함수의 파라미터에서 최신 users 를 참조 할 수 있기 때문에 deps 에 users 를 넣지 않아도 됨.

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]); // 함수형으로 변경하여 users 제외
  // }, [users, username, email]);

  const onRemove = useCallback(
    (id) => {
      // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // = user.id 가 id 인 것을 제거함
      setUsers((users) => users.filter((user) => user.id !== id));
    },
    // [users]
    [] //함수형 변경으로 users 제외
  );

  const onToggle = useCallback(
    (id) => {
      setUsers((users) =>
        users.map(
          (user) => (user.id === id ? { ...user, active: !user.active } : user)
          //아래는 클릭한 id만 색상변경
          // user.id === id
          //   ? { ...user, active: !user.active }
          //   : { ...user, active: false }
        )
      );
    },
    // [users]
    [] //함수형 변경으로 users 제외
  );

  const onUpdate = useCallback(
    (id) => {
      setUsers((users) =>
        users.map((user) =>
          user.id === id ? { ...user, username: username, email: email } : user
        )
      );
      setInputs({
        username: "",
        email: "",
        id: "",
      });
    },
    // [users, username, email]
    [username, email] //함수형 변경으로 users 제외
  );

  const onModify = useCallback((user) => {
    setInputs({
      username: user.username,
      email: user.email,
      id: user.id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>기본 설명</Accordion.Header>
          <Accordion.Body>
            ■배열 랜더링 <br />
            * 동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수
            map() 을 사용합니다 <br />
            * map() 함수는 배열안에 있는 각 원소를 변환하여 새로운 배열을
            만들어줍니다. <br />
            * 리액트에서 동적인 배열을 렌더링해야 할 때는 이 함수를 사용하여
            일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환해주면
            됩니다.
            <br />
            * 리액트에서 배열을 렌더링 할 때에는 key 라는 props 를
            설정해야합니다.
            <br />
            * 만약 배열 안의 원소가 가지고 있는 고유한 값이 없다면 map() 함수를
            사용 할 때 설정하는 콜백함수의 두번째 파라미터 index 를 key 로
            사용하시면 됩니다
            <br />
            * 고유 원소에 key 가 있어야만 배열이 업데이트 될 때 효율적으로
            렌더링 <br />
            * 수정되지 않는 기존의 값은 그대로 두고 원하는 곳에 내용을
            삽입하거나 삭제하기 때문
            <br />
            * 고유 값 id를 이용하여 삭제할 때 id값을 변수로 전달하여 filter를
            이용하여 해당 id제외한 배열을 새로 만들어 넣어줌.
            <br />
            ■ 태그 변수전달
            <br />
            * 태그에서 변수를 전달하고 싶을땐 아래와 같이 작성한다. <br />
            * onClick = &#123;onRemove(param)&#125; &#60;--이렇게 하면 바로
            실행을 됨.
            <br />
            * onClick=&#123;() =&#62; onRemove(param)&#125; &#60;--그래서
            파리미터를 넘길때는 이렇게 작성
            <br />
            * onClick =&#123;onRemove&#125; &#60;-- 파라미터가 없는경우에는
            이렇게하면 바로 실행되지않고 클릭을 했을때 실행됨.
            <br />* onClick=&#123;() =&#62; onRemove(user.id)&#125; 풀어
            작성하면 <br />
            onClick=&#123;function () &#123;onRemove(user.id)&#125; 와 같다
            <br />
            * users 배열 안의 객체 안에 active 라는 속성을 추가하여 클릭시 색깔
            변경
            <br />
            ■useEffect
            <br />
            *useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정
            <br />
            useEffect(() =&#62; &#123; &#47;&#47;마운트 <br />
            return () =&#62; &#123; &#47;&#47;언마운트 <br />
            &#47;&#47;useEffect 반환되는 함수는 cleanup 함수 (뒷정리) <br />
            &#47;&#47;deps 가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup
            함수가 호출 <br />
            &#125; <br />
            &#125;, []); <br />
            deps에 빈배열: 처음에만 함수 호출
            <br />
            deps에 의존값 존재 : 처음과 지정값이 변경될 때 호출
            <br />
            deps가 아예 없는 경우 : 컴포넌트가 리렌더링 될 때마다 호출
            <br />
            *부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링 -&#62;
            최적화필요 <br />
            <br />
            ■useMemo (특정 결과값 재사용)
            <br />
            * countActiveUsers 생성하여 활성화된 사용자 수 체크
            <br />
            * users 에 변화가 있을때만 세야되는건데, input 값이 바뀔 때에도
            컴포넌트가 리렌더링 되어 성능적 문제발생
            <br />
            * const count = useMemo(() =&#62; countActiveUsers(users),[users])
            <br />
            * 첫번째는 함수, 두번째는 deps 배열 입력. 배열 내용이 바뀌면 함수
            호출, 내용이 바뀌지않았다면 이전에 연산함 값 재사용
            <br />
            <br />
            ■useCallback (특정 함수 재사용)
            <br />
            * 첫번째 인수에 함수, 두번째 인수에 상태(state) 혹은 props
            <br />
            * 만약에 두번째 인수 deps 배열 안에 함수에서 사용하는 값을 넣지 않게
            된다면, <br />
            * 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고
            보장 할 수 없습니다. <br />* props 로 받아온 함수가 있다면, 이 또한
            deps 에 넣어주어야 해요 <br />
            <br />
            ■React.memo (리렌더링 방지) * 컴포넌트의 props 가 바뀌지 않았다면,
            리렌더링을 방지하여 성능 최적화 * users 값이 변경되면 CreateUser 도
            리렌더링되는데 그이유는, * users 배열이 바뀔때마다 onCreate 도 새로
            만들어지고, onToggle,onRemove 도 새로 만들어지기 때문입니다. * deps
            에 users 가 들어있기 때문에 배열이 바뀔때마다 함수가 새로
            만들어지는건, 당연
            <br />
            강의목록 11,12,13,14,15
            <a
              href="https://react.vlpt.us/basic/11-render-array.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              전체 내용 보기
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div>
        <CreateUser
          username={username}
          email={email}
          id={id}
          onChange={onChange}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
        {users.map((user, index) => (
          <User
            user={user}
            key={index}
            deleteItem={onRemove}
            onToggle={onToggle}
            onModify={onModify}
          />
        ))}
        <div>활성사용자 수 : {count}</div>
      </div>
    </>
  );
}

export default React.memo(UserList);
