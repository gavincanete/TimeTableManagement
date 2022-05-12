import React from 'react';

import {NavigationTimeTable} from './src/Utils'

import {timeTableStore, persistor} from './src/Utils/features/'
import {Provider} from 'react-redux'

import {PersistGate} from 'redux-persist/integration/react'

import { Text, Card } from 'react-native-paper';
import { View } from 'react-native';

import { NewTodoList } from './src/Screens';

import { autoIncrement } from './src/Utils/Computations';

export default function App() {
  return (
    <Provider store={timeTableStore}>     
        <PersistGate loading={null} persistor={persistor}>
          <NavigationTimeTable/>
        </PersistGate>
     </Provider>
  )  

  // return (
  //   <AnyFunction/>
  // )
}

