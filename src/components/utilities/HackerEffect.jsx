import React, { useEffect, useRef, useState } from 'react'

export const HackerEffect = ({ value = 'SIPPETS', time = 50, rounds = 20 }) => {

  const [text, setText] = useState(value);
  const [ended, setEnded] = useState(false);
  const intervalRef = useRef(null);

  const hackText = () => {
    let iteration = 0;
    // clearInterval(intervalRef.current);

    setInterval(() => {
      setText((prevText) =>
        prevText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return value[index];
            }
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        setEnded(true)
      }
      iteration += 1 / rounds;
    }, time);
  };

  useEffect(() => {
    hackText()
  }, [])

  return (
    <h1 className='text-xl mx-auto' >
      {text}
    </h1>
  );
};
