import { useEffect, useState } from 'react';
import clsx from 'clsx';
import _ from 'lodash';

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
import { AircraftRecatData } from './aircraftRecatData';

export default function RecatHard() {
  const [randomList, setRandomList] = useState(
    randomizeAndSlice(recatDataList)
  );
  const [showAnswer, setShowAnswer] = useState(true);
  const [index, setIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [isClickEnabled, setIsClickEnabled] = useState(true);
  const [planes, setPlanes] = useState<
    [string | undefined, string | undefined]
  >(['', '']);

  function randomizeAndSlice(list: RecatPairData[], num = 20) {
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
    setPlanes([
      _.sample(AircraftRecatData[randomList[index].plane1]),
      _.sample(AircraftRecatData[randomList[index].plane2]),
    ]);
  }, [index]);

  function handleShowAnswer() {
    const isFirstItem = index === 0;
    if (isFirstItem) {
      setStartTime(Date.now());
    }

    setShowAnswer(false);
  }

  function reset() {
    setIndex(0);
    setRandomList(randomizeAndSlice(recatDataList));
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

  function RecatImage(plane1: RecatGroup, plane2: RecatGroup) {
    return (
      <div>
        <div className={styles.planeWrapper}>
          <div className={styles.planeName}>{planes[0]}</div>
          <img src={ppsImg} className={styles.ppsImage} />
          <div className={styles.plane}></div>
        </div>
        <div className={styles.planeWrapper}>
          <div className={styles.planeName}>{planes[1]}</div>
          <img src={ppsImg} className={styles.ppsImage} />
          <div className={styles.plane}></div>
        </div>
      </div>
    );
  }

  function RecatImageAnswer(plane1: RecatGroup, plane2: RecatGroup) {
    return (
      <div>
        <div className={styles.planeWrapper}>
          <div className={styles.planeName}>{planes[0]}</div>
          <img src={ppsImg} className={styles.ppsImage} />
          <div className={styles.plane}>{plane1}</div>
        </div>
        <div className={styles.planeWrapper}>
          <div className={styles.planeName}>{planes[1]}</div>
          <img src={ppsImg} className={styles.ppsImage} />
          <div className={styles.plane}>{plane2}</div>
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

    if (showAnswer && nextItem.spacing !== 999) {
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
          {RecatImageAnswer(nextItem.plane1, nextItem.plane2)}
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
        <div>ICAO-7 RECAT Hard</div>
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
