import React from 'react'
import { useDispatch } from 'react-redux'
import { filter_change } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const modify_filter = value => {
        dispatch(filter_change(value))
    }

    return (
        <section>
            <p>
                filter anecdotes
                <input
                    name='filter'
                    type='text'
                    onChange={(event) => modify_filter(event.target.value)}
                />
            </p>
        </section>
    )
}

export default Filter