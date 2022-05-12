export const autoIncrement = (props: any): string => {
  const {key} = props  
  
  let newKey: string = ''
  let hasChange: boolean = false

  // Incremeent Function
  for(let i = (key.length-1); i >= 0; i--){
    // console.log(key.charCodeAt(i))

    if(key.charCodeAt(i) == 57){         
      // console.log(key.charAt(i))
      
      newKey += key.charCodeAt(i)*0

      if((i-1) < 0)
        newKey += '1'
      else if(key.charCodeAt(i) < 57){
        newKey += String.fromCharCode(key.charCodeAt(i-1)+1)
      }        
    }
    else if(hasChange){
      newKey += key[i]
    }
    else{
      // Increment by one
      // console.log(key.charCodeAt(i))
      newKey += String.fromCharCode((key.charCodeAt(i)+1))
      hasChange = true
    }
  }  

  let temp: string = '' 
  // Reverse the number
  for(let i = newKey.length-1; i >= 0; i--){
    temp += newKey[i]
  }  
  newKey = temp

  return newKey
//   console.log('New Key', newKey)
}

