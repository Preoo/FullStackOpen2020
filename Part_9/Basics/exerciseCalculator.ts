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

export function isValidExcercisesConfig(data:unknown): data is ExercisesConfig {
    return (
        (data as ExercisesConfig).exerciseHours !== undefined
        && (data as ExercisesConfig).target !== undefined
        && !isNaN((data as ExercisesConfig).target)
        && (data as ExercisesConfig).exerciseHours.map(Number).every(n => !isNaN(n))
    );
}

export const buildConfig = (args:string[]): ExercisesConfig => {
    // As we cannot do a ...rest to collect all preceding vars, this will do.
    // node and script are always present from process.argv

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_node, _script, targetInput, ...exercisesInput] = args;
    const target = Number(targetInput);
    const exerciseHours = exercisesInput.map(Number).filter(n =>!isNaN(n));
    //hack get around error TS6133
    if (isNaN(target) || !exerciseHours.length || !_node || !_script) {
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

export default calculateExercises;