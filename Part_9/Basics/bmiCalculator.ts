// interface BMIConfig {
//     weight: number,
//     height: number
// }

// const parseArgs = (args:string[]): BMIConfig => {
//     if (args.length !== 4) throw new Error('Invalid argument exception: expected 4 args');
//     const weight = Number(args[2]);
//     const height = Number(args[3]);
//     if (isNaN(weight) || isNaN(height)) {
//         throw new Error('Argument type exception: values are not numbers');
//     }

//     return { weight, height };
// }

const calculateBMI = (weight:number, height:number): string => {
    const ratio = weight / Math.pow(height*0.01, 2);
    if (ratio <= 15) return 'Very severely underweight';
    if (15 < ratio && ratio <= 16) return 'Severely underweight';
    if (16 < ratio && ratio <= 18.5) return 'Underweight';
    if (18.5 < ratio && ratio <= 25) return 'Normal (healthy weight)';
    if (25 < ratio && ratio <= 30) return 'Overweight';
    if (30 < ratio && ratio <= 35) return 'Obese Class I (Moderately obese)';
    if (35 < ratio && ratio <= 40) return 'Obese Class II (Severely obese)';
    if (40 < ratio) return 'Obese Class III (Very severely obese)';
    return 'Default';
};

export default calculateBMI;