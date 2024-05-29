const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

// if (process.argv.length < 4) {
//   throw new Error('Not enough arguments');
// } else if (process.argv.length > 4) {
//     throw new Error('Too many arguments');
//     }
// else if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) {
//     throw new Error('Invalid arguments');
//     }
// else {
//     const [, , height, weight] = process.argv;
//     console.log(calculateBMI(Number(height), Number(weight)));
//     }

export { calculateBmi };