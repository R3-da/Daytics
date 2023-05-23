import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import MySnackBar from '../../Components/MySnackBar';
import AppStyles from '../../Styles/AppStyles';
import * as SQLite from 'expo-sqlite';
import CheckBox from 'expo-checkbox';
import { Calendar } from 'react-native-calendars';

const db = SQLite.openDatabase('tasks.db');

const TasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [undoData, setUndoData] = useState('');
  const [user, setUser] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDueDateSelected, setIsDueDateSelected] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
          taskId INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT NOT NULL,
          taskName TEXT,
          taskCreatedAt TEXT NOT NULL,
          taskDueDate TEXT,
          taskDescription TEXT,
          taskIsDone INTEGER NOT NULL DEFAULT 0
        );`
      );
    });
  }, []);

  const fetchTasks = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tasks ORDER BY taskIsDone ASC, taskCreatedAt DESC;`,
        [],
        (_, { rows }) => {
          const tasks = rows._array;
          setTasks(tasks);
          setRefreshing(false);
        },
        error => {
          console.error(error);
        }
      );
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
      setShowCalendar(false);
      setIsDueDateSelected(false);
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

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar);
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
                toggleShowCalendar();
            }}
          >
            {isDueDateSelected ? (
              <Text style={AppStyles.selectedDueDateText}>{selectedDueDate}</Text>
            ) : (
              <FontAwesome
                name="calendar"
                color="gray"
                style={AppStyles.addDateIcon}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={AppStyles.addTaskButton} onPress={addTask}>
          <Text style={AppStyles.addTaskButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {showCalendar && (
        <Calendar
          onDayPress={(day) => {
            setSelectedDueDate(day.dateString);
            setIsDueDateSelected(true);
            setShowCalendar(false);
          }}
          onCancel={() => {
            setShowCalendar(false);
          }}
        />
      )}
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
            <Pressable
              style={AppStyles.taskContainer}
              onPress={() => navigation.navigate('TaskDetailScreen', { item })}
            >
              <TouchableOpacity
                style={AppStyles.deleteTaskButton}
                onPress={() => {
                  deleteTask(item);
                }}
              >
                <FontAwesome
                  name="trash-o"
                  color="tomato"
                  style={AppStyles.deleteTaskIcon}
                />
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
                <Text
                  style={[
                    AppStyles.taskNameText,
                    item.taskIsDone ? AppStyles.taskNameTextDone : null,
                  ]}
                  numberOfLines={1}
                >
                  {item.taskDueDate}
                </Text>
              </View>
              <CheckBox
                value={Boolean(item.taskIsDone)}
                onValueChange={(newValue) =>
                  handleTaskCompletion(item, newValue)
                }
              />
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.taskId.toString()}
      />
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
