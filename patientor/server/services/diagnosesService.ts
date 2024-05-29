import diagnosesEntries from '../data/diagnoses';
import patients from '../data/patients';
import { Diagnosis, NewEntry, Patient, Entry } from '../types';
import { v1 as uuid } from 'uuid'
const diagnoses: Diagnosis[] = diagnosesEntries as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addEntry = (entry: NewEntry, patientId: Patient['id']): Entry => {
    const newEntry = {
        id: uuid(),
        ...entry
    }
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        throw new Error('Patient not found');
    }
    patient.entries.push(newEntry);
    return newEntry;
}
export default {
  getEntries,
  addEntry,
};