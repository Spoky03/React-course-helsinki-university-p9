interface TrainingResults {
    regularDays: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}
// the number of days
// the number of training days
// the original target value
// the calculated average time
// boolean value describing if the target was reached
// a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
// a text value explaining the rating, you can come up with the explanations
const calculateExercises = (dailyExercises: number[], target: number): TrainingResults => {  
    const regularDays = dailyExercises.length;
    const trainingDays = dailyExercises.filter(d => d !== 0).length;
    const average = dailyExercises.reduce((acc, i) => acc + i, 0) / regularDays;
    const success = average >= target;
    const rating = success ? 3 : average >= target * 0.6 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'good' : rating === 2 ? 'not too bad but could be better' : 'bad';
    return { regularDays, trainingDays, target, average, success, rating, ratingDescription };
};

// if (process.argv.length < 4) {
//     throw new Error('Not enough arguments');
// } else {
//     const [, , ...args] = process.argv;
//     const target = Number(args.shift());
//     const dailyExercises = args.map(a => Number(a));
//     console.log(calculateExercises(dailyExercises, target));
// }

export { calculateExercises };