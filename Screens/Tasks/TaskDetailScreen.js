import { View, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Pressable, Text } from 'react-native';
import React, {useState, useEffect} from 'react';
import AppStyles from '../../Styles/AppStyles';
import { db } from '../../database/Dao';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';
import MyCalendar from '../../Components/MyCalendar';

const TaskDetailScreen = ({route}) => {
    const { item, setIsDataSynced } = route.params;
    const [taskName, setTaskName] = useState(item.taskName);
    const [taskDescription, setTaskDescription] = useState(item.taskDescription)
    const [taskIsDone, setTaskIsDone] = useState(item.taskIsDone)
    const [taskDueDate, setTaskDueDate] = useState(item.taskDueDate)
    const isFocused = useIsFocused();
    const [showCalendar, setShowCalendar] = useState(false);

    // Get the dimensions of the screen
    const windowHeight = Dimensions.get('window').height;

    const handleTaskUpdate = async () => {
        try {
          await new Promise((resolve, reject) => {
            db.transaction((tx) => {
              tx.executeSql(
                `UPDATE tasks SET taskName = ?, taskDescription = ?, taskDueDate = ?, taskIsDone = ? WHERE taskId = ?;`,
                [taskName, taskDescription, taskDueDate, taskIsDone, item.taskId],
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

    const handleTaskCompletion = (newValue) => {
        setTaskIsDone(newValue);
    };

    const handleTaskDateUpdate = (newValue) => {
        setTaskDueDate(newValue);
    };

    const toggleShowCalendar = () => {
        setShowCalendar(true);
    };

    const renderCalendar = () => {
        if (showCalendar) {
        return (
            <MyCalendar
            openCalendarDate={taskDueDate}
            setSelectedDueDate={date => {
                handleTaskDateUpdate(date);
                setShowCalendar(false);
            }}
            setShowCalendar={setShowCalendar}
            showCalendar={showCalendar}
            />
        );
        }
        return null;
    };

    return (
        <KeyboardAvoidingView contentContainerStyle={AppStyles.container} keyboardShouldPersistTaps="handled" behavior="padding">
            <View style={AppStyles.innerContainer}>
                <View style={AppStyles.taskNameContainerDesc}>
                    <Pressable 
                        style={{ paddingVertical: 15, paddingHorizontal: 8 }} 
                        onPress={() => {
                            handleTaskCompletion(item, Boolean(!item.taskIsDone));
                        }}>
                        <CheckBox
                            style={AppStyles.taskCheckBox}
                            value={Boolean(taskIsDone)}
                            onValueChange={newValue => handleTaskCompletion(newValue)}
                            color={Boolean(taskIsDone) ? '#4CAF50' : undefined}
                        />
                    </Pressable>
                    <TextInput
                        style={AppStyles.taskNameInputDesc}
                        onChangeText= {setTaskName}
                        onBlur={handleTaskUpdate}
                        value={taskName}
                        textAlignVertical="bottom"
                    />
                    <TouchableOpacity
                        style={AppStyles.takNameIconsDesc}
                        onPress={() => {
                        toggleShowCalendar(null);
                        }}
                    >
                        {
                            (taskDueDate.length > 0) ? 
                            <Text style={AppStyles.takNameDateDesc}>{taskDueDate }</Text>
                            : <Ionicons 
                            name="calendar-outline" 
                            color='gray'
                            style={AppStyles.addDateIcon}
                            /> 
                        }
                    </TouchableOpacity>
                </View>
                <View style={AppStyles.taskDecriptionContainer}>
                    <TextInput 
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
            {renderCalendar()}
        </KeyboardAvoidingView> 
    );
}

export default TaskDetailScreen