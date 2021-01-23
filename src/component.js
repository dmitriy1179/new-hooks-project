import React from 'react';

const useTimeout = (ms) => {
  const [isReady, setIsReady] = React.useState(false);
  const cancel = () => setIsReady(true)
  const reset = () => setIsReady(false)
  React.useEffect(() => {
    if (!isReady) {
      const timeoutId = setTimeout(() => {
        setIsReady(true);
      }, ms);
      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [isReady])
  return [isReady, cancel, reset];
};

function Component({ ms }) {
  const [isReady, cancel, reset] = useTimeout(ms);
    if (isReady) {
      return (
        <div>
          <p>Ready</p>
          <button onClick={() => reset()}>Reset</button>
        </div>
      );
    }
  return <button onClick={() => cancel()}>Cancel</button>;
}

export default Component