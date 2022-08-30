import React from 'react';

import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.root}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
      Идёт загрузка...
    </div>
  );
};
