import Freqs from './data/cjs-freq/Freqs';
import { useState } from 'react';

import Airports from './data/airports/Airports';
import Sids, { IRunway } from './data/sids/Sids';

import './App.scss';
import Satellite from './data/satellite/Satellite';
import RecatEasy from './data/recat/RecatEasy';
import RecatHard from './data/recat/RecatHard';

const Topic = {
  Home: 'Home',
  Airports: 'Airports',
  Freqs: 'Freqs',
  Satellite: 'Satellite',
  SIDs: IRunway,
  RecatEasy: 'RECAT Basic',
  RecatHard: 'RECAT Hard',
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
          YYZ Terminal App 2.3a
        </h1>
        <h2>Select a topic. </h2>
      </section>
      <section className="topicSection">
        <ol>
          <li className="topicRow" onClick={() => setTopic(Topic.RecatEasy)}>
            RECAT Basic
          </li>
          <li className="topicRow" onClick={() => setTopic(Topic.RecatHard)}>
            RECAT Hard
          </li>
          <li className="topicRow" onClick={() => setTopic(Topic.Freqs)}>
            CJS + Frequencies
          </li>
          <li className="topicRow" onClick={() => setTopic(Topic.Airports)}>
            Airports
          </li>
          <li className="topicRow" onClick={() => setTopic(Topic.Satellite)}>
            Satellite Procedures
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
      {topic === Topic.RecatEasy && <RecatEasy />}
      {topic === Topic.RecatHard && <RecatHard />}
      {topic === Topic.Freqs && <Freqs />}
      {topic === Topic.Airports && <Airports />}
      {topic === Topic.Satellite && <Satellite />}
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
