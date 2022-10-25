import Freqs from './data/cjs-freq/Freqs';
import { useState } from 'react';

import './App.scss';
import Airports from './data/airports/Airports';

const Topic = {
  Freqs: 'Freqs',
  Home: 'Home',
  Airports: 'Airports',
};

function App() {
  const [topic, setTopic] = useState(Topic.Home);

  function returnHome() {
    setTopic(Topic.Home);
  }

  const Homepage = (
    <div className="Homepage">
      <section className="titleSection">
        <h1>
          ✈️
          <br />
          YYZ Terminal App 1.2
        </h1>
        <h2>Select a topic. </h2>
      </section>
      <section className="topicSection">
        <ol>
          <li className="topicRow" onClick={() => setTopic(Topic.Freqs)}>
            CJS + Frequencies
          </li>
          <li className="topicRow" onClick={() => setTopic(Topic.Airports)}>
            Airports
          </li>
        </ol>
      </section>
    </div>
  );

  return (
    <main>
      {topic === Topic.Home && Homepage}
      {topic === Topic.Freqs && <Freqs />}
      {topic === Topic.Airports && <Airports />}
      <div className="footerSection">
        {topic !== Topic.Home && (
          <button onClick={returnHome} className="homeButton">
            🏠
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
