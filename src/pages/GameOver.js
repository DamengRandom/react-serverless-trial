
import { useScore } from '../contexts/ScoreContext';
import { Strong } from '../styled/Random';

export default function GameOver({ history }) {
  const [score] = useScore();

  if (score === -1) {
    history.push('/');
  }

  const saveHighScore = async () => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          name: 'trial 01',
          score,
        })
      }
      const res = await fetch('/.netlify/functions/saveHighScore', options);
      const data = await res.json();
      console.log('made it: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p>GameOver: <Strong>{score}</Strong></p>
      <button onClick={saveHighScore}>Save your record</button>
    </div>
  );
};
