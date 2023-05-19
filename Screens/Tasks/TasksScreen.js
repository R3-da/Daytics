import { View, Button, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import { firebase } from '../../firebase';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import MySnackBar from '../../Components/MySnackBar';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const todoRef = firebase.firestore().collection('tasks_db');
    const [newTaskName, setNewTaskName] = useState('');
    const [refreshing, setRefreshing] = useState(false); // added
    const navigation = useNavigation();
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [undoData, setUndoData] = useState('');

    //fetch or read the data from firestore
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const tasks = []
                querySnapshot.forEach((doc) => {
                    const {taskName, createdAt, description} = doc.data()
                    tasks.push({
                        id: doc.id,
                        taskName,
                        createdAt,
                        description,
                    })
                })
                setTasks(tasks)
                setRefreshing(false);
            }
        )
    }, [])

    // delete a todo from firestore db
    const deleteTodo = (task) => {
        
        todoRef
            .doc(task.id)
            .delete()
            .then(() => {
                setUndoData(task);
                setSnackBarMessage('Item Deleted');
                setSnackBarVisible(true)
                // show a successful alert
                //alert('Delete Successfully')
            })
            .catch(error => {
                alert(error);
            })
    }

    // undo tod
    const undoDeleteTodo = (undoData) => {
        todoRef
            .add(undoData)
            .then(() => {
                setUndoData('');
                setSnackBarVisible(false);
                setSnackBarMessage
            })
            .catch((error) => {
                alert(error);
            })
    }

    // add todo
    const addTodo = () => {
        //check if we have a todo
        if (newTaskName && newTaskName.length > 0) {            
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                taskName: newTaskName,
                createdAt: timestamp,
                description: '',
            };
            setNewTaskName('');
            Keyboard.dismiss();
            todoRef
                .add(data)
                .catch((error) => {
                    alert(error);
                })
        }
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.formContainer}> 
                <TextInput
                    style={styles.input}
                    placeholder='Add A New Todo'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(newTaskName) => setNewTaskName(newTaskName)}
                    value={newTaskName}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={tasks}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate('Detail', {item})}
                        >
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={() => {
                                    deleteTodo(item)
                                }}
                            >
                                <FontAwesome 
                                    name='trash-o'
                                    color='tomato'
                                    style={styles.deleteIcon}
                                />
                            </TouchableOpacity>
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading} numberOfLines={1}>
                                    {item.taskName}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={false} // state variable to keep track of refresh status
                        onRefresh={() => console.log('onRefresh')} // function to handle refresh action
                    />
                }
            />
            <MySnackBar 
                visible={snackBarVisible} 
                onDismiss={() => {
                    setSnackBarVisible(false);
                    setSnackBarMessage('')
                }} 
                snackBarMessage = {snackBarMessage}
                undoDeleteTodo={() => undoDeleteTodo(undoData)}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
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
})