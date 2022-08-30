import React from 'react';

import { Loading } from '../Loading';

import styles from './CurrenciesList.module.scss';

export const CurrenciesList = ({ setIsOpen, currency, onChangeCurrency }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [allCurrencies, setAllCurrencies] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        setAllCurrencies(Object.entries(json.rates));
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onClickPopup = (cur) => {
    onChangeCurrency(cur[0]);
    setIsOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <ul className={styles.root}>
      {allCurrencies.map((cur) => (
        <li
          onClick={() => onClickPopup(cur)}
          className={currency === cur[0] ? 'active' : ''}
          key={cur[0]}>
          {cur[0]}
        </li>
      ))}
    </ul>
  );
};
