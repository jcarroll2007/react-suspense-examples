import React, { useState } from 'react';
import { ErrorExample } from './ErrorCatching'
import { PromiseExample } from './PromiseCatching'
import { DataFetchingWithRedux } from './DataFetchingWithRedux'
import { DataFetchingWithSuspense } from './DataFetchingWithSuspense'
import { DataFetchingWithSWR } from './DataFetchingWithSWR'

function App() {
  return (
    <>
      <PromiseExample />
      {/* <ErrorExample /> */}
      {/* <DataFetchingWithRedux /> */}
      {/* <DataFetchingWithSuspense /> */}
      {/* <DataFetchingWithSWR /> */}
    </>
  );
}

export default App;
