import React, {
  useRef,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Accordion from "react-bootstrap/Accordion";
import CreateUser3 from "./CreateUser3";
import useInputs from "./hooks/useInputs";
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
    // console.log("user 값이 설정됨");
    // console.log(props.user);
    return () => {
      // console.log("user 가 바뀌기 전..");
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
  // console.log("활성 사용자 수를 세는중2...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
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
  ],
};

function reducer(state, action) {
  console.log("initialState::", initialState.inputs);
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "UPDATE_USER":
      return {
        users: state.users.map((user) =>
          user.id === action.id
            ? { ...user, username: action.username, email: action.email }
            : user
        ),
      };
    default:
      return state;
  }
}

function UserList() {
  const [{ username, email, id }, onChange, reset, onModify] = useInputs({
    username: "",
    email: "",
    id: "",
  });
  console.log("username::", username);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    console.log("등록 시작");
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    console.log("등록 끝");
    reset();
    console.log("초기화 완료");
    nextId.current += 1;
  }, [username, email, reset]); // 함수형으로 변경하여 users 제외
  // }, [users, username, email]);

  const onRemove = useCallback(
    (id) => {
      dispatch({
        type: "REMOVE_USER",
        id,
      });
    },
    [] //함수형 변경으로 users 제외
  );

  const onToggle = useCallback(
    (id) => {
      dispatch({
        type: "TOGGLE_USER",
        id,
      });
    },
    // [users]
    [] //함수형 변경으로 users 제외
  );

  const onUpdate = useCallback(
    (id) => {
      dispatch({
        type: "UPDATE_USER",
        id,
        username,
        email,
      });
      reset();
    },
    // [users, username, email]
    [username, email, reset] //함수형 변경으로 users 제외
  );

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>기본 설명</Accordion.Header>
          <Accordion.Body>
            ■커스텀 Hooks <br />
            * 반복적으로 사용되는 로직을 별도 컴포넌트로 작성하여 사용. <br />
            * onChange, reset, onModify 별도 컴포넌트 useInputs 로 작성.
            <br />
            <br />
            강의목록 21
            <br />
            <a
              href="https://react.vlpt.us/basic/21-custom-hook.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              전체 내용 보기
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div>
        <CreateUser3
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
