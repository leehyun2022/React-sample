import React, { useReducer, useMemo } from "react";
import Accordion from "react-bootstrap/Accordion";
import CreateUser4 from "./CreateUser4";
import UserItem from "./UserItem";
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
  console.log("state111::", state);
  console.log("action111::", action);
  // console.log("action222::", action.user.username);
  switch (action.type) {
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
          user.id === action.user.id
            ? {
                ...user,
                username: action.user.username,
                email: action.user.email,
              }
            : user
        ),
      };
    default:
      return state;
  }
}
// UserDispatch 라는 Context API 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function UserList4() {
  const [{ username, email, id }, onChange, reset, onModify] = useInputs({
    username: "",
    email: "",
    id: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  // const nextId = useRef(4);

  // const onCreate = useCallback(() => {
  //   console.log("등록 시작");
  //   dispatch({
  //     type: "CREATE_USER",
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email,
  //     },
  //   });
  //   console.log("등록 끝");
  //   reset();
  //   console.log("초기화 완료");
  //   nextId.current += 1;
  // }, [username, email, reset]); // 함수형으로 변경하여 users 제외
  // // }, [users, username, email]);

  // const onUpdate = useCallback(
  //   (id) => {
  //     dispatch({
  //       type: "UPDATE_USER",
  //       id,
  //       username,
  //       email,
  //     });
  //     reset();
  //   },
  //   // [users, username, email]
  //   [username, email, reset] //함수형 변경으로 users 제외
  // );

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>기본 설명</Accordion.Header>
          <Accordion.Body>
            ■Context API <br />
            * Context API 를 사용해서 프로젝트의 상태를 전역적으로 관리. <br />
            * Context API 를 사용해서 dispatch 를 어디서든지 조회해서 사용해줄
            수 있게 해주면 코드의 구조가 훨씬 깔끔
            <br />
            * useReducer 를 사용하면 이렇게 dispatch 를 Context API 를 사용해서
            전역적으로 사용 할 수 있게 해주면 컴포넌트에게 함수를 전달해줘야
            하는 상황에서 코드의 구조가 훨씬 깔끔해질 수 있습니다
            <br />
            * 만약에 깊은 곳에 위치하는 컴포넌트에게 여러 컴포넌트를 거쳐서
            함수를 전달해야 하는 일이 있다면 이렇게 Context API 를 사용하시면
            됩니다.
            <br />
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
      <UserDispatch.Provider value={dispatch}>
        <div>
          <CreateUser4
            email={email}
            username={username}
            id={id}
            onChange={onChange}
            reset={reset}
          />
          <UserItem users={users} onModify={onModify} />
          <div>활성사용자 수 : {count}</div>
        </div>
      </UserDispatch.Provider>
    </>
  );
}

export default React.memo(UserList4);
