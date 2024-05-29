import { NewPatient, Gender, Diagnosis, NewEntry} from '../types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}
const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing data');
    }
    return text;
}
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
}
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
}
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
      }
      return gender;
};
export const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect or missing fields');
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };
// const parseDiagnosisType = (object: unknown): Entry['type'] => {
//     if (!object || typeof object !== 'object' || !('type' in object)) {
//         throw new Error('Incorrect or missing data');
//     }
//     return object.type as Entry['type'];
// }
const parseHealthCheckRating = (object: unknown): number => {
    if (!object || typeof object !== 'object' || !('healthCheckRating' in object)) {
        throw new Error('Incorrect or missing data');
    }
    return object.healthCheckRating as number;
}
const parseSickLeave = (object: unknown): {startDate: string, endDate: string} => {
    if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
        throw new Error('Incorrect or missing data');
    }
    return object.sickLeave as {startDate: string, endDate: string};
}
const parseDischarge = (object: unknown): {date: string, criteria: string} => {
    if (!object || typeof object !== 'object' || !('discharge' in object)) {
        throw new Error('Incorrect or missing data');
    }
    return object.discharge as {date: string, criteria: string};
}
export const toNewEntry = (object: unknown): NewEntry => {
    if ( !object || typeof object !== 'object' || !('description' in object) || !('diagnosisCodes' in object) || !('date' in object) || !('specialist' in object) || !('type' in object)) {
        throw new Error('Incorrect or missing data');
      }
    if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
        const newEntry : NewEntry= {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object)
        };
        return newEntry;
    }
    if ('employerName' in object && 'sickLeave' in object && object.type === 'OccupationalHealthcare') {
        const newEntry : NewEntry= {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: 'OccupationalHealthcare',
            employerName: parseString(object.employerName),
            sickLeave: parseSickLeave(object)
        };
        return newEntry;
    }
    if ('discharge' in object && object.type === 'Hospital') {
        const newEntry : NewEntry= {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: 'Hospital',
            discharge: parseDischarge(object)
        };
        return newEntry;
    }
    throw new Error('Incorrect or missing fields');
}



