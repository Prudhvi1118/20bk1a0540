import React, { useEffect, useState } from 'react';

const Api = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const urls = queryParams.getAll('url');
      
      if (urls.length > 0) {
        try {
          const response = await Promise.all(
            urls.map((url) => fetch(url).then((res) => res.json()))
          );
          const numbers = response.map((data) => data.number);
          setNumbers(numbers);
        } catch (error) {
          console.error('Error fetching numbers:', error);
        }
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div>
      <h1>Numbers:</h1>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default Api;