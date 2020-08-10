export default function logger({ getState }) {
  return (next) => (action) => {
    console.log("*********************************");
    console.log("prevState", getState());
    console.log("action", action);
    next(action);
    console.log("currentState", getState());
    console.log("*********************************");
  };
}
