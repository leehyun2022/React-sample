import React, {
  useRef,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import produce from "immer";
import Accordion from "react-bootstrap/Accordion";
import CreateUser5 from "./CreateUser5";
import useInputs from "./hooks/useInputs2";
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
      username: "sam",
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
  console.log("userList-state::", state);
  console.log("userList-action::", action);
  switch (action.type) {
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "UPDATE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.username = action.username;
        user.email = action.email;
      });
    default:
      return state;
  }
}

function UserList5() {
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
            ■ Immer <br />
            * 상태를 업데이트 할 때, 불변성을 신경쓰지 않으면서 업데이트를
            해주면 Immer 가 불변성 관리를 대신 해줌 <br />
            * 첫번째 파라미터에는 수정하고 싶은 상태, 두번째 파라미터에는 어떻게
            업데이트하고 싶을지 정의하는 함수 <br />
            * 두번째 파라미터에 넣는 함수에서는 불변성에 대해서 신경쓰지 않고
            그냥 업데이트 해주면 다 알아서 해줌.
            <br />
            * 우리가 만들었던 프로젝트의 상태의 경우 users 배열이 객체의
            깊은곳에 위치하지 않기 때문에 <br />
            새 항목을 추가하거나 제거 할 때는 Immer 를 사용하는 것 보다 concat
            과 filter 를 사용하는것이 더 코드가 짧고 편함.
            <br />
            * 데이터의 구조가 복잡해지게 되는 경우에만 사용하자
            <br />
            <br />
            <br />
            강의목록 23
            <br />
            <a
              href="https://react.vlpt.us/basic/23-immer.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              전체 내용 보기
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div>
        <CreateUser5
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

export default React.memo(UserList5);
