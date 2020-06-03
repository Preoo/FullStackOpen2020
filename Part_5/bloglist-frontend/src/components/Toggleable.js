import React, {useState} from 'react'

const Toggleable = props => {
    const [visible, setVisibility] = useState(false)
    const folded = {display: visible ? 'none' : ''}
    const unfolded = {display: visible ? '' : 'none'}

    const toggleVisibility = () => setVisibility(!visible)

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
}

export default Toggleable