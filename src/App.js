import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Global from './styled/Global';
import { Main } from './styled/Main';
import Container from './styled/Container';
import Navbar from './components/Navbar';
// code splitting components
const Game = lazy(() => import('./pages/Game'));
const HighScores = lazy(() => import('./pages/HighScores'));
const GameOver = lazy(() => import('./pages/GameOver'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Main>
      <Global />
      <Container>
        <Suspense fallback={<div>Loading ..</div>}>
          <Router>
            <Navbar />
              <Switch>
                <Route path="/game" component={Game}></Route>
                <Route path="/highScores" component={HighScores}></Route>
                <Route path="/gameOver" component={GameOver}></Route>
                <Route path="/" exact component={Home}></Route>
              </Switch>
          </Router>
        </Suspense>
      </Container>
    </Main>
  );
}

export default App;
