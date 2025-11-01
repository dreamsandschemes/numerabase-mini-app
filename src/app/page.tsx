'use client';
import { useState, useEffect } from 'react';

// Helper function for numerology calculation
const reduceToSingleDigit = (num: number): number => {
  while (num > 9 && num !== 11 && num !== 22) { // Preserve master numbers
    num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
};

// Life Path descriptions
const descriptions = {
  1: 'Leader! Bold and pioneering energy.',
  2: 'Peacemaker. Intuitive and cooperative.',
  3: 'Creative communicator! Vibrant and expressive.',
  4: 'Builder. Grounded and practical.',
  5: 'Adventurer! Craves freedom and change.',
  6: 'Nurturer. Responsible and loving.',
  7: 'Seeker. Deeply spiritual and analytical.',
  8: 'Powerhouse. Ambitious and material-focused.',
  9: 'Humanitarian. Compassionate and visionary.',
  11: 'Master Illuminator. Highly intuitive.',
  22: 'Master Builder. Visionary and practical.'
};

export default function Home() {
  const [birthdate, setBirthdate] = useState('');
  const [lifePath, setLifePath] = useState(0);
  const [error, setError] = useState('');
  const [lifePathCounts, setLifePathCounts] = useState<Record<number, number>>({});
  const [raritySubmitted, setRaritySubmitted] = useState(false);

  // Load counters from localStorage on mount
  useEffect(() => {
    const savedCounts = localStorage.getItem('lifePathCounts');
    if (savedCounts) {
      setLifePathCounts(JSON.parse(savedCounts));
    }
  }, []);

  // Save counters to localStorage on change
  useEffect(() => {
    localStorage.setItem('lifePathCounts', JSON.stringify(lifePathCounts));
  }, [lifePathCounts]);

  const calculate = () => {
    setError('');
    console.log('Calculating with:', { birthdate });

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthdate)) {
      setError('Please enter birthdate as MM/DD/YYYY');
      console.log('Birthdate validation failed');
      return;
    }

    const bdNums = birthdate.split('/').join('').split('').map(Number);
    console.log('Birthdate nums:', bdNums);
    let lifePathNum = bdNums.reduce((a, b) => a + b, 0);
    console.log('Life Path sum:', lifePathNum);
    lifePathNum = reduceToSingleDigit(lifePathNum);
    console.log('Life Path result:', lifePathNum);

    setLifePath(lifePathNum);
    setRaritySubmitted(false); // Reset submit state
  };

  const submitRarity = () => {
    if (lifePath === 0) return;
    setLifePathCounts(prev => ({ ...prev, [lifePath]: (prev[lifePath] || 0) + 1 }));
    setRaritySubmitted(true);
    console.log('Submitted Life Path:', lifePath, 'New counts:', lifePathCounts);
  };

  const getRarityPercentage = () => {
    if (lifePath === 0) return 0;
    const total = Object.values(lifePathCounts).reduce((sum, count) => sum + count, 0);
    const count = lifePathCounts[lifePath] || 0;
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  const shareToFarcaster = () => {
    alert(`Sharing to Farcaster: My Life Path is ${lifePath}! #NumeraBase`);
  };

  const totalUsers = Object.values(lifePathCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 font-mono text-purple-200">
          NumeraBase: Unlock Your Life Path 🔮
        </h1>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Birthdate (MM/DD/YYYY)"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-3 rounded bg-purple-700 bg-opacity-50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={calculate}
            className="w-full p-3 bg-purple-500 hover:bg-purple-600 rounded font-semibold transition"
          >
            Calculate
          </button>
        </div>

        {error && <p className="text-red-300 mt-4 text-center">{error}</p>}

        {lifePath !== 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-mono text-purple-200 bg-purple-900 bg-opacity-50 p-2 rounded">
              Life Path: {lifePath} - {descriptions[lifePath]}
            </h2>
            {!raritySubmitted && (
              <button
                onClick={submitRarity}
                className="w-full p-3 bg-green-500 hover:bg-green-600 rounded font-semibold transition"
              >
                Submit for Rarity (Anonymous)
              </button>
            )}
            {raritySubmitted && totalUsers > 0 && (
              <p className="text-sm font-mono text-purple-200 text-center">
                Rarity: {getRarityPercentage()}% of {totalUsers} users have Life Path {lifePath}
              </p>
            )}
            <button
              onClick={shareToFarcaster}
              className="w-full p-3 bg-indigo-500 hover:bg-indigo-600 rounded font-semibold transition"
            >
              Share to Farcaster
            </button>
          </div>
        )}
      </div>
    </div>
  );
}