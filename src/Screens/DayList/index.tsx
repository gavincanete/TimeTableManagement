import React, { useEffect } from 'react';

import {View} from 'react-native'

import {useDispatch, 
        useSelector,
        RootState} from '../../CommonLib'

import {getSamples,
        setDay,
        getCerainTable} from '../../Utils/features/timeTable/timeTableSlice'

import { logout } from '../../Utils/features/user/userSlice';

import { Button, List } from 'react-native-paper';

import { styles } from './styles';


const DAYS = [
    {'day': 'Monday', 'key': '1'},
    {'day': 'Tuesday', 'key': '2'},
    {'day': 'Wednesday', 'key': '3'},
    {'day': 'Thursday', 'key': '4'},
    {'day': 'Friday', 'key': '5'},
    {'day': 'Saturday', 'key': '6'}
]


const DayList = (props: {navigation: any}) => {    
    const timeTableList = useSelector((state: RootState) => state.Root.TimeTable.list)
    const dispatch = useDispatch()
    const navigation = props.navigation

    useEffect(() => {
        if(timeTableList.length === 0)
            dispatch(getSamples())
    },[])

    function accessTimetable(day: string){
        dispatch(getCerainTable(day))
        dispatch(setDay(day))
        navigation.navigate('TimeTableList')
    }   

    function signOut(){
        dispatch(logout())
        props.navigation.pop(1)
    }

    return (
        <View>
            <View>
                {                
                    DAYS.map((item) => {                        
                        return(
                            <View key={item.key}>
                                <List.Item title={item.day} onPress={() => accessTimetable(item.day)} style={styles.listItem}/>
                            </View>                        
                        )
                    })
                }
            </View>
            <Button
              mode='outlined'
              style={styles.logout}
              onPress={() => signOut()}
            >Logout</Button>
        </View>
    )
}

export default DayList