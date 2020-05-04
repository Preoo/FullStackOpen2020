import React from 'react';

// Types
type PartElement = {
    name: string,
    exercises: number,
    id: number,
}
type CourseData = {
    id: number,
    name: string,
    parts: PartElement[],
}

// Components
const Header = ({ name }: CourseData) => (
    <h1>{name}</h1>
)

const Content = ({ parts }: CourseData) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} id={part.id} />
            )}
        </div>
    )
}

const Part = ({ name, exercises, id }: PartElement) => (
    <p>{name} {exercises}</p>
)

const Total = ({ parts }: CourseData) => {
    const total: number = parts.reduce((t, part) => t += part.exercises, 0)
    return (
        <p>Total of {total} exercises.</p>
    )
}

type CourseList = CourseData | CourseData[]
const Courses = (props: any) => {
    const courses = props.courses as CourseList
    if (!Array.isArray(courses)) {
        return (
            <div>
                <Header {...courses} />
                <Content {...courses} />
                <Total {...courses} />
            </div>
        )
    }

    return (
        <div>
            {courses.map(c =>
                <div key={c.id}>
                    <Header {...c} />
                    <Content {...c} />
                    <Total {...c} />
                </div>
            )
            }
        </div>
    )
}

export default Courses