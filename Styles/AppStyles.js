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
    taskNameTextDone:{
        fontWeight:'bold',
        fontSize:18,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    taskInputContainer:{
        flexDirection:'row',
        marginHorizontal:15,
        marginTop:15,
        marginBottom:5,
    },
    taskInputTextContainer: {
        backgroundColor: 'white',
        flex:1,
        flexDirection:'row',
        borderRadius:5,
        paddingRight:5,
        marginRight:5,
    },
    taskInputText:{
        height: 48,
        borderRadius:5,
        overflow:'hidden',
        paddingLeft:16,
        flex:1,
        marginRight:5,
        backgroundColor: 'white'
    },
    addDateButton: {
        height:47,
        backgroundColor:'transparent',
        width:30,
        alignItems:'center',
        justifyContent:'center'
    },
    addDateIcon: {
        fontSize:20,

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
    },
    accountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginInputContainer: {
        flexDirection:'row',
        height:75,
        marginHorizontal:50
    },
    loginInputText: {
        height: 48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingHorizontal:16,
        flex:1,
        marginRight:5,
        fontSize:15
    },
    loginButton: {
        width: '35%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signUpButton: {
        width: '35%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#788eec',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPasswordButton: {
        marginBottom: 16,
    },
    forgotPasswordButtonText: {
        fontSize: 14,
        color: '#888888',
    },
    popUpContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    popUpContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUptitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    popInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    createAccountButton: {
        backgroundColor: '#788eec',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 15,
    },
    createAccountButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    popUpCloseButton: {
        backgroundColor: 'transparent',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    signUpTitleContainer: {
        width: '100%',
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Push items to the start and end
    },
    accountScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
    },
    accountLogo: {
        opacity: 0.5,
    },
    changePasswordButton: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#788eec',
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    logOutButton: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#788eec',
    },
    deleteButton: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'tomato',
    },
    accountButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    changePasswordInput: {
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 10,
        paddingVertical: 5,
        width: '80%',
    },
    changePasswordInputContainer: {
        width: '80%',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});