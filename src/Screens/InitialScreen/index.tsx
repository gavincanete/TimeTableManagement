import React from 'react';

import {Text, Alert, BackHandler} from 'react-native'

import {useEffect,         
        useSelector,
        RootState,
        useDispatch} from '../../CommonLib'


const InitialScreen = (props: {navigation: any}) => {
    const user = useSelector((state: RootState) => state.Root.User)    

    useEffect(() => {
        // validatePersistState()
        if(user.hasRegistered)
            props.navigation.navigate('Login')
        else if(!user.hasRegistered)
            props.navigation.navigate('SignUp')
        else{
            // Nothing to do
        }            
    },[])    

    return (
        <Text>Loading...</Text>
    )
}

export default InitialScreen