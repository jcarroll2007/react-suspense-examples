import React, { useState, Suspense } from "react"


export class PromiseBoundary extends React.Component {
    state = {
        resolving: false
    }

    componentDidCatch(maybePromise) {
        if (maybePromise instanceof Promise) {
            // We caught a promise!
            this.setState({ resolving: true });
            maybePromise.then(() => this.setState({ resolving: false }))
        }
    }

    render() {
        const { resolving } = this.state
        const { fallback, children } = this.props

        if (resolving) return fallback;
        return children;
    }
}


let flip = false
export function ComponentThatThrowsPromise() {
    if (!flip) {
        flip = true
        throw new Promise(function (resolve) {
            setTimeout(resolve.bind(null), 3000)
        });
    }
    return <div>Loaded.</div>
}

export function PromiseExample() {
    const [showErrorComponent, setShowErrorComponent] = useState(false)
    return (
        <Suspense fallback={<div>Loading</div>}>
            <button onClick={() => setShowErrorComponent(true)}>Show Promise Thrower</button>
            {showErrorComponent && <ComponentThatThrowsPromise />}
        </Suspense>
    );
}
