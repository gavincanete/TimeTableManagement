// TODO: Create Time Table Validator
// TODO: Create User Validator

export const checkTimeTable = (props: any) => {    
    const {timeTable} = props
    const {subject, 
           startTime,
           endTime} = timeTable

    console.log(timeTable)

    if(subject === ''){
        return 'Missing Subject Field'
    }        
    else if(startTime === 'Start Time'){
        return 'Missing Start Time Field'
    }        
    else if(endTime === 'End Time')
        return 'Missing End Time Field'
}

export const checkUser = (props: any) => {    
    const {status, user} = props    

    if(status === 'registration'){
        const {username, password, confirmedPassword} = user

        if(username === '')
            return 'Username is Empty'
        else if(password === '')
            return 'Password is empty'
        else if(confirmedPassword === '')
            return 'ConfirmPassword is empty'
        else if(password !== confirmedPassword)
            return 'Password mismatch'
    }
    else if(status === 'login'){    
        const {username, password} = user
        const {storedUser} = props

        if(username === '')
            return 'Username is Empty'
        else if(password === '')
            return 'Password is empty'
        else if(username !== storedUser.username)
            return 'Username Mismatch'
        else if(password !== storedUser.password)
            return 'Password Mismatch'
    }
}