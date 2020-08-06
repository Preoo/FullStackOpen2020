export interface ExerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

export interface ExercisesConfig {
    target: number,
    exerciseHours: number[]
}

export const buildConfig = (args:string[]): ExercisesConfig => {
    // As we cannot do a ...rest to collect all preceding vars, this will do.
    // node and script are always present from process.argv
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [node, script, targetInput, ...exercisesInput] = args;
    const target = Number(targetInput);
    const exerciseHours = exercisesInput.map(Number).filter(n =>!isNaN(n));
    if (isNaN(target) || !exerciseHours.length) {
        throw new Error('Invalid arguments exception: Expected atleast 2 numerical arguments');
    }

    return { target, exerciseHours };
};

const getRating = (average:number, target: number): number => {
    if (average >= target) return 3;
    if (Math.abs(target - average) <= 1) return 2;
    return 1;
};

const calculateExercises = (config:ExercisesConfig): ExerciseResults => {
    const { target, exerciseHours } = config;
    const average = exerciseHours.reduce((sum, next) => sum + next, 0) / exerciseHours.length;
    const success = average >= target;
    const rating = getRating(average, target);
    const descriptions = ['so bad', 'almost', 'veri gud'];

    return {
        periodLength: exerciseHours.length,
        trainingDays: exerciseHours.reduce((t, d) => d > 0 ? t+1 : t, 0),
        success,
        rating,
        ratingDescription: descriptions[rating - 1],
        target,
        average
    };
};

// try {
//     const config = buildConfig(process.argv);
//     console.info(calculateExercises(config));
// } catch (e) {
//     console.error(`Oooops! ${e.message}`);
// }

export default calculateExercises;