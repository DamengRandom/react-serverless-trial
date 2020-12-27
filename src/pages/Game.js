import React, { useState, useEffect, useCallback } from 'react';
import { StyledGame, StyledScore, StyledTimer, StyledCharacter } from '../styled/Game';
import { Strong } from '../styled/Random';

export default function Game({ history }) {
  const MAX_SECONDS = 5;
  const randomCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [score, setScore] = useState(0);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    setRandomCharacter();
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);

    return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seconds <= -1) {
      console.log('Game over ..');
      history.push('/gameOver');
    }
  }, [seconds, ms, history]);

  const KeyUpHandler = useCallback((e) => {
    console.log(e.key, currentCharacter)
    if (e.key === currentCharacter) {
      setScore(prevScore => prevScore + 1);
    } else {
      if (score > 0) {
        setScore(prevScore => prevScore - 1);
      }
    }
    setRandomCharacter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharacter]);

  useEffect(() => {
    document.addEventListener('keyup', KeyUpHandler);
    return () => {
      document.removeEventListener('keyup', KeyUpHandler);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharacter]);

  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMSString = ('0000' + msPassedStr).slice(-5);
    // 00000 - first 2 are the seconds, and last 3 are the ms that have passed
    const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3));

    // console.log(`${addLeadingZeros(updatedSeconds, 2)}: ${addLeadingZeros(updatedMs, 3)}`);
    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  const addLeadingZeros = (num, length) => {
    let zeros = "";

    for(let i = 0; i < length; i++) {
      zeros += "0";
    }

    return (zeros + num).slice(-length);
  };

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(randomCharacters[randomInt]);
  };

  return (
    <StyledGame>
      <StyledScore>Score: <Strong>{score}</Strong></StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>Timer: <Strong>{seconds}: {ms}</Strong></StyledTimer>
    </StyledGame>
  );
};
