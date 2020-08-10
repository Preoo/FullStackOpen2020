import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase {
    description: string;
}
interface CoursePartOne extends CoursePartDescription {
    name: "Fundamentals";
}
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}
interface CoursePartThree extends CoursePartDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartDescription {
    name: "Last Part";
}
type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface HeaderProps {
    courseName: string;
}

const Header: React.FC<HeaderProps> = (props) => (
    <h1>{props.courseName}</h1>
);

interface PartProps {
    coursePart: CoursePart;
}

const Part: React.FC<PartProps> = (props) => {
    const assertNever = (ohnono: never): never => {
        throw new Error(`Unhandled union type member: ${JSON.stringify(ohnono)}`)
    }
    switch (props.coursePart.name) {
        case "Fundamentals":
            return (
                <>
                    <h3>{props.coursePart.name}</h3>
                    <p><em>{props.coursePart.description}</em></p>
                    <p>Exercises: {props.coursePart.exerciseCount}</p>
                </>
            );
        case "Using props to pass data":
            return (
                <>
                    <h3>{props.coursePart.name}</h3>
                    <p>Group projects: {props.coursePart.groupProjectCount}</p>
                    <p>Exercises: {props.coursePart.exerciseCount}</p>
                </>
            );
        case "Deeper type usage":
            return (
                <>
                    <h3>{props.coursePart.name}</h3>
                    <p><em>{props.coursePart.description}</em></p>
                    <p>Exercises: {props.coursePart.exerciseCount}</p>
                    <p>Submissions: {props.coursePart.exerciseSubmissionLink}</p>
                </>
            );
        case "Last Part":
            return (
                <>
                    <h3>{props.coursePart.name}</h3>
                    <p><em>{props.coursePart.description}</em></p>
                    <p>Exercises: {props.coursePart.exerciseCount}</p>
                </>
            );
        default:
            return assertNever(props.coursePart);
    }
}

interface ContentProps {
    courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => (
    <>
        {props.courseParts.map((part, index) =>
            <Part key={index} coursePart={part} />
        )}
    </>
);

const Total: React.FC<ContentProps> = (props) => (
    <p>
        {`Total number of exercises
            ${props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}.`
        }
    </p>
);

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
            name: "Last Part",
            exerciseCount: 0,
            description: "Recap and evaluation"
        }
    ];

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <hr />
            <Total courseParts={courseParts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));