import { useParams } from 'react-router-dom';
import { Patient, Diagnosis, NewEntry } from '../types';
import Entry from './Entry';
import diagnosesService from '../services/diagnoses';
import { useEffect, useState } from 'react';

interface Props {
    patients : Patient[],
    diagnosisCodes: Diagnosis[]
  }
export const SinglePatient = ({ patients, diagnosisCodes} : Props ) => {
    const { id } = useParams<{ id: string }>();
    const [notify, setNotify] = useState<string | null>(null);
    const [visibleFormType, setVisibleFormType] = useState<NewEntry['type']>('HealthCheck');
    const patient = patients.find(p => p.id === id);
    

    //rest of form handling
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
    const [employerName, setEmployerName] = useState<string>('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');
    const [dischargeDate, setDischargeDate] = useState<string>('');
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

    const [newEntry, setNewEntry] = useState<NewEntry | null>(null);

    const handleSetNotify = (message : string) => {
        setNotify(message);
        setTimeout(() => {
            setNotify(null);
        }, 5000);
    };
    const handleEntryTypeChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setVisibleFormType(event.target.value as NewEntry['type']);
    };
    const handleEntryFormSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const date = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const description = (event.currentTarget.elements[1] as HTMLInputElement).value;
        const specialist = (event.currentTarget.elements[2] as HTMLInputElement).value;
        const diagnosisCodes = (event.currentTarget.elements[3] as HTMLInputElement).value;
        const type = visibleFormType as NewEntry['type'];


        const baseEntry = {
            date,
            description,
            specialist,
            diagnosisCodes: diagnosisCodes.split(' '),
        };


        switch (type) {
            case 'HealthCheck':
                console.log('entered switch case HealthCheck');
                console.log(healthCheckRating, type);
                setNewEntry({
                    ...baseEntry,
                    healthCheckRating,
                    type: 'HealthCheck',
                });
                break;
            case 'OccupationalHealthcare':
                console.log('entered switch case OccupationalHealthcare');
                setNewEntry({
                    ...baseEntry,
                    employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate,
                    },
                    type: 'OccupationalHealthcare',
                });
                break;
            case 'Hospital':
                console.log('entered switch case Hospital');
                setNewEntry({
                    ...baseEntry,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria,
                    },
                    type: 'Hospital',
                });
                break;
            default:
                break;
            
        } 
    };
    

    useEffect(() => {
        async function fetchDiagnoses() {
            if (newEntry) {
                const response: unknown = await diagnosesService.addEntry(id as string, newEntry as NewEntry);

                if (response instanceof Error) {
                    console.error(response.message);
                    handleSetNotify('entry failed to add');
                } else {handleSetNotify('entry added');}
            }
        }
        fetchDiagnoses();
    }, [id, newEntry]);

    return (
        <>
            <p style={{backgroundColor:'red'}}>{notify}</p>
            {patient && (
                <div>
                    <div>
                        <h3>New {'HealthCheck'} Entry</h3>
                        <h4>Entry Type</h4>
                        <div>
                            <input type="radio" name="entryType" value="HealthCheck" onChange={handleEntryTypeChange } />
                            <label>HealthCheck</label>

                            <input type="radio" name="entryType" value="OccupationalHealthcare" onChange={handleEntryTypeChange } />
                            <label>OccupationalHealthcare</label>

                            <input type="radio" name="entryType" value="Hospital" onChange={handleEntryTypeChange } />
                            <label>Hospital</label>

                        </div>
                        <form onSubmit={handleEntryFormSubmit}>
                            <div>
                                <label>date:</label>
                                <input type="date" />
                            </div>
                            <div>
                                <label>description:</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>specialist:</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>diagnosisCodes:</label>
                                <input type="text" maxLength={4} />
                            </div>
                            {
                                visibleFormType === 'HealthCheck' && (
                                    <div>
                                        <label>healthCheckRating:</label>
                                        <input type="number" onChange={(e) => setHealthCheckRating(parseInt(e.target.value))} max="3" min="0" />
                                    </div>
                                )
                            }
                            {
                                visibleFormType === 'OccupationalHealthcare' && (
                                    <div>
                                        <label>employerName:</label>
                                        <input type="text" onChange={(e) => setEmployerName(e.target.value)} />
                                        <label>sickLeave startDate:</label>
                                        <input type="date" onChange={(e) => setSickLeaveStartDate(e.target.value)} />
                                        <label>sickLeave endDate:</label>
                                        <input type="date" onChange={(e) => setSickLeaveEndDate(e.target.value)} />
                                    </div>
                                )
                            }
                            {
                                visibleFormType === 'Hospital' && (
                                    <div>
                                        <label>discharge date:</label>
                                        <input type="date" onChange={(e) => setDischargeDate(e.target.value)} />
                                        <label>discharge criteria:</label>
                                        <input type="text" onChange={(e) => setDischargeCriteria(e.target.value)} />
                                    </div>
                                )
                            }
                            <button type="submit">submit</button>
                        </form>
                    </div>
                    <h2>{patient.name} </h2>
                    <p>ssn: {patient.ssn}</p>
                    <p>gender: {patient.gender}</p>
                    <p>occupation: {patient.occupation}</p>
                    
                    {patient.entries && (<>
                    <h3>entries</h3>
                        <ul>
                            {patient.entries.map((entry) => (
                                <Entry key={entry.id} entry={entry} diagnosisCodes={diagnosisCodes}/>
                            ))}
                        </ul>
                    </>)}
                </div>
            )}

        </>
    );
};