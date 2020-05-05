import React, { Suspense } from "react";
import useSWR from "swr";

const fetcher = url => fetch(url).then(r => r.json());
export function StarWarsPeopleList() {
    const { data, error } = useSWR("https://swapi.dev/api/people/", fetcher, {
        suspense: true
    });
    const results = data?.results;
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

export function DataFetchingWithSWR() {
    return <StarWarsPeople />;
}
