import React from 'react';

import { Block } from './pages/Block';

import './scss/index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  React.useEffect(() => {
    const { countries, zones } = require('moment-timezone/data/meta/latest.json');
    const timeZoneCityToCountry = {};
    Object.keys(zones).forEach((z) => {
      const cityArr = z.split('/');
      const city = cityArr[cityArr.length - 1];
      timeZoneCityToCountry[city] = countries[zones[z].countries[0]].name;
    });
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzArr = userTimeZone.split('/');
    const userCity = tzArr[tzArr.length - 1];
    const userCountry = timeZoneCityToCountry[userCity];

    fetch('https://630e35c13792563418795145.mockapi.io/currency-codes?search=' + userCountry)
      .then((res) => res.json())
      .then((json) => {
        setFromCurrency(json[0].currency_code);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию');
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };
  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
