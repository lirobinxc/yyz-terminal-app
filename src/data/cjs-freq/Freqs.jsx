import { useEffect, useState } from 'react';
import { frequencyData } from './frequencyData.js';
import clsx from 'clsx';

import '../../App.scss';

export default function Freqs() {
  const [randomList, setRandomList] = useState();
  const [showCjs, setShowCjs] = useState(true);
  const [index, setIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  function randomize(list) {
    const newList = list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    newList.push({ cjs: 'Done!' });

    return newList;
  }

  useEffect(() => {
    setRandomList(randomize(frequencyData));
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
    setRandomList(randomize(frequencyData));
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

    const containerClass = clsx('cardContainer', 'Freqs', {
      disableClick: !isClickEnabled,
    });

    if (showCjs && nextItem.cjs !== 'Done!') {
      return (
        <div className={containerClass} onClick={handleShowAnswer}>
          <div className="data1">{nextItem.cjs}</div>
          <div className="data2">___</div>
        </div>
      );
    } else if (nextItem.cjs === 'Done!') {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">Done!</div>
          <div className="data2">{displayTimer()}</div>
        </div>
      );
    } else {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="data1">{nextItem.cjs}</div>
          <div className="data2">{nextItem.freq}</div>
        </div>
      );
    }
  }

  return (
    <section className="TopicPage">
      <div className="topicTitleRow">
        <div>CJS Frequencies</div>
        <div>
          Remaining: {randomList ? randomList.length - index - 1 : '0'}/
          {frequencyData.length}
        </div>
      </div>
      {DisplayList()}
      <button className="resetButton" onClick={reset}>
        RESET
      </button>
    </section>
  );
}
