import { CoursePart } from '../types';
import { assertNever } from '../utils';

export const Part = (props: { part: CoursePart }) => {
    switch (props.part.kind) {
        case "basic":
            return (
                <div>
                    <p>{props.part.name} {props.part.exerciseCount}</p>
                    <p>{props.part.description}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <p>{props.part.name} {props.part.exerciseCount}</p>
                    <p>project exercises {props.part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <p>{props.part.name} {props.part.exerciseCount}</p>
                    <p>{props.part.description}</p>
                    <p>required background: {props.part.backgroundMaterial}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <p>{props.part.name} {props.part.exerciseCount}</p>
                    <p>{props.part.description}</p>
                    <p>required skills: {props.part.requirements.join(', ')}</p>
                </div>
            );
        default:
            return assertNever(props.part);
    }
}
