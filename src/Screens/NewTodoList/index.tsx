import React from 'react'

import { Alert, View, BackHandler } from 'react-native'

import { TextInput, Subheading, Button } from 'react-native-paper'

import { addTodolist } from '../../Utils/features/timeTable/timeTableSlice'

import {useDispatch,     
        useEffect,  
        useState} from '../../CommonLib'
import { checkTodolist } from '../../Utils'
import { styles } from './style'

const NewTodoList = (props: {navigation: any}) => {
    const dispatch = useDispatch()
    const {navigation} = props

    const [item, setItem] = useState('')
    const [hasChange, onChange]  = useState(false)

    useEffect(() => {
        if(!(item === ''))
            onChange(true)
        else
            onChange(false)
    },[item])


    function addingNewTodolist() {
        const error = checkTodolist({todolist: item})

        if(!error){
            Alert.alert('TodoList','Successfully Added')

            dispatch(addTodolist(item))
            navigation.pop(1)
        }
        else
            Alert.alert('Error', error)        
    }

    function cancelChanges() {
        if(hasChange){
            Alert.alert(
              'TodoList',
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

    const newTodoListBackHandler = () => {    
        if(hasChange){
            Alert.alert(
              'TodoList',
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
        BackHandler.addEventListener('hardwareBackPress', newTodoListBackHandler)

      return () => 
          BackHandler.removeEventListener('hardwareBackPress', newTodoListBackHandler)
    },[hasChange])

    return (
        <View style={styles.container}>
            <Subheading>New Todolist</Subheading>
            <TextInput
                mode='outlined'
                dense
                label='Input Task here...'
                onChangeText={setItem}
            />
            <Button
                mode='contained'
                onPress={() => addingNewTodolist()}
                style={styles.createButton}
            >Add New Todolist</Button>
            <Button
                mode='outlined'
                onPress={() => cancelChanges()}
                style={styles.cancelButton}
            >Cancel</Button>
        </View>
    )
}

export default NewTodoList