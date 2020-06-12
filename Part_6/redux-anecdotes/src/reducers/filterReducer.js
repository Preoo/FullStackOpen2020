const filter_reducer = (state = '', action) => {
    switch (action.type) {
        case 'MOD_FILTER':
            return action.filter
        default: return state
    }
}

export const filter_change = (filter_value) => {
    return {
        type: 'MOD_FILTER',
        filter: filter_value
    }
}

export default filter_reducer