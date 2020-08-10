export default function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    next(action);
  };
}
