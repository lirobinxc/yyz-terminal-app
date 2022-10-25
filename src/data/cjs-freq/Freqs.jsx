import { useEffect, useState } from 'react';
import { frequencyList } from './frequencyList.js';
import clsx from 'clsx';

import '../../App.css';

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
    setRandomList(randomize(frequencyList));
  }, []);

  function handleShowAnswer() {
    const isFirstItem = index === 0;
    if (isFirstItem) {
      setStartTime(Date.now());
    }

    setShowCjs(false);
  }

  function handleNextQuestion() {
    if (!isClickEnabled) return;

    const isLastItem = index === randomList.length - 1;
    if (isLastItem) {
      setIsClickEnabled(false);
      setEndTime(Date.now());
      setTimeout(() => {
        setIsClickEnabled(true);
        setIndex(0);
        setRandomList(randomize(frequencyList));
        setStartTime(Date.now());
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

  function displayList() {
    if (!randomList) return;
    const nextItem = randomList[index];

    const containerClass = clsx('cardContainer', {
      disableClick: !isClickEnabled,
    });

    if (showCjs && nextItem.cjs !== 'Done!') {
      return (
        <div className={containerClass} onClick={handleShowAnswer}>
          <div className="cjs">{nextItem.cjs}</div>
          <div className="freq">___</div>
        </div>
      );
    } else if (nextItem.cjs === 'Done!') {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="cjs">Done!</div>
          <div className="freq">{displayTimer()}</div>
        </div>
      );
    } else {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className="cjs">{nextItem.cjs}</div>
          <div className="freq">{nextItem.freq}</div>
        </div>
      );
    }
  }

  return (
    <main>
      <div className="remainingCount">
        <div>CJS Frequencies </div>
        <div>
          Remaining: {randomList ? randomList.length - index - 1 : '0'}/
          {frequencyList.length}
        </div>
      </div>
      {displayList()}
    </main>
  );
}
