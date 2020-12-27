import React from 'react';
import { useScore } from '../contexts/ScoreContext';

export default function GameOver({ history }) {
  const [score] = useScore();

  if (score === -1) {
    history.push('/');
  }
  return (
    <div>
      GameOver: {score}
    </div>
  );
};
