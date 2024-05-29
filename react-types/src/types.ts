interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDescription {
    // description: string;
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
    // description: string;
    backgroundMaterial: string;
    kind: "background"
}
interface CoursePartSpecial extends CoursePartDescription {
    // description: string;
    requirements: string[];
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

