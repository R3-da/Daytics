import { View, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import React, {useState, useEffect} from 'react';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import AppStyles from '../../Styles/AppStyles';
import { db } from '../../database/Dao';
import { useIsFocused } from '@react-navigation/native';

const TaskDetailScreen = ({route}) => {
    const { item, setIsDataSynced } = route.params;
    const [taskName, setTaskName] = useState(item.taskName);
    const [taskDescription, setTaskDescription] = useState(item.taskDescription)
    const isFocused = useIsFocused();
    

    // Get the dimensions of the screen
    const windowHeight = Dimensions.get('window').height;

    const handleTaskUpdate = async () => {
        try {
          await new Promise((resolve, reject) => {
            db.transaction((tx) => {
              tx.executeSql(
                `UPDATE tasks SET taskName = ?, taskDescription = ? WHERE taskId = ?;`,
                [taskName, taskDescription, item.taskId],
                (_, result) => {
                  resolve(result);
                },
                (_, error) => {
                  reject(error);
                }
              );
            });
          });

          
        } catch (error) {
          console.error(error);
        }
      };
      

      useEffect(() => {
        if (!isFocused) {
          // Perform the action or update the screen
          handleTaskUpdate().then(() => {
            setIsDataSynced(false);
          });
        }
      }, [isFocused]);

    return (
        <KeyboardAvoidingView contentContainerStyle={AppStyles.container} keyboardShouldPersistTaps="handled" behavior="padding">
            <View style={AppStyles.innerContainer}>
                <View style={AppStyles.taskNameContainerDesc}>
                    <TextInput
                        style={AppStyles.taskNameInputDesc}
                        onChangeText= {setTaskName}
                        onBlur={handleTaskUpdate}
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
                        onBlur={handleTaskUpdate}
                        value={taskDescription}
                        maxHeight={windowHeight * 0.75}
                    />
                </View>
            </View>
        </KeyboardAvoidingView> 
    );
}

export default TaskDetailScreen