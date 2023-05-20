import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import { firebase, auth } from '../../firebase';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import MySnackBar from '../../Components/MySnackBar';
import AppStyles from '../../Styles/AppStyles';

const TasksScreen = () => {
    const [tasks, setTasks] = useState([]);
    const tasks_Db_Ref = firebase.firestore().collection('tasks_db');
    const [newTaskName, setNewTaskName] = useState('');
    const [refreshing, setRefreshing] = useState(false); // added
    const navigation = useNavigation();
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [undoData, setUndoData] = useState('');

    //fetch or read the data from firestore
    useEffect(() => {
        tasks_Db_Ref
        .where("userId", "==", auth.currentUser.uid)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const tasks = []
                querySnapshot.forEach((doc) => {
                    const {userId, taskName, createdAt, taskDescription} = doc.data()
                    tasks.push({
                        id: doc.id,
                        userId,
                        taskName,
                        createdAt,
                        taskDescription,
                    })
                })
                setTasks(tasks)
                setRefreshing(false);
            }
        )
    }, [])

    // delete a todo from firestore db
    const deleteTask = (task) => {
        tasks_Db_Ref
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
    const undoDeleteTask = () => {
        tasks_Db_Ref
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
    const addTask = () => {
        //check if we have a todo
        if (newTaskName && newTaskName.length > 0) {            
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                userId: auth.currentUser.uid,
                taskName: newTaskName,
                createdAt: timestamp,
                taskDescription: '',
            };
            setNewTaskName('');
            Keyboard.dismiss();
            tasks_Db_Ref
                .add(data)
                .catch((error) => {
                    alert(error);
                })
        }
    }

    return (
        <View style={{flex:1}}>
            <View style={AppStyles.taskInputContainer}> 
                <TextInput
                    style={AppStyles.taskInputText}
                    placeholder='Add A New Todo'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(newTaskName) => setNewTaskName(newTaskName)}
                    value={newTaskName}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={AppStyles.addTaskButton} onPress={addTask}>
                    <Text style={AppStyles.addTaskButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={tasks}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={AppStyles.taskContainer}
                            onPress={() => navigation.navigate('TaskDetailScreen', {item})}
                        >
                            <TouchableOpacity 
                                style={AppStyles.deleteTaskButton}
                                onPress={() => {
                                    deleteTask(item)
                                }}
                            >
                                <FontAwesome 
                                    name='trash-o'
                                    color='tomato'
                                    style={AppStyles.deleteTaskIcon}
                                />
                            </TouchableOpacity>
                            <View style={AppStyles.taskInnerContainer}>
                                <Text style={AppStyles.taskNameText} numberOfLines={1}>
                                    {item.taskName}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            />
            <MySnackBar 
                visible={snackBarVisible} 
                onDismiss={() => {
                    setSnackBarVisible(false);
                    setSnackBarMessage('')
                }} 
                snackBarMessage = {snackBarMessage}
                undoDeleteTask={undoDeleteTask}
            />
        </View>
    )
}

export default TasksScreen