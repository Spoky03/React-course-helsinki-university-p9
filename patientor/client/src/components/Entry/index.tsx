import { Entry as EntryType, Diagnosis } from '../types';
import { assertNever } from '../../utils';
const EntryDetails: React.FC<{ entry: EntryType }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return (<>H</>);
        case 'HealthCheck':
            return (<>HC</>);
        case 'OccupationalHealthcare':
            return (<>OHC</>);
        default:
            return assertNever(entry);
    }
};
const Entry = ({ entry, diagnosisCodes }: { entry: EntryType, diagnosisCodes: Diagnosis[] }) => {
    return (
        <div key={entry.id}>
            <li style={{border: 'solid', margin:'1rem', padding:'1rem'}} >
                <span>{entry.date} <EntryDetails entry={entry} />
                    <br />
                    {entry.description}
                </span>
                <div>
                    {entry.diagnosisCodes && (
                        <ul>
                            {entry.diagnosisCodes.map((code : Diagnosis['code']) => (
                                <li key={code}>
                                    {code} <span>{diagnosisCodes.find(d => d.code === code)?.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p>Diagnose by: {entry.specialist}</p>
                </div>
            </li>
        </div>
    );
};

export default Entry;