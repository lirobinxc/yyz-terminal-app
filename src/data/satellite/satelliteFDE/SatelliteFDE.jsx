import React, { useState } from 'react';
import clsx from 'clsx';

// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from './up-arrow.png';
import downArrow from './down-arrow.png';

import './SatelliteFDE.scss';

function SatelliteFDE({
  acId,
  acFullName,
  acType,
  assignedAlt,
  coordinatedAlt,
  assignedHeading,
  onCourseWP,
  ETA,
  runwayId,
  transponderCode,
  filedAlt,
  filedRoute,
  destination,
  remarks,
  isNADP1 = false,
  isQ400 = false,
  departurePoint,
}) {
  const [currentAlt, setCurrentAlt] = useState(assignedAlt);

  return (
    <section className={clsx('FlightStrip', 'flexCol')}>
      <div className={clsx('topRow', 'flexRow')}>
        <div className={clsx('col1')}>
          <div className={clsx('acId')}>{acId}</div>
        </div>
        <div className={clsx('col2')}>
          <div className={clsx('ETA')}>{ETA}Z</div>
          <div className={clsx('transponderCode')}>{transponderCode}</div>
        </div>
        <div className={clsx('col3')}>
          <img src={upArrow} className="arrowPng" alt="departureArrow" />
        </div>
        <div className={clsx('col4')}>
          <div className={clsx('assignedAlt')}>{currentAlt}</div>
        </div>
        <div className={clsx('col5')}>
          <div className={clsx('remarks')}>{remarks}</div>
        </div>
        <div className={clsx('col6')}>
          <div className={clsx('assignedHeading')}>{assignedHeading}</div>
        </div>
        <div className={clsx('col7')}>
          <div className={clsx('isNADP1')}>{isNADP1 && 1}</div>
        </div>
        <div className={clsx('col8')}>
          <div className={clsx('runwayId')}>{runwayId}</div>
        </div>
      </div>
      <div className={clsx('bottomRow', 'flexRow')}>
        <div className={clsx('col1', { bgWhite: isQ400 })}>
          <div className={clsx('acType')}>{acFullName}</div>
        </div>
        <div className={clsx('col2')}>
          <div className={clsx('filedAlt')}>{filedAlt}</div>
        </div>
        <div className={clsx('col3')}></div>
        <div className={clsx('col4')}>
          <div className={clsx('filedRoute')}>{filedRoute}</div>
        </div>
        <div className={clsx('col5')}>
          <div className={clsx('destination')}>{destination}</div>
        </div>
        <div className={clsx('col6')}>
          <div className={clsx('coordinatedAlt')}>{coordinatedAlt}</div>
        </div>
      </div>
    </section>
  );
}

export default SatelliteFDE;
