const calculateFailureChance = (n) => {
    const successChance = (100 - n) / 100;
    const failureChance = 1 - successChance;
    return failureChance;
};

const simulateClick = (count) => {
    const failureChance = calculateFailureChance(count);
    const randomValue = Math.random();
    if (randomValue < failureChance) {
        return 0;
    } else {
        return count + 1;
    }
};

const runSimulation = (iterations) => {
    let maxCount = 0;

    for (let i = 0; i < iterations; i++) {
        let count = 0;
        while (true) {
            const newCount = simulateClick(count);
            if (newCount === 0) {
                // Has been reseted
                break;
            }
            count = newCount;
            if (count > maxCount) {
                maxCount = count;
            }
        }
    }

    console.log(`Highscore: ${maxCount}`);
};

// Simulate highscore for 1 million resets
runSimulation(1_000_000);