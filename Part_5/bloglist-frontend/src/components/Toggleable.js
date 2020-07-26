import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { ButtonOK, ButtonCancel } from './CommonStyled'

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
                <ButtonOK onClick={toggleVisibility} >{props.buttonLabel}</ButtonOK>
            </div>
            <div style={unfolded}>
                <ButtonCancel onClick={toggleVisibility}>cancel</ButtonCancel>
                {props.children}
            </div>
        </div>
    )
})

Toggleable.displayName = 'Togglable'

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggleable