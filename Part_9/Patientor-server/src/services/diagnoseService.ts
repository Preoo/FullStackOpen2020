import diagnoses from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses = ():Diagnosis[] => diagnoses as Diagnosis[];

export default {
    getDiagnoses
};