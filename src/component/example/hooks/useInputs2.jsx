import { useReducer, useCallback } from "react";
import produce from "immer";
function reducer(state, action) {
  console.log("action::", action);
  console.log("state::", state);
  // console.log("initialState", inputs);
  switch (action.type) {
    case "CHANGE_INPUT":
      return produce(state, (draft) => {
        draft[action.name] = action.value;
      });
    case "RESET":
      return produce(state, (draft) => {
        draft.username = inputs.username;
        draft.email = inputs.email;
      });
    case "MODIFY_USER":
      return produce(state, (draft) => {
        draft.username = action.user.username;
        draft.email = action.user.email;
        draft.id = action.user.id;
      });

    // {
    //   ...state,
    //   username: action.user.username,
    //   email: action.user.email,
    //   id: action.user.id,
    // };
    default:
      return state;
  }
}
const inputs = {
  username: "",
  email: "",
  id: "",
};

function useInputs(initialForm) {
  console.log("1");
  // const [form, setForm] = useState(initialForm);
  const [state, dispatch] = useReducer(reducer, initialForm);

  // change
  const onChange = useCallback((e) => {
    console.log("2");
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onModify = useCallback((user) => {
    dispatch({
      type: "MODIFY_USER",
      user,
    });
  }, []);
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  console.log("state22::", state);
  return [state, onChange, reset, onModify];
}

export default useInputs;
