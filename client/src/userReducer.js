const ACTIONS = {
    LOGIN: "updateUser",
    CLEAR: "clearData"
};

const Reducer = {
    reducer: (state, action) => {
        switch (action.type) {
            case ACTIONS.LOGIN:
                return action.payload;
            case ACTIONS.CLEAR:
                return {};
            default:
                return state;
        }
    },
    ACTIONS
};

export default Reducer;