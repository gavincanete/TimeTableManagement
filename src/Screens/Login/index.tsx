import React from 'react';

import {Alert, View} from 'react-native'

import {useState,
        useSelector,
        RootState,
        useDispatch,        
        useEffect} from '../../CommonLib'

import {IUser, login} from '../../Utils/features/user/userSlice'

import { Button, TextInput, Title } from 'react-native-paper'
import { checkUser } from '../../Utils/Validator';

import {styles} from './styles'


const Login = (props: {navigation: any}) => {
  const user = useSelector((state: RootState) => state.Root.User)
  const dispatch = useDispatch()

  const {navigation} = props

  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState(user.password)

  function accessDayList() {

    const tempUser:IUser = {
      'username': username,
      'password': password,
    } 

    const error = checkUser({user: tempUser, storedUser: user, status: 'login'})

    if(!error){
      dispatch(login())
      Alert.alert('User', 'Successfully Login!')      
      navigation.navigate('DayList')
    }
    else
      Alert.alert('Error', error)
  }

  useEffect(() => {
    if(user.canLogin){      
      props.navigation.navigate('DayList')
    }      
  },[])

  return (
    <View>
      <View style={styles.titlePosition}>
      <Title style={styles.title}>Time Table Manager</Title>
      </View>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          dense
          label="Username"
          value={user.username}
          onChangeText={setUsername}
        />
        <TextInput
          mode="outlined"
          dense
          label="Password"
          value={user.password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Button
          mode='contained'
          style={styles.login}
          onPress={() => accessDayList()}
        >Login</Button>
      </View>
    </View>
  )
}

export default Login