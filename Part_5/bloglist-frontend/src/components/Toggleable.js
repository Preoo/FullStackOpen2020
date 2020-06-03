import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {
    const [visible, setVisibility] = useState(false)
    const folded = { display: visible ? 'none' : '' }
    const unfolded = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisibility(!visible)

    // has to return a object
    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={folded}>
                <button onClick={toggleVisibility} >{props.buttonLabel}</button>
            </div>
            <div style={unfolded}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Toggleable.displayName = 'Togglable'

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggleable