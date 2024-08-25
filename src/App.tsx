import { useState } from 'react';

function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showRipple, setShowRipple] = useState(false);

    const calculateResetChance = (currentScore: number) => {
        const successChance = (100 - currentScore) / 100;
        const failureChance = 1 - successChance;
        return failureChance;
    };

    const handleClick = () => {
        if (!isDisabled) {
            setIsAnimating(true);
            setIsDisabled(true);
            setTotalClicks(totalClicks + 1);

            const resetChance = calculateResetChance(currentScore);
            const randomValue = Math.random();

            if (randomValue < resetChance) {
                setCurrentScore(0);
                triggerResetAnimation();
            } else {
                const newCount = currentScore + 1;
                setCurrentScore(newCount);
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

    const triggerResetAnimation = () => {
        setShowRipple(true);
        setTimeout(() => setShowRipple(false), 600);
    }

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
                className={`flex justify-center items-center w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] min-w-[200px] min-h-[200px] bg-[#ffd700] rounded-full transition-all duration-150 ease-out 
                    ${isAnimating ? 'translate-y-3 lg:translate-y-4 shadow-none' : 'translate-y-0 shadow-[0_12px_0_#b58900] lg:shadow-[0_16px_0_#b58900]'}
                    ${showRipple ? 'button-ripple animate' : 'button-ripple'}
                `}
            >
                <span className="text-6xl lg:text-7xl text-[#8c6b00]">
                    {currentScore}
                </span>
            </button>
        </div>
    );
}

export default App;
