import { useState, useRef } from 'react';
import { searchCountry } from '../services/country';

export function useCountry({ search }) {
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search);

  const getCountry = async () => {
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      const newCountry = await searchCountry({ search });
      setCountry(newCountry?.message === 'Not Found' ? '' : newCountry);
      previousSearch.current = search;
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return { country, getCountry, loading, previousSearch };
}
