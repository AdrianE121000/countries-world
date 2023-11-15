import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const CountriesCard = ({ country }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText-true`)
      .then((res) => res.json())
      .then((response) => {
        setData(response[0]);
      })
      .catch(() => console.log('Error al hacer el fetch'));
  }, [country]);

  return (
    <>
      {data === undefined ? (
        <div className='error'>
          Country not found, write the name correctly.
        </div>
      ) : !data ? (
        <div className='centered'>
          <div className='spinner'></div>
        </div>
      ) : (
        <>
          <div className='flag-and-name'>
            <div className='flag'>
              <img
                src={data.flags.svg}
                alt='Countie Flag'
              />
            </div>
            <h3 className='country-name'>{data.name.common}</h3>
          </div>
          <div className='other-info'>
            <h5>
              Capital: <span>{data.capital}</span>
            </h5>
            <h5>
              Continent: <span>{data.continents}</span>
            </h5>
            <h5>
              Population: <span>{data.population}</span>
            </h5>
            <h5>
              Currency:{' '}
              <span>
                {Object.keys(data.currencies)[0]} -{' '}
                {data.currencies[Object.keys(data.currencies)[0]].symbol}
                {data.currencies[Object.keys(data.currencies)[0]].name}
              </span>
            </h5>
            <h5>
              Common Languages:{' '}
              <span>{Object.values(data.languages).join(', ')}</span>
            </h5>
          </div>
        </>
      )}
    </>
  );
};

export default CountriesCard;
