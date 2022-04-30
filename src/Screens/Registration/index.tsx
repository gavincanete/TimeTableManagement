import React from 'react';

import {Alert, View, BackHandler} from 'react-native'

import { TextInput, 
         Title, 
         Subheading,
         Button,
         useTheme  } from 'react-native-paper'

import {useState,
        useSelector,
        RootState,
        useDispatch,
        useEffect} from '../../CommonLib'

import {IUser, storeCredential} from '../../Utils/features/user/userSlice'      

import { checkUser } from '../../Utils/Validator';

import {styles} from './styles'

const Registration = (props: {navigation: any}) => {
  const user = useSelector((state: RootState) => state.Root.User)  
  const dispatch = useDispatch() 

  const {navigation} = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const backHandler = () => {
    if(navigation.getState().routes.length < 3){
      Alert.alert(
        'Time Table Manager',
        'Do you want to exit?',
        [
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp()            
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
      BackHandler.addEventListener('hardwareBackPress', backHandler)

      return () => 
          BackHandler.removeEventListener('hardwareBackPress', backHandler)

  },[])

  function accessLogin() {
    const tempUser:IUser = {
      'username': username,
      'password': password,
      'confirmedPassword': confirmPassword,
    }
    
    const error = checkUser({user:tempUser, status: 'registration'})

    if(!error){
      dispatch(storeCredential(tempUser))
      Alert.alert('User', 'Successfully Registered'!)      
      navigation.navigate('Login')
    }
    else
      Alert.alert('Error', error)
  }

  return (
    <View>
      <View style={styles.titlePosition}>
          <Title style={styles.title}>Time Table Manager</Title>
        </View>
      <View style={styles.container}>            
        <Subheading>Sign Up</Subheading>
        <TextInput
          mode="outlined"
          dense
          label="Username"
          onChangeText={setUsername}
        />
        <TextInput
          mode="outlined"
          dense
          label="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TextInput
          mode="outlined"
          dense
          label="Confirm Password"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />      
        <Button
          mode='contained'        
          style={styles.registration}
          onPress={() => accessLogin()}
        >Register</Button>
      </View>    
    </View>
  )
}

export default Registration