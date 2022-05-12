import React from 'react';
import {View, FlatList, Text, Alert} from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import {useSelector,
        useDispatch,
        RootState} from '../../CommonLib'

import {deleteCertainTable, getSelectedTable} from '../../Utils/features/timeTable/timeTableSlice'
import { clearTime } from '../../Utils/features/timePicker/timePickerSlice';
import { styles } from './styles';
import { TodoLisStatus } from './default';
    
import { FAB } from 'react-native-paper';

const TimeTableList = (props:any) => {    
    const {navigation} = props

    const timeTableList = useSelector((state: RootState) => state.Root.TimeTable.filters)
    const dispatch = useDispatch()   

    //! For Debugging Timetable Key
    // const temp = useSelector((state: RootState) => state.Root.TimeTable.key)
    // console.log('TimeTable Curr Key', temp)
    
    function accessEditTimeTable(key: string) {        
        dispatch(getSelectedTable(key))
        navigation.navigate('EditTimeTable')
    }

    function accessNewTimeTable() {
        dispatch(clearTime())
        navigation.navigate('NewTimeTable')        
    }

    function accessTodolist(key: string) {
        dispatch(getSelectedTable(key))
        navigation.navigate('TodoList')
    }

    function deleteTimeTable(key: string, subject: string){
        Alert.alert(
            'Delete', 
            `Do you you want to delete ${subject} schedule?`,
            [
                {
                    text: 'Yes',
                    onPress: () => confirmDeletion(key)
                },
                {
                    text: 'No'
                }
            ]
        )
    }

    function confirmDeletion(key: string){ 
        dispatch(deleteCertainTable(key))
        alert('Successfully Removed!')
    }

    const renderTimeTable = (props: {item: any}) => {
        const item = props.item
        
        return (
            <View key={item.key} >
                <Card 
                    style={styles.card}
                >                    
                    <Card.Actions>
                        <Button 
                            icon='pencil-outline'
                            style={styles.editTableButton} 
                            onPress={() => accessEditTimeTable(item.key)}
                            labelStyle={{color:'#683abd'}}
                        > </Button>
                        <Button 
                            icon='trash-can-outline'
                            style={styles.removeTableButton} 
                            onPress={() => deleteTimeTable(item.key, item.subject)}
                            labelStyle={{color:'#683abd'}}
                        > </Button>                            
                    </Card.Actions>
                        <Title style={styles.title}>{item.subject}</Title>                                        
                        <Paragraph style={styles.scheduleText}>{item.startTime} - {item.endTime}</Paragraph>
                    {                                                
                        item.todolistPercentage === '0%'? (                            
                            <Paragraph style={[styles.todolistPercentage, {color: 'blue'}]}>{TodoLisStatus.not_started}</Paragraph>
                        ): item.todolistPercentage === '100%'? (
                            <Paragraph style={[styles.todolistPercentage, {color: 'green'}]}>{TodoLisStatus.completed}</Paragraph>                            
                        ): item.todolistPercentage === 'Empty'? (
                            <Paragraph> </Paragraph>
                        ): (
                            <Paragraph style={[styles.todolistPercentage, {color: 'orange'}]}>{TodoLisStatus.in_progress}: {item.todolistPercentage}</Paragraph>                            
                        )
                        // console.log('Percentage',item.todolistPercentage)
                    }
                    
                    <Card.Actions>
                        <Button 
                            style={styles.todolistButton}
                            // TODO: create a function that display the available todo list
                            onPress={() => accessTodolist(item.key)}
                            labelStyle={{color: 'white'}}
                        >View Todolist</Button>
                    </Card.Actions>
                </Card>
            </View>            
        )
    }

    return (
        <View style={styles.container}>   
            {
                timeTableList.length == 0? (
                    <Text style={styles.emptyText}>No Timetable Created</Text>
                ): (
                    <FlatList                
                        style={styles.list}
                        data={timeTableList}
                        renderItem={renderTimeTable}
                    />     
                )
            }
            <FAB
                icon='plus'
                onPress={() => accessNewTimeTable()}                
                style={styles.addButton}
            />
        </View>
    )
} 

export default TimeTableList