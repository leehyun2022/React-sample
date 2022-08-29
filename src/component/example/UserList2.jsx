import React, {
  useRef,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Accordion from "react-bootstrap/Accordion";
import CreateUser2 from "./CreateUser2";
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
  console.log("활성 사용자 수를 세는중2...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
    id: "",
  },
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
    case "MODIFY_USER":
      return {
        ...state,
        inputs: action.user,
      };
    case "UPDATE_USER":
      return {
        inputs: initialState.inputs,
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email, id } = state.inputs;
  const nextId = useRef(4);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]); // 함수형으로 변경하여 users 제외
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
    },
    // [users, username, email]
    [username, email] //함수형 변경으로 users 제외
  );

  const onModify = useCallback((user) => {
    dispatch({
      type: "MODIFY_USER",
      user,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
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
      <div>
        <CreateUser2
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
