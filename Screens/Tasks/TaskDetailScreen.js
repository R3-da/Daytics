import { View, Text, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { firebase } from '../../firebase';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import AppStyles from '../../Styles/AppStyles';


const TaskDetailScreen = ({route}) => {
    const todoRef = firebase.firestore().collection('tasks_db');
    const [taskName, setTaskName] = useState(route.params.item.taskName);
    const [taskDescription, setTaskDescription] = useState(route.params.item.taskDescription)

    // Get the dimensions of the screen
    const windowHeight = Dimensions.get('window').height;

    const updateTask = () => {
        if (taskName &&  taskName.length > 0) {
            todoRef
            .doc(route.params.item.id)
            .update({
                taskName: taskName,
                taskDescription: taskDescription,
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

    return (
        <KeyboardAvoidingView contentContainerStyle={AppStyles.container} keyboardShouldPersistTaps="handled" behavior="padding">
            <View style={AppStyles.innerContainer}>
                <View style={AppStyles.taskNameContainerDesc}>
                    <TextInput
                        style={AppStyles.taskNameInputDesc}
                        onChangeText= {setTaskName}
                        onBlur={updateTask()}
                        value={taskName}
                        textAlignVertical="bottom"
                    />
                </View>
                <View style={AppStyles.taskDecriptionContainer}>
                    <AutoGrowingTextInput 
                        style={AppStyles.taskDescriptionInput} 
                        placeholder='Description'
                        placeholderTextColor='#aaaaaa'
                        onChangeText= {setTaskDescription}
                        onBlur={updateTask()}
                        value={taskDescription}
                        maxHeight={windowHeight * 0.75}
                    />
                </View>
            </View>
        </KeyboardAvoidingView> 
    );
}

export default TaskDetailScreen