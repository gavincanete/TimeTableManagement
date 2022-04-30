import React from 'react';
import {View, FlatList, Text, Alert} from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import {useSelector,
        useDispatch,
        RootState} from '../../CommonLib'

import {deleteCertainTable, getSelectedTable} from '../../Utils/features/timeTable/timeTableSlice'
import { clearTime } from '../../Utils/features/timePicker/timePickerSlice';
import { styles } from './styles';
    


const TimeTableList = (props:any) => {    
    const {navigation} = props

    const timeTableList = useSelector((state: RootState) => state.Root.TimeTable.filters)
    const dispatch = useDispatch()   
    
    function accessEditTimeTable(key: string) {        
        dispatch(getSelectedTable(key))
        navigation.navigate('EditTimeTable')
    }

    function accessNewTimeTable() {
        dispatch(clearTime())
        navigation.navigate('NewTimeTable')        
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
                {
                    console.log(item)
                }
                <Card style={styles.card}>
                    <Title style={styles.title}>{item.subject}</Title>
                    <Card.Actions>
                        <Button 
                            style={styles.removeTableButton} 
                            onPress={() => deleteTimeTable(item.key, item.subject)}
                        >Delete</Button>
                        <Button 
                            style={styles.editTableButton} 
                            onPress={() => accessEditTimeTable(item.key)}
                        >Edit</Button>
                    </Card.Actions>
                    <Paragraph style={{fontSize: 20}}>{item.startTime} - {item.endTime}</Paragraph>
                </Card>
            </View>            
        )
    }

    return (
        <View style={styles.container}>
            <Button
                style={styles.addButton}
                mode='contained'
                onPress={() => accessNewTimeTable()}
            ><Text style={{fontSize: 20}}>+</Text></Button>          
           
            <FlatList                
                style={styles.list}
                data={timeTableList}
                renderItem={renderTimeTable}
            />
           
            <Button
                mode='outlined'
                style={styles.backButton}
                onPress={() => navigation.pop(1)}
            >Back</Button>
        </View>
    )
} 

export default TimeTableList