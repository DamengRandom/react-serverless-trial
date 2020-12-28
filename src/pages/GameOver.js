import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useScore } from '../contexts/ScoreContext';
import { Strong } from '../styled/Random';

export default function GameOver({ history }) {
  const [score] = useScore();
  const { user: { name: username } } = useAuth0();

  if (score === -1) {
    history.push('/');
  }

  const saveHighScore = async () => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          name: username,
          score,
        })
      }
      const res = await fetch('/.netlify/functions/saveHighScore', options);
      await res.json();

      // if (data) {
      //   history.push('/');
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p>GameOver: <Strong>{score}</Strong></p>
      <button onClick={saveHighScore}>Save your record</button>
      <Link to="/">Back to home</Link>
    </div>
  );
};
