import React from 'react';

import {InitialScreen, 
        Registration, 
        Login, 
        DayList, 
        TimeTableList, 
        NewTimeTable,
        TodoList,
        EditTimeTable,
        NewTodoList} from '../../Screens'

import {useSelector, RootState} from '../../CommonLib'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const StackTimeTable = createNativeStackNavigator();

const NavigationTimeTable = () => {
    const day:string = useSelector((state: RootState) => state.Root.TimeTable.day)    
    
    return (
        <NavigationContainer>
            <StackTimeTable.Navigator screenOptions={{headerBackVisible: false}}>
                <StackTimeTable.Screen name="InitialScreen" component={InitialScreen} options={{title: ''}}/>
                <StackTimeTable.Screen name="SignUp" component={Registration} options={{title: 'Sign Up'}}/>
                <StackTimeTable.Screen name="Login" component={Login} /> 
                <StackTimeTable.Screen name="DayList" component={DayList} options={{title: 'Day List'}} />
                <StackTimeTable.Screen name="TimeTableList" component={TimeTableList} options={{title: `${day}`}}/>
                <StackTimeTable.Screen name="NewTimeTable" component={NewTimeTable} options={{title: 'New Time Table'}}/>               
                <StackTimeTable.Screen name="EditTimeTable" component={EditTimeTable}  options={{title: 'Edit Time Table'}}/>
                <StackTimeTable.Screen name="TodoList" component={TodoList}  options={{title: `${day} TodoList`}}/>
                <StackTimeTable.Screen name="NewTodoList" component={NewTodoList}  options={{title: 'New TodoList'}}/>
            </StackTimeTable.Navigator>
        </NavigationContainer>
    )
}

export default NavigationTimeTable
