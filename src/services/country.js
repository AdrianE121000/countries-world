export const searchCountry = async ({ search }) => {
  if (search === '') return null;

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${search}?fullText-true`
    );
    const json = await response.json();
    const country = json;

    return country;
  } catch (e) {
    throw new Error('Error searching movies');
  }
};
