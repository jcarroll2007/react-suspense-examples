import React, { Suspense } from "react";

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

let cache = {
    data: null,
    error: null
};
function useStarWarsPeople(force) {
    if (cache.data || cache.error) return cache;
    else {
        throw fetchStarWarsPeople()
            .then(response => {
                cache.data = response;
            })
            .catch(error => {
                cache.error = error;
            });
    }
}

export function StarWarsPeopleList() {
    const response = useStarWarsPeople();
    const results = response.data?.results;
    const error = response.error;

    if (error) {
        return <div>error: {error}</div>;
    }
    return (
        <ul>
            {results.map(person => (
                <li key={person.url}>{person.name}</li>
            ))}
        </ul>
    );
}

export function StarWarsPeople() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <StarWarsPeopleList />
        </Suspense>
    );
}

export function DataFetchingWithSuspense() {
    return <StarWarsPeople />;
}
