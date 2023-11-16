import { useState, useRef, useEffect } from 'react';
import { CountriesCard } from './components/CountriesCard';
import { useCountry } from './hooks/useCountry';

function useSearch() {
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError('Write the name of the country');
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const { search, setSearch, error } = useSearch();
  const { country, getCountry, loading } = useCountry({ search });

  const handleSubmit = (event) => {
    event.preventDefault();

    getCountry();
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div className='container'>
        {error && <p className='error'>{error}</p>}
        <div className='search-box'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>

          <form onSubmit={handleSubmit}>
            <input
              type='text'
              onChange={handleChange}
              value={search}
              name='search'
              className='userinput'
              placeholder='Enter country name...'
              autoFocus
            />
          </form>
        </div>
        <div className='info-box'>
          {loading ? (
            <div className='centered'>
              <div className='spinner'></div>
            </div>
          ) : (
            <CountriesCard country={country} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
