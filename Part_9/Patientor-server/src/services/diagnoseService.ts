import diagnoses from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getDiagnoses = ():Diagnose[] => diagnoses as Diagnose[];

export default {
    getDiagnoses
};