import { useEffect, useState } from "react";
import Timer from "./Timer";

const Form = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <>
      <Timer time={time} setIsRunning={setIsRunning} />
    </>
  );
};

export default Form;
