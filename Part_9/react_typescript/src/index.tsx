import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
    courseName: string;
}

interface CoursePart {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: CoursePart[];
}

const Header: React.FC<HeaderProps> = (props) => (
    <h1>{props.courseName}</h1>
);

const Content: React.FC<ContentProps> = (props) => (
    <>
        {props.courseParts.map((part, index) => 
            <p key={index}>{part.name} {part.exerciseCount}</p>
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
    const courseParts = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ];

    return (
        <div>
            <Header courseName={courseName}/>
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));