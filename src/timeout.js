import React from 'react';

const useInterval = (callback, ms) => {
  const [isStart, setIsStart] = React.useState(true)
  const onStart = () => setIsStart(true)
  const onStop = () => setIsStart(false)

  React.useEffect(() => {
    if (isStart) {
      const intervalId = setInterval(() => {
        callback();
      }, ms);
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [isStart])

  return [isStart, onStart, onStop];
}

const delay = 1000;

const TimeOut = () => {
  const [count, setCount] = React.useState(0);
  const [isRunning, start, stop] = useInterval(() => {
    setCount((count) => count + 1);
  }, delay);
  const onClick = isRunning ? stop : start;
  return (
    <div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={onClick}>{isRunning ? "stop" : "start"}</button>
      </div>
    </div>
  );
};

export default TimeOut