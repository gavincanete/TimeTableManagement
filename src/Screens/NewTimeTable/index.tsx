import React from 'react';
import {View, Alert, BackHandler} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {useState, 
    RootState,
    useDispatch,
    useEffect,
    useSelector} from '../../CommonLib'

import {addTimeTable, 
    updateKey, 
    TimeTableProperties,
    getCerainTable,
    Checks,
    computeTodolist} from '../../Utils/features/timeTable/timeTableSlice'

import {showStartTime,
    hideStartTime,
    showEndTime,
    hideEndTime,
    setEndTime,
    setStartTime} from '../../Utils/features/timePicker/timePickerSlice'

import { TextInput, Button, Subheading } from 'react-native-paper';

import {checkTimeTable} from '../../Utils';

import { styles } from './styles';


// TODO: add actions for adding new time table using dispatch

const NewTimeTable = (props: any) => {
  const {navigation} = props

  const timeTableContext = useSelector((state: RootState) => state.Root.TimeTable)
  const timePickerContext = useSelector((state: RootState) => state.Root.TimePicker)
  const dispatch = useDispatch()

  const [subject, updateSubject] = useState('')
  const [hasChange, onChange] = useState(false)

  useEffect(() => {
    const {startTime, endTime} = timePickerContext
    if(!(subject === '' && startTime === 'Start Time' && endTime === 'End Time'))
      onChange(true)
    else
      onChange(false)
  },[subject, timePickerContext])

  // TODO: Create a stylesheet
  
  // START TIME FUNCTION
  function handleStartTimePicker(timezone: Date) {            
    dispatch(setStartTime(timezone.toString()))
  }    

  function handleEndTimePicker(timezone: Date) {
    dispatch(setEndTime(timezone.toString()))        
  }

  function createTimeTable() {
    const {startTime, endTime} = timePickerContext

    const timeTable: TimeTableProperties<Checks> = {      
      key: timeTableContext.key.toString(),
      subject: subject,
      startTime: startTime,
      endTime: endTime,
      day: timeTableContext.day,      
      todolistPercentage: 'Empty',
      todolist: []
    }

    const error = checkTimeTable({timeTable})
    
    if(!error){      
      Alert.alert("Time Table","Successfully Created")      

      dispatch(addTimeTable(timeTable))
      dispatch(getCerainTable(timeTableContext.day))
      dispatch(updateKey())
      dispatch(computeTodolist(timeTableContext.day))

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

  const newTimeTableBackHandler = () => {    
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
      BackHandler.addEventListener('hardwareBackPress', newTimeTableBackHandler)

      return () => 
          BackHandler.removeEventListener('hardwareBackPress', newTimeTableBackHandler)
  },[hasChange])

  return (
    <View style={styles.container}>
      <Subheading>Time Table Information</Subheading>      
      <TextInput 
        mode="outlined"
        dense
        label="Subject"
        onChangeText={updateSubject}
      />     

      <TextInput                     
        mode="outlined"
        dense
        disabled        
        label="Start Time"
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
        label="End Time"                
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
        onPress={() => createTimeTable()}
        style={styles.createButton}
      >Create</Button>

      <Button
        mode='outlined'
        onPress={() => cancelChanges()}
        style={styles.cancelButton}
      >Cancel</Button>
    </View>        
  )
}

export default NewTimeTable;