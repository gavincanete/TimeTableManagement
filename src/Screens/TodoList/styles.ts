import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginLeft: '1%',
        marginRight: '1%'
    },
    emptyText: {
        fontSize: 50, 
        marginTop: '50%', 
        height: '45%', 
        color: '#b2acbd'
    },
    todolistButton: {
        width: '20%', 
        marginLeft: '79%'
    },
    todolistText: {
        fontSize: 20
    },
    addButton: {
        position: 'absolute' ,
        margin: 16,     
        right: 0, 
        bottom: -105,
        backgroundColor: '#8d5ee6'
      },
    list: {
        marginTop:10, 
        paddingBottom: '10%', 
        height: '75%'
    },
    backButton: {
        marginTop: '10%',
        marginLeft: '1%',
        marginRight: '1%',
        borderWidth: 1,
        borderColor: '#b0ada4'
    },    
    card: {
        borderWidth: 1, 
        borderColor: '#683abd', 
        marginTop: '1%'  
    },
    removeTodolist: {
        marginLeft: '90%', 
        marginTop: -38
    }
})