import React, { useEffect } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

/**
 * ACTIONS TYPES
 */
const starWarsPeopleActions = {
    load: "FETCH_STAR_WARS_PEOPLE_LOAD",
    success: "FETCH_STAR_WARS_PEOPLE_SUCCESS",
    failure: "FETCH_STAR_WARS_PEOPLE_FAILURE"
};

/**
 * ACTIONS CREATORS
 */
function loadDataAction() {
    return {
        type: starWarsPeopleActions.load
    };
}

function loadDataSuccessAction(response) {
    return {
        type: starWarsPeopleActions.success,
        payload: response
    };
}

function loadDataFailureAction(error) {
    return {
        type: starWarsPeopleActions.failure,
        payload: error
    };
}

/**
 * REDUCER
 */
const initialState = {
    error: null,
    isLoading: false,
    data: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case starWarsPeopleActions.load:
            return { ...state, isLoading: true };
        case starWarsPeopleActions.success:
            return { ...state, isLoading: false, data: action.payload };
        case starWarsPeopleActions.error:
            return { ...state, isLoading: false, data: null, error: action.payload };
        default:
            return state;
    }
}

/**
 * SELECTORS
 */
const dataSelector = state => state.data;
const errorSelector = state => state.error;
const isLoadingSelector = state => state.isLoading;

/**
 * FETCHER
 */
async function fetchStarWarsPeople() {
    const response = await (await fetch("https://swapi.dev/api/people/", {
        headers: {
            "Content-Type": "application/json"
        }
    })).json();
    return response;
}

/**
 * COMPONENTS
 */
export function StarWarsPeople() {
    const data = useSelector(dataSelector);
    const error = useSelector(errorSelector);
    const isLoading = useSelector(isLoadingSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        async function handleFetch() {
            dispatch(loadDataAction());
            try {
                const response = await fetchStarWarsPeople();
                dispatch(loadDataSuccessAction(response));
            } catch (e) {
                dispatch(loadDataFailureAction(e));
            }
        }

        if (!data) {
            handleFetch();
        }
    }, [dispatch, data]);

    /**
     * This isn't good..
     */
    if (error) {
        return <div>error</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (data) {
        const { results } = data;
        return (
            <ul>
                {results.map(person => (
                    <li key={person.url}>{person.name}</li>
                ))}
            </ul>
        );
    }

    return null;
}

const store = createStore(reducer);
export function DataFetchingWithRedux() {
    return (
        <Provider store={store}>
            <StarWarsPeople />
        </Provider>
    );
}
