import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import useTimer from "../hooks/useTimer";

const Home: NextPage = () => {
  const workerRef = useRef<Worker>();
  const [resultBack, setResultBack] = useState<number>(5000000);
  const [resultMain, setResultMain] = useState<number>(5000000);

  const { time, start, stop } = useTimer();

  const handleMessage = ({ data }: { data: number }) => {
    setResultBack(data);
  };

  const handleClickBack = () => {
    workerRef.current?.postMessage(resultBack);
  };

  const handleClickMain = () => {
    let a = 0;
    for (let j = 0; j < 1000; j++) {
      a = 0;
      for (let i = 1; i <= resultMain; i++) {
        a += i;
      }
    }
    setResultMain(a);
  };

  useEffect(() => {
    // timer start
    start();

    // initialize worker
    workerRef.current = new Worker(new URL("../worker.ts", import.meta.url));

    // listen message
    workerRef.current.addEventListener("message", handleMessage);

    return () => {
      workerRef.current?.removeEventListener("message", handleMessage);
      stop();
    };
  }, [start, stop]);

  return (
    <div>
      <button onClick={handleClickBack}>足す(back)</button>
      <p>{resultBack}</p>
      <button onClick={handleClickMain}>足す(main)</button>
      <p>{resultMain}</p>

      <h1>{time}</h1>
    </div>
  );
};

export default Home;
