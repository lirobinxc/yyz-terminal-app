import { useEffect, useState } from 'react';
import { sidsData } from './sidsData.js';
import clsx from 'clsx';

import '../../App.scss';

export const IRunway = {
  '05,06LR': '05, 06LR',
  '15LR': '15LR',
  '23,24LR': '23, 24LR',
  '33LR': '33LR',
};

export default function Sids({ runwayConfig }) {
  const [randomList, setRandomList] = useState(sidsData['05,06LR']);
  const [showAnswer, setShowAnswer] = useState(true);
  const [index, setIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  function randomize(list) {
    const newList = list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    newList.push({ isDone: true });

    return newList;
  }

  useEffect(() => {
    setRandomList(randomize(sidsData[runwayConfig]));
  }, [runwayConfig]);

  function handleShowAnswer() {
    const isFirstItem = index === 0;
    if (isFirstItem) {
      setStartTime(Date.now());
    }

    setShowAnswer(false);
  }

  function reset() {
    setIndex(0);
    setRandomList(randomize(sidsData[runwayConfig]));
    setStartTime(Date.now());
    setShowAnswer(true);
  }

  function handleNextQuestion() {
    if (!isClickEnabled) return;

    const isLastItem = index === randomList.length - 1;
    if (isLastItem) {
      setIsClickEnabled(false);
      setEndTime(Date.now());
      setTimeout(() => {
        setIsClickEnabled(true);
        reset();
      }, 4000);
    } else {
      setIndex(index + 1);
    }
    setShowAnswer(true);
  }

  function displayTimer() {
    const timeElapsed = endTime - startTime;

    if (timeElapsed <= 0) return 'Click to show score';

    return `${(timeElapsed / 1000).toFixed(1)} seconds`;
  }

  function DisplayList() {
    if (!randomList) return;
    const nextItem = randomList[index];

    const containerClass = clsx('cardContainer', 'Sids', {
      disableClick: !isClickEnabled,
    });

    if (showAnswer && !nextItem.isDone) {
      return (
        <div className={containerClass} onClick={handleShowAnswer}>
          <div className="data1">{nextItem.Name}</div>
          <div className="data3"></div>
          <div className="data2">___</div>
          <div className="data4"></div>
          <h3>Prop/Jet Turn?</h3>
          <div className="data5"></div>
          <h3>Handoff Procedures</h3>
          <div className="data6"></div>
          <div>Climbing to:</div>
          <div className="data7"></div>
          <div className="data7"></div>
        </div>
      );
    } else if (nextItem.isDone) {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">Done!</div>
          <div className="data2">{displayTimer()}</div>
        </div>
      );
    } else {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">{nextItem.Name}</div>
          <div className={clsx(['data3', {'colorPurple': nextItem['Aircraft type'] === 'Jet', 'colorOrange': nextItem['Aircraft type'] !== 'Jet'}])}>{nextItem['Aircraft type']}</div>
          <div className="data2">
            {nextItem['First WP']} - {nextItem['Route WP']} -{' '}
            {nextItem['Final WP']}
          </div>
          <div className="data4">
            {nextItem['Further WP'] && `- ${nextItem['Further WP']}`}
          </div>
          <h3>Prop/Jet Turn?</h3>
          <div className={clsx(['data5', {'colorPurple': nextItem['Aircraft type'] === 'Jet', 'colorOrange': nextItem['Aircraft type'] !== 'Jet'}])}>{nextItem['Prop or Jet Turns']}</div>
          <h3>Handoff Procedures</h3>
          <div className="data6">{`${nextItem['Handoff Sector']} - ${nextItem['Handoff Freq']}`}</div>
          <div>Climbing to:</div>
          <div className="data7">{nextItem['Handoff Alt']}</div>
          <div className="data7">{nextItem['Alt Handoff Alt']}</div>
        </div>
      );
    }
  }

  return (
    <section className="TopicPage">
      <div className="topicTitleRow">
        <div>SIDs - {runwayConfig}</div>
        <div>
          Remaining: {randomList ? randomList.length - index - 1 : '0'}/
          {sidsData[runwayConfig].length}
        </div>
      </div>
      {DisplayList()}
      <button className="resetButton" onClick={reset}>
        RESET
      </button>
    </section>
  );
}
