import { useEffect, useState } from 'react';
import clsx from 'clsx';

import '../../App.scss';
import styles from './Recat.module.scss';
import recatPpsImg from './recat-pps.jpg';
import ppsImg from './pps.png';

import {
  recatDataList,
  recatGroupList,
  RecatGroup,
  RecatPairData,
} from './recatData';

const TOTAL_CARDS = 20;

export default function RecatEasy() {
  const [randomList, setRandomList] = useState(recatDataList);
  const [showAnswer, setShowAnswer] = useState(false);
  const [index, setIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  function randomizeAndSlice(list: RecatPairData[], num = TOTAL_CARDS) {
    const newList = list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, num - 1);

    newList.push({
      plane1: RecatGroup.A,
      plane2: RecatGroup.A,
      spacing: 999,
    });

    return newList;
  }

  useEffect(() => {
    setRandomList(randomizeAndSlice(recatDataList));
  }, []);

  function handleShowAnswer() {
    const isFirstItem = index === 0;
    if (isFirstItem) {
      setStartTime(Date.now());
    }

    setShowAnswer(true);
  }

  function reset() {
    setIndex(0);
    setRandomList(randomizeAndSlice(recatDataList));
    setStartTime(Date.now());
    setShowAnswer(false);
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

    setShowAnswer(false);
  }

  function handleSpacebarDown(event: React.KeyboardEvent<HTMLDivElement>) {
    console.log('space pressed');
    if (event.key === ' ') {
      switch (showAnswer) {
        case true:
          handleNextQuestion();
          break;
        default:
          handleShowAnswer();
      }
    }
  }

  function displayTimer() {
    const timeElapsed = endTime - startTime;

    if (timeElapsed <= 0) return 'Click to show score';

    const totalTimeInSeconds = timeElapsed / 1000;
    const timePerCard = totalTimeInSeconds / TOTAL_CARDS;

    return (
      <>
        {/* <div>{`${totalTimeInSeconds.toFixed(1)} seconds`}</div> */}
        <div>{`${timePerCard.toFixed(1)} seconds per card`}</div>
      </>
    );
  }

  function RecatImage(plane1: RecatGroup, plane2: RecatGroup) {
    return (
      <div>
        <div className={styles.planeWrapper}>
          <div className={styles.plane}>{plane1}</div>
          <img src={ppsImg} className={styles.ppsImage} />
        </div>
        <div className={styles.planeWrapper}>
          <div className={styles.plane}>{plane2}</div>
          <img src={ppsImg} className={styles.ppsImage} />
        </div>
      </div>
    );
  }

  function DisplayList() {
    if (!randomList) return;
    const nextItem = randomList[index];

    const containerClass = clsx('cardContainer', styles.Recat, {
      disableClick: !isClickEnabled,
    });

    if (!showAnswer && nextItem.spacing !== 999) {
      return (
        <div className={containerClass} onClick={handleShowAnswer}>
          {RecatImage(nextItem.plane1, nextItem.plane2)}
          <div className={styles.answer}></div>
        </div>
      );
    } else if (nextItem.spacing === 999) {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          <div className={styles.answer}>Done!</div>
          <div className={styles.timeScore}>{displayTimer()}</div>
        </div>
      );
    } else {
      return (
        <div className={containerClass} onClick={handleNextQuestion}>
          {RecatImage(nextItem.plane1, nextItem.plane2)}
          <div className={styles.answer}>
            {nextItem.spacing ? nextItem.spacing : 'min'}
          </div>
        </div>
      );
    }
  }

  return (
    <section className="TopicPage">
      <div className="topicTitleRow">
        <div onKeyDown={handleSpacebarDown} tabIndex={-1}>
          ICAO-7 RECAT Basic
        </div>
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
