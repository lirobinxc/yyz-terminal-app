import Freqs from './data/cjs-freq/Freqs';
import { useState } from 'react';

import Airports from './data/airports/Airports';
import Sids, { IRunway } from './data/sids/Sids';

import './App.scss';

const Topic = {
  Home: 'Home',
  Airports: 'Airports',
  Freqs: 'Freqs',
  SIDs: IRunway,
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
          YYZ Terminal App 1.7
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
          <li
            className="topicRow"
            onClick={() => setTopic(Topic.SIDs['05,06LR'])}
          >
            SIDs - 05/06LR
          </li>
          <li className="topicRow" onClick={() => setTopic(Topic.SIDs['15LR'])}>
            SIDs - 15LR
          </li>
          <li
            className="topicRow"
            onClick={() => setTopic(Topic.SIDs['23,24LR'])}
          >
            SIDs - 23/24LR
          </li>
          <li className="topicRow" onClick={() => setTopic(Topic.SIDs['33LR'])}>
            SIDs - 33LR
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
      {topic === Topic.SIDs['05,06LR'] && (
        <Sids runwayConfig={Topic.SIDs['05,06LR']} />
      )}
      {topic === Topic.SIDs['15LR'] && (
        <Sids runwayConfig={Topic.SIDs['15LR']} />
      )}
      {topic === Topic.SIDs['23,24LR'] && (
        <Sids runwayConfig={Topic.SIDs['23,24LR']} />
      )}
      {topic === Topic.SIDs['33LR'] && (
        <Sids runwayConfig={Topic.SIDs['33LR']} />
      )}
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
