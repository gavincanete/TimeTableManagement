import React from 'react';
import {View, Alert, BackHandler} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";


import {useState,
        useSelector,
        useDispatch,
        RootState,
        useMemo,
        useEffect} from '../../CommonLib'

import {updateTimeTable, 
        getCerainTable,
        TimeTableProperties} from '../../Utils/features/timeTable/timeTableSlice'


import { setStartTime,
         showStartTime,
         hideStartTime,
         showEndTime,
         setHistory,
         hideEndTime,
         setEndTime, 
         } from '../../Utils/features/timePicker/timePickerSlice';

import { TextInput, Button, Subheading } from 'react-native-paper';

import { checkTimeTable } from '../../Utils/Validator';
import { has } from 'immer/dist/internal';

import { styles } from '../NewTimeTable/styles';

const EditTimeTable = (props: any) => {
    const {navigation} = props

    const timeTableContext = useSelector((state: RootState) => state.Root.TimeTable)
    const timePickerContext = useSelector((state: RootState) => state.Root.TimePicker)
    const dispatch = useDispatch()    

    const [subject, updateSubject] = useState(timeTableContext.timeTable.subject)
    const [hasChange, onChange] = useState(false)        

    function handleStartTimePicker(timezone: Date) {        
        dispatch(setStartTime(timezone.toString()))
    }    

    function handleEndTimePicker(timezone: any) {        
        dispatch(setEndTime(timezone.toString()))
    }    

    useEffect(() => {        
        const timezoneStartTime: any = 'Tue Apr 12 2022 '+(timeTableContext.timeTable?.startTime?.slice(0,-2))+' GMT+0800 (CST)'
        const timezoneEndTime: any = 'Tue Apr 12 2022 '+(timeTableContext?.timeTable?.endTime?.slice(0,-2))+' GMT+0800 (CST)'

        dispatch(setStartTime(timezoneStartTime))
        dispatch(setEndTime(timezoneEndTime))        
        dispatch(setHistory())
    },[])    

    useEffect(() => {        
        const {startTime, endTime, history} = timePickerContext   

        if(!(startTime === history?.prevStartTime && endTime === history?.prevEndTime))
            onChange(true)
        else
            onChange(false)
    },[timePickerContext])

    function editTimeTable() {     
        const {startTime, endTime} = timePickerContext        

        const timeTable: TimeTableProperties = {
            key: timeTableContext.timeTable.key,
            subject: subject,
            startTime: startTime,
            endTime: endTime,
            day: timeTableContext.day,
        }

        const error = checkTimeTable({timeTable})        

        
        if(!hasChange)
            Alert.alert('Time Table', 'No changes have made')
        else if(!error){
            Alert.alert("Time Table",'Successfully Updated')

            dispatch(updateTimeTable(timeTable))
            dispatch(getCerainTable(timeTableContext.day))

            navigation.pop(1)
        }
        else
            Alert.alert('Error', error)
    }   

    function cancelChanges() {
        if(hasChange){
          Alert.alert(
            'Time Table',
            'You have unsaved changes. Do you want to cancel?',
            [
              {
                text: 'Yes',
                onPress: () => navigation.pop(1),          
              },
              {
                text: 'No'
              }
            ]
          )
        }
        else
          navigation.pop(1)
      }

      const editTimeTableBackHandler = () => {    
        if(hasChange){
            Alert.alert(
              'Time Table',
              'You have unsaved changes. Do you want to cancel?',
              [
                {
                  text: 'Yes',
                  onPress: () => navigation.pop(1),
                },
                {
                  text: 'No',
                  onPress: () => null
                }
              ]
            )
        }
        else
          navigation.pop(1)
        return true
      }
      
      useEffect(() => {
          BackHandler.addEventListener('hardwareBackPress', editTimeTableBackHandler)
    
          return () => 
              BackHandler.removeEventListener('hardwareBackPress', editTimeTableBackHandler)
      },[hasChange])

    return (
        <View style={styles.container}>
            <Subheading>Time Table Information</Subheading>            
            <TextInput 
                mode='outlined'
                dense
                disabled
                label='Subject'
                value={timeTableContext.timeTable.subject}                                
                onChangeText={updateSubject}                
            />

            <TextInput 
                mode="outlined"
                dense
                disabled
                label='Start Time'
                value={timePickerContext.startTime}                
                editable={false}
                style={styles.fieldStartTime}
            />
            <Button                
                onPress={() => dispatch(showStartTime())}
                style={styles.calendarStartTime}
                labelStyle={{fontSize: 25}}
            > </Button>

            <DateTimePickerModal
                isVisible={timePickerContext.enableStartTime}
                mode="time"                
                onConfirm={handleStartTimePicker}
                onCancel={() => dispatch(hideStartTime())}
            />

            <TextInput 
                mode="outlined"
                dense
                disabled
                label='End Time'
                value={timePickerContext.endTime}
                editable={false}
                style={styles.fieldEndTime}
            />
            <Button
                onPress={() => dispatch(showEndTime())}
                style={styles.calendarEndTime}        
                labelStyle={{fontSize: 25}}
            > </Button>            

            <DateTimePickerModal
                isVisible={timePickerContext.enableEndTime}
                mode="time"                
                onConfirm={handleEndTimePicker}
                onCancel={() => dispatch(hideEndTime())}
            />

            <Button
                mode='contained'
                onPress={() => editTimeTable()}
                style={styles.createButton}
            >Update</Button>

            <Button
                mode='outlined'
                onPress={() => cancelChanges()}
                style={styles.cancelButton}
            >Cancel</Button>
        </View>        
    )
}

export default EditTimeTable;