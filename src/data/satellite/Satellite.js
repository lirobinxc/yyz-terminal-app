import { useEffect, useState } from 'react';
import { satelliteData } from './satelliteData';
import clsx from 'clsx';

import '../../App.scss';

export default function Satellite() {
  const [randomList, setRandomList] = useState(satelliteData);
  const [showQuestion, setShowQuestion] = useState(true);
  const [index, setIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  function randomize(list) {
    const newList = list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    newList.push({ Type: 'Done!' });

    return newList;
  }

  useEffect(() => {
    setRandomList(randomize(satelliteData));
  }, []);

  function handleShowAnswer() {
    const isFirstItem = index === 0;
    if (isFirstItem) {
      setStartTime(Date.now());
    }

    setShowQuestion(false);
  }

  function reset() {
    setIndex(0);
    setRandomList(randomize(satelliteData));
    setStartTime(Date.now());
    setShowQuestion(true);
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
    setShowQuestion(true);
  }

  function displayTimer() {
    const timeElapsed = endTime - startTime;

    if (timeElapsed <= 0) return 'Click to show score';

    return `${(timeElapsed / 1000).toFixed(1)} seconds`;
  }

  function DisplayList() {
    if (!randomList) return;
    const nextItem = randomList[index];

    const containerClass = clsx('cardContainer', 'Satellite', {
      disableClick: !isClickEnabled,
    });

    if (showQuestion && nextItem.Type !== 'Done!') {
      return (
        <div className={containerClass} onClick={handleShowAnswer}>
          <div className="data1">{nextItem.Type}</div>
          <h3>Enters Terminal</h3>
          <div className="data2">____</div>
          <h3>Exits Terminal</h3>
          <div className="data3">____</div>
          <h3>Notes</h3>
          <div className="data4">____</div>
        </div>
      );
    } else if (nextItem.Type === 'Done!') {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">Done!</div>
          <div className="data2">{displayTimer()}</div>
        </div>
      );
    } else {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">{nextItem.Type}</div>
          <h3>Enters Terminal</h3>
          <div className="data2">{nextItem.EntersTerminal}</div>
          <h3>Exits Terminal</h3>
          <div className="data3">{nextItem.ExitsTerminal}</div>
          <h3>Notes</h3>
          <div className="data4">{nextItem.Notes}</div>
        </div>
      );
    }
  }

  return (
    <section className="TopicPage">
      <div className="topicTitleRow">
        <div>Satellite Procedures</div>
        <div>
          Remaining: {randomList ? randomList.length - index - 1 : '0'}/
          {satelliteData.length}
        </div>
      </div>
      {DisplayList()}
      <button className="resetButton" onClick={reset}>
        RESET
      </button>
    </section>
  );
}
