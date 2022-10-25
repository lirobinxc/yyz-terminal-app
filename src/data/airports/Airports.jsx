import { useEffect, useState } from 'react';
import { airportsData } from './airportsData';
import clsx from 'clsx';

import '../../App.scss';

export default function Airports() {
  const [randomList, setRandomList] = useState();
  const [showCjs, setShowCjs] = useState(true);
  const [index, setIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  function randomizeAndSlice(list, num = 20) {
    const newList = list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, num - 1);

    newList.push({ designator: 'Done!' });

    return newList;
  }

  useEffect(() => {
    setRandomList(randomizeAndSlice(airportsData));
  }, []);

  function handleShowAnswer() {
    const isFirstItem = index === 0;
    if (isFirstItem) {
      setStartTime(Date.now());
    }

    setShowCjs(false);
  }

  function reset() {
    setIndex(0);
    setRandomList(randomizeAndSlice(airportsData));
    setStartTime(Date.now());
    setShowCjs(true);
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
    setShowCjs(true);
  }

  function displayTimer() {
    const timeElapsed = endTime - startTime;

    if (timeElapsed <= 0) return 'Click to show score';

    return `${(timeElapsed / 1000).toFixed(1)} seconds`;
  }

  function DisplayList() {
    if (!randomList) return;
    const nextItem = randomList[index];

    const containerClass = clsx('cardContainer', 'Airports', {
      disableClick: !isClickEnabled,
    });

    if (showCjs && nextItem.designator !== 'Done!') {
      return (
        <div className={containerClass} onClick={handleShowAnswer}>
          <div className="data1">{nextItem.designator}</div>
          <div className="data2">___</div>
        </div>
      );
    } else if (nextItem.designator === 'Done!') {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">Done!</div>
          <div className="data2">{displayTimer()}</div>
        </div>
      );
    } else {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">{nextItem.designator}</div>
          <div className="data2">{nextItem.location}</div>
        </div>
      );
    }
  }

  return (
    <section className="TopicPage">
      <div className="topicTitleRow">
        <div>Airports</div>
        <div>
          Remaining: {randomList ? randomList.length - index : '0'}/
          {randomList && randomList.length}
        </div>
      </div>
      {DisplayList()}
      <button className="resetButton" onClick={reset}>
        RESET
      </button>
    </section>
  );
}
