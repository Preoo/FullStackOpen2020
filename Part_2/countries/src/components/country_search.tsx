import React from 'react';

type CountrySearchProps = {
    value: string,
    onChange: any //called by event, unsure how to type
}
export const CountrySearch = (props: CountrySearchProps) => {
    return (
        <div>
            <h2>Filter by name</h2>
            <input value={props.value} onChange={props.onChange} />
        </div>
    )
}