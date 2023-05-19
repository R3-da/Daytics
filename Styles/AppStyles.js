import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius : 15,
        margin: 5,
        marginHorizontal : 15,
        flexDirection: 'row' ,
        alignItems: 'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:5,
        flex:1,
        alignItems: 'flex-start' // Align the heading to the left
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18
    },
    formContainer:{
        flexDirection:'row',
        height:75,
        marginHorizontal:15,
        marginTop:15,
        marginBottom:0
    },
    input:{
        height: 48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    button: {
        height:47,
        borderRadius:5,
        backgroundColor:'#788eec',
        width:80,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        color:'white',
        fontSize:20
    },
    deleteButton: {
        height:47,
        backgroundColor:'transparent',
        width:60,
        alignItems:'center',
        justifyContent:'center'
    },
    deleteIcon: {
        fontSize:20
    }
});