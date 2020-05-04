import React, { useState } from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: null };
    }

    // 3) The Error boundary catches an error and manages state to show
    // to render something helpful to the user when the error happens.
    componentDidCatch(error, info) {
        this.setState({ hasError: true, errorMessage: error.toString() });
    }

    render() {
        // 4) The error boundary renders whatever it needs to to give the user
        // contextual information on what's going on.
        if (this.state.hasError) return <div>An error happened: {this.state.errorMessage}</div>;
        return this.props.children;
    }
}

export function ComponentThatThrowsError() {
    // 2) When the button is clicked and this component is rendered, throw a new Error
    throw new Error('Computron does not understand.')
    return <div>Never gets here.</div>
}

export function ErrorExample() {
    const [showErrorComponent, setShowErrorComponent] = useState(false)
    // 1) Render our Error Boundary and the code that manages showing our component
    // that will throw an error when rendered.
    return (
        <ErrorBoundary>
            <button onClick={() => setShowErrorComponent(true)}>Show Error Thrower</button>
            {showErrorComponent && <ComponentThatThrowsError />}
        </ErrorBoundary>
    );
}
