import React, { useState, Suspense } from "react"

function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

let flip = false
export function ComponentThatThrowsPromise() {
    if (!flip) {
        flip = true
        throw delay(3000)
    }
    return <div>Loaded.</div>
}

export function PromiseExample() {
    const [showErrorComponent, setShowErrorComponent] = useState(false)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <button onClick={() => setShowErrorComponent(true)}>Show Promise Thrower</button>
            {showErrorComponent && <ComponentThatThrowsPromise />}
        </Suspense>
    );
}
