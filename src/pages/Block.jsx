import React from 'react';

import { CurrenciesList } from '../components/CurrenciesList';

const defaultCurrencies = ['RUB', 'USD', 'EUR'];

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const condition =
    currency !== 'RUB' && currency !== 'USD' && currency !== 'EUR' && currency !== 'GBP';

  return (
    <div className="block">
      <ul className="currencies">
        {defaultCurrencies.map((cur) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? 'active' : ''}
            key={cur}>
            {cur}
          </li>
        ))}
        {condition ? (
          <li className="active">{currency}</li>
        ) : (
          <li
            onClick={() => onChangeCurrency('GBP')}
            className={currency === 'GBP' ? 'active' : ''}
            key={'GBP'}>
            GBP
          </li>
        )}
        <li onClick={() => setIsOpen(!isOpen)} className={isOpen ? 'active rotate' : ''}>
          <svg height="50px" viewBox="0 0 50 50" width="50px">
            <rect fill="none" height="50" width="50" />
            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
          </svg>
        </li>
      </ul>
      {isOpen && (
        <CurrenciesList
          setIsOpen={setIsOpen}
          currency={currency}
          onChangeCurrency={onChangeCurrency}
        />
      )}
      <input
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
    </div>
  );
};
