import React from 'react';

import {NavigationTimeTable} from './src/Utils'

import {timeTableStore, persistor} from './src/Utils/features/'
import {Provider} from 'react-redux'

import {PersistGate} from 'redux-persist/integration/react'

export default function App() {
  return (
    <Provider store={timeTableStore}>     
        <PersistGate loading={null} persistor={persistor}>
          <NavigationTimeTable/>
        </PersistGate>
     </Provider>
  )  
}

