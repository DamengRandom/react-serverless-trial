import React, { useEffect, useState } from 'react';
import { ScoresList, ScoreLi } from '../styled/HighScores';

export default function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/getHighScores');
        const scores = await res.json();
        console.log('scores? ', scores);
        setHighScores(scores);
      } catch (error) {
        console.log(error);
      }
    };

    loadHighScores();
  }, []);

  return (
    <div>
      <h3>High Scores</h3>
      <ScoresList>
        {highScores.map(({ id, fields: { name, score } }) =>
          <ScoreLi key={id}>{name} - {score}</ScoreLi>)}
      </ScoresList>
    </div>
  );
};
