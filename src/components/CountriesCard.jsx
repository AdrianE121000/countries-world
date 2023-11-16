import { useCountry } from '../hooks/useCountry';

export function Component({ country }) {
  return (
    <>
      <div className='flag-and-name'>
        <div className='flag'>
          <img
            src={country[0].flags.svg}
            alt='Countie Flag'
          />
        </div>
        <h3 className='country-name'>{country[0].name.common}</h3>
      </div>
      <div className='other-info'>
        <h5>
          Capital: <span>{country[0].capital}</span>
        </h5>
        <h5>
          Continent: <span>{country[0].continents}</span>
        </h5>
        <h5>
          Population: <span>{country[0].population}</span>
        </h5>
        <h5>
          Currency:{' '}
          <span>
            {Object.keys(country[0].currencies)[0]} -{' '}
            {
              country[0].currencies[Object.keys(country[0].currencies)[0]]
                .symbol
            }{' '}
            {country[0].currencies[Object.keys(country[0].currencies)[0]].name}
          </span>
        </h5>
        <h5>
          Common Languages:{' '}
          <span>{Object.values(country[0].languages).join(', ')}</span>
        </h5>
      </div>
    </>
  );
}

export function NoCountryResults({ country }) {
  const { previousSearch } = useCountry({ country });
  return previousSearch.current === country ? (
    <div></div>
  ) : (
    <div className='error'>Country not found, write the name correctly.</div>
  );
}

export function CountriesCard({ country }) {
  const hasCountry = country?.length > 0;
  return hasCountry ? (
    <Component country={country} />
  ) : (
    <NoCountryResults country={country} />
  );
}
