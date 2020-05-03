import React, { useState } from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) return <div>An error happened!</div>;
        return this.props.children;
    }
}

export function ComponentThatThrowsError() {
    throw new Error('Computron does not understand.')
    return <div>Never gets here.</div>
}

export function ErrorExample() {
    const [showErrorComponent, setShowErrorComponent] = useState(false)
    return (
        <ErrorBoundary>
            <button onClick={() => setShowErrorComponent(true)}>Show Error Thrower</button>
            {showErrorComponent && <ComponentThatThrowsError />}
        </ErrorBoundary>
    );
}
