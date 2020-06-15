/**
 * Connected version of components to practise legacy methods.
*/
import React from 'react'
import { connect } from 'react-redux'
import { filter_change } from '../reducers/filterReducer'

const ConnectedFilter = (props) => {
    // const dispatch = useDispatch()
    const modify_filter = value => {
        // dispatch(filter_change(value))
        props.filter_change(value)
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

const mapDispatchToProps = {
    filter_change
}

export default connect(null, mapDispatchToProps)(ConnectedFilter)