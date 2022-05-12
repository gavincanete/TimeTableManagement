import React, { useEffect } from 'react';
import { Text, View, FlatList, BackHandler } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Button, Card, FAB } from 'react-native-paper';

import { Checks, computeTodolist, deleteTodolist, getCerainTable } from '../../Utils/features/timeTable/timeTableSlice';

import {useSelector,
        useDispatch,
        RootState} from '../../CommonLib'

import { updateTodolistStatus } from '../../Utils/features/timeTable/timeTableSlice';
import { styles } from './styles';

const TodoList = (props: any) => {
    const {navigation} = props

    const todoList = useSelector((state: RootState) => state.Root.TimeTable.timeTable.todolist ?? [])
    const day:string = useSelector((state: RootState) => state.Root.TimeTable.day)    
    
    const dispatch = useDispatch()
    
    // ! For Debugging the Todolist items 
    // console.log('Todolist',todoList)

    const todolistBackHandler = () => {
        dispatch(computeTodolist(day))
        dispatch(getCerainTable(day))
        
        navigation.pop(1)
        return true
    }
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', todolistBackHandler)

        return () => 
            BackHandler.removeEventListener('hardwareBackPress', todolistBackHandler)
    },[])

    const renderTodolist = (props: {item: Checks}) => {
        const {item} = props
        
        return (
            <View key={item.id}>
                <Card style={styles.card}>
                    {/* Checkbox item */}
                    <CheckBox
                        checked={item.status}
                        title={item.task}
                        onPress={() => dispatch(updateTodolistStatus(item.id)) && dispatch(computeTodolist(day))}                        
                    />              
                    {/* Delete Button */}
                    <Button
                        icon='trash-can-outline'
                        onPress={() => dispatch(deleteTodolist(item.id)) && dispatch(computeTodolist(day))}
                        style={styles.removeTodolist}
                    > </Button>                           
                </Card>
            </View>
        )
    }    

    return (             
        <View style={styles.container}>
           {
               todoList.length == 0? (
                <Text style={styles.emptyText}>No Task Created</Text>
               ): (
                // List of Timetable Todolist
                <FlatList                                
                    data={todoList}
                    renderItem={renderTodolist}
                    style={styles.list}
                />
               )
           }            
            <FAB
                icon='plus'
                onPress={() => navigation.navigate('NewTodoList')}                
                style={styles.addButton}
            />            
        </View>
    )    
}

export default TodoList
