import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  list: {
    marginTop:10, 
    paddingBottom: '10%', 
    height: '75%'
  },
  card: {
    marginBottom:'3%', 
    borderColor: '#683abd', 
    borderWidth: 2,    
  },
  title: {
    color: 'red',
    marginLeft: '1%',    
    marginRight: '25%',    
    marginTop: -45,
  },
  removeTableButton: {
    marginTop: -10,
    marginLeft: '1%',
    width: '10%',

    // borderWidth: 1,
    // borderColor: 'blue'
  },  
  editTableButton: {
    marginTop: -10, 
    marginLeft: '79%', 
    width: '10%',

    // borderWidth: 1, 
    // borderColor: 'red'
  },
  emptyText: {
    fontSize: 50, 
    marginTop: '50%', 
    height: '45%', 
    color: '#b2acbd'
  },
  addButton: {
    position: 'absolute' ,
    margin: 16,     
    right: 0, 
    bottom: -105,
    backgroundColor: '#8d5ee6'
  },
  addText: {
    fontSize: 20
  },
  backButton: {
    marginTop: '10%',
    marginLeft: '1%',
    marginRight: '1%',
    borderWidth: 1,
    borderColor: '#b0ada4'
  },
  container: {
      marginLeft: '1%',
      marginRight: '1%'
  },
  todolistButton: {
    marginLeft: '55%',    
    backgroundColor: '#8d5ee6',
    marginTop: -65,
    width: '38%'
    // color: 'red'
    
    // borderWidth: 1,
    // borderColor: 'gray'
  },
  todolistPercentage: {
    marginLeft: '1%', 
    marginTop: '2%',
    fontSize: 18
  },
  scheduleText: {
    fontSize: 20, 
    marginTop: '10%', 
    marginLeft: '1%',    
  },
})