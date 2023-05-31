import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import MySnackBar from '../../Components/MySnackBar';
import AppStyles from '../../Styles/AppStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CheckBox from 'expo-checkbox';
import MyCalendar from '../../Components/MyCalendar';
import { db } from '../../database/Dao';

const TasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [undoData, setUndoData] = useState('');
  const [user, setUser] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Selected task for date update
  const [selectedDueDate, setSelectedDueDate] = useState(''); // Due date for new tasks
  const [isDataSynced, setIsDataSynced] = useState(false); // Track data synchronization status
  
    const fetchTasks = async () => {
        try {
        const tasks = await new Promise((resolve, reject) => {
            db.transaction(
            tx => {
                tx.executeSql(
                `SELECT * FROM tasks ORDER BY taskIsDone ASC, taskCreatedAt DESC;`,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                error => {
                    reject(error);
                }
                );
            },
            error => {
                reject(error);
            }
            );
        });
    
        setTasks(tasks);
        setRefreshing(false);
        setIsDataSynced(true);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        if (!isDataSynced) {
          // Perform the action or update the screen=
          fetchTasks();
        }
    }, [isDataSynced]);

    const deleteTask = task => {
        db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM tasks WHERE taskId = ?;`,
            [task.taskId],
            () => {
            setUndoData(task);
            setSnackBarMessage('Item Deleted');
            setSnackBarVisible(true);
            fetchTasks();
            },
            error => {
            console.error(error);
            }
        );
        });
    };

    const undoDeleteTask = () => {
        db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO tasks (userId, taskName, taskCreatedAt, taskDescription, taskIsDone)
            VALUES (?, ?, ?, ?, ?);`,
            [
            undoData.userId,
            undoData.taskName,
            undoData.taskCreatedAt,
            undoData.taskDescription,
            undoData.taskIsDone
            ],
            () => {
            setUndoData('');
            setSnackBarVisible(false);
            setSnackBarMessage('');
            fetchTasks();
            },
            error => {
            console.error(error);
            }
        );
        });
    };

    const addTask = () => {
        if (newTaskName && newTaskName.length > 0) {
        const timestamp = new Date().toISOString();
        const data = {
            userId: user ? user.uid : '',
            taskName: newTaskName,
            taskCreatedAt: timestamp,
            taskDueDate: selectedDueDate,
            taskDescription: '',
            taskIsDone: 0
        };
        setNewTaskName('');
        setSelectedDueDate('');

        Keyboard.dismiss();
        db.transaction(tx => {
            tx.executeSql(
            `INSERT INTO tasks (userId, taskName, taskCreatedAt, taskDueDate, taskDescription, taskIsDone)
            VALUES (?, ?, ?, ?, ?, ?);`,
            [
                data.userId,
                data.taskName,
                data.taskCreatedAt,
                data.taskDueDate,
                data.taskDescription,
                data.taskIsDone
            ],
            () => {
                fetchTasks();
            },
            error => {
                console.error(error);
            }
            );
        });
        }
    };

    const handleTaskCompletion = (task, newValue) => {
        db.transaction(tx => {
        tx.executeSql(
            `UPDATE tasks SET taskIsDone = ? WHERE taskId = ?;`,
            [newValue ? 1 : 0, task.taskId],
            () => {
            fetchTasks();
            },
            error => {
            console.error(error);
            }
        );
        });
    };

    const handleTaskDateUpdate = (task, newValue) => {
        db.transaction(tx => {
        tx.executeSql(
            `UPDATE tasks SET taskDueDate = ? WHERE taskId = ?;`,
            [newValue, task.taskId],
            () => {
            fetchTasks();
            },
            error => {
            console.error(error);
            }
        );
        });
    };

    const toggleShowCalendar = (task) => {
        setSelectedTask(task);
        setShowCalendar(true);
    };

    const renderCalendar = () => {
        if (showCalendar) {
        return (
            <MyCalendar
            openCalendarDate={selectedTask ? selectedTask.taskDueDate : selectedDueDate}
            setSelectedDueDate={date => {
                if (selectedTask) {
                handleTaskDateUpdate(selectedTask, date);
                } else {
                setSelectedDueDate(date);
                }
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
        <View style={{ flex: 1 }}>
        <View style={AppStyles.taskInputContainer}>
            <View style={AppStyles.taskInputTextContainer}>
            <TextInput
                style={AppStyles.taskInputText}
                placeholder="Add A New Todo"
                placeholderTextColor="#aaaaaa"
                onChangeText={setNewTaskName}
                value={newTaskName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={AppStyles.addDateButton}
                onPress={() => {
                toggleShowCalendar(null);
                }}
            >
                {
                    (selectedDueDate && selectedDueDate.length > 0) ? 
                    <Text style={AppStyles.selectedDueDateText}>{selectedDueDate }</Text>
                    : <Ionicons 
                    name="calendar-outline" 
                    color='gray'
                    style={AppStyles.addDateIcon}
                    /> 
                }

            </TouchableOpacity>
            </View>

            <TouchableOpacity style={AppStyles.addTaskButton} onPress={addTask}>
            <Text style={AppStyles.addTaskButtonText}>Add</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={tasks}
            numColumns={1}
            refreshing={refreshing}
            onRefresh={() => {
            setRefreshing(true);
            fetchTasks();
            }}
            renderItem={({ item }) => (
            <View>
                <View
                    style={AppStyles.taskContainer}
                >
                <TouchableOpacity
                    style={AppStyles.deleteTaskButton}
                    onPress={() => {
                    deleteTask(item);
                    }}
                >
                    <FontAwesome name="trash-o" color="tomato" style={AppStyles.deleteTaskIcon} />
                </TouchableOpacity>
                <View style={AppStyles.taskInnerContainer}>
                    <Text
                    style={[
                        AppStyles.taskNameText,
                        item.taskIsDone ? AppStyles.taskNameTextDone : null,
                    ]}
                    numberOfLines={1}
                    >
                    {item.taskName}
                    </Text>
                </View>
                {item.taskDueDate && item.taskDueDate.length > 0 ? (
                    <TouchableOpacity
                        style={AppStyles.taskDateButton}
                        onPress={() => {
                            toggleShowCalendar(item);
                        }}
                    >
                    <Text style={AppStyles.taskDateText}>{item.taskDueDate}</Text>
                </TouchableOpacity>
                    ) : null
                    }
                <Pressable 
                    style={{ paddingVertical: 15, paddingHorizontal: 8 }} 
                    onPress={() => {
                        handleTaskCompletion(item, Boolean(!item.taskIsDone));
                    }}>
                    <CheckBox
                        style={AppStyles.taskCheckBox}
                        value={Boolean(item.taskIsDone)}
                        onValueChange={newValue => handleTaskCompletion(item, newValue)}
                        color={Boolean(item.taskIsDone) ? '#4CAF50' : undefined}
                    />
                </Pressable>

                
                </View>
            </View>
            )}
            keyExtractor={item => item.taskId.toString()}
        />
        {renderCalendar()}
        <MySnackBar
            visible={snackBarVisible}
            onDismiss={() => {
            setSnackBarVisible(false);
            setSnackBarMessage('');
            }}
            snackBarMessage={snackBarMessage}
            undoDeleteTask={undoDeleteTask}
        />
        </View>
    );
};

export default TasksScreen;
