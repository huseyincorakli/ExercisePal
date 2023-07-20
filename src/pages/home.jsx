import React, { useEffect, useState } from 'react';
import Week from '../components/week';
import User from '../components/user';

const Home = ({ handleLogout,user }) => {
  const [quotes, setQuotes] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=dreams', {
          headers: { 'X-Api-Key': `${import.meta.env.VITE_X_API_KEY}` }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error(error);
      }
    };

    //fetchQuotes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [quotes]);
  return (
    <div>
      <div className='flex items-center justify-around gap-3 m-2 p-5'>
        <div className="marquee-container flex-grow">
          <div className="marquee">
            {!quotes ? <p>If you want to succeed you should strike out on new paths, rather than travel the worn paths of accepted success.</p> : 
            quotes.length > 0 && quotes[currentQuoteIndex].quote
          }
          </div>
        </div>
        <div><User user={user} /></div>
        <button onClick={handleLogout}   className="Btn min-w-[33px]">
          <div className="sign">
            <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>

      <Week />
    </div>
  );
};

export default Home;
