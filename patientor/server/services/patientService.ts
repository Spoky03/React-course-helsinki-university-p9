import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient} from '../types';
import { v1 as uuid } from 'uuid'


const getEntries = (): Patient[] => {
  return patients;
};
const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, 
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
}

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid()
    const NewPatient = {
        id: id,
        ...patient
    };
    patients.push(NewPatient);
    return NewPatient;

}
const getPatient = (id: string): Patient | undefined => {
    const patientToReturn = patients.find(p => p.id === id);
    return patientToReturn;
}

export default {
    getNonSensitiveEntries,
    getEntries,
    addPatient,
    getPatient,
};