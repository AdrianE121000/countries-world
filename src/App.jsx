import { useState } from 'react';
import CountriesCard from './components/CountriesCard';
import { useForm } from 'react-hook-form';

function App() {
  const [pais, setPais] = useState('');
  const [enviarDatos, setEnviarDatos] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    resetField,
  } = useForm();

  const search = (event) => {
    setPais(event.countryName);
    resetField('countryName');
    setFocus('countryName');
    setEnviarDatos(true);
  };

  return (
    <>
      <div className='container'>
        {errors.countryName?.type === 'required' && (
          <div className='error'>Write the name of the country</div>
        )}
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

          <form onSubmit={handleSubmit(search)}>
            <input
              type='text'
              id='countryName'
              className='userinput'
              placeholder='Enter country name...'
              autoFocus
              {...register('countryName', {
                required: true,
              })}
            />
          </form>
        </div>
        <div className='info-box'>
          {enviarDatos && <CountriesCard country={pais} />}
        </div>
      </div>
    </>
  );
}

export default App;
