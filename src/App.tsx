import { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const calculateFailureProbability = (n: number) => {
        let probability = 1;
        for (let i = 1; i <= n; i++) {
            probability *= (100 - i) / 100;
        }
        return 1 - probability;
    };

    const handleClick = () => {
        if (!isDisabled) {
            setIsAnimating(true);
            setIsDisabled(true);
            setTotalClicks(totalClicks + 1);

            const resetProbability = calculateFailureProbability(count);
            const randomValue = Math.random();

            if (randomValue < resetProbability) {
                setCount(0);
            } else {
                const newCount = count + 1;
                setCount(newCount);
                if (newCount > highscore) {
                    setHighscore(newCount);
                }
            }

            setTimeout(() => {
                setIsAnimating(false);
            }, 200);
            setTimeout(() => {
                setIsDisabled(false);
            }, 350);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-scren bg-[#242424]">
            <div className="text-center mb-20 mt-[-80px]">
                <p className="text-2xl text-[#d4d4d4] font-sans mb-2">
                    Max <span className="text-3xl text-[#ffffff] pl-2">{highscore}</span>
                </p>
                <p className="text-2xl text-[#d4d4d4] font-sans">
                    Total <span className="text-3xl text-[#ffffff] pl-2">{totalClicks}</span>
                </p>
            </div>
            <button
                onClick={handleClick}
                className={`flex justify-center items-center w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] min-w-[100px] min-h-[100px] bg-[#ffd700] rounded-full transition-all duration-150 ease-out 
                    ${isAnimating ? 'translate-y-1 shadow-none' : 'translate-y-0 shadow-[0_8px_0_#b58900]'}
                `}
            >
                <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#8c6b00]">
                    {count}
                </span>
            </button>
        </div>
    );
}

export default App;
