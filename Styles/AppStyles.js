import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    taskContainer:{
        backgroundColor:'#e5e5e5',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius : 15,
        margin: 5,
        marginHorizontal : 15,
        flexDirection: 'row' ,
        alignItems: 'center'
    },
    taskInnerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:5,
        flex:1,
        alignItems: 'flex-start' // Align the heading to the left
    },
    taskNameText:{
        fontWeight:'bold',
        fontSize:18
    },
    taskInputContainer:{
        flexDirection:'row',
        height:75,
        marginHorizontal:15,
        marginTop:15,
        marginBottom:0
    },
    taskInputText:{
        height: 48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    addTaskButton: {
        height:47,
        borderRadius:5,
        backgroundColor:'#788eec',
        width:80,
        alignItems:'center',
        justifyContent:'center'
    },
    addTaskButtonText: {
        color:'white',
        fontSize:20
    },
    deleteTaskButton: {
        height:47,
        backgroundColor:'transparent',
        width:60,
        alignItems:'center',
        justifyContent:'center'
    },
    deleteTaskIcon: {
        fontSize:20
    },
    container: {
        flex: 1
    },
    innerContainer: {
        flexGrow: 1,
    },
    taskNameContainerDesc: {
        marginTop:10,
        marginLeft:15,
        marginRight:15
    },
    taskNameInputDesc: {
        paddingLeft:10,
        paddingTop:10,
        fontSize:20,
        color:'#000000',
        backgroundColor:'transparent'
    },
    taskDecriptionContainer: {
        marginTop:15,
        marginLeft:15,
        marginRight:15
    },
    taskDescriptionInput: {
        padding:10,
        fontSize:16,
        color:'#000000',
        backgroundColor:'#e0e0e0',
        borderRadius:5
    }
});