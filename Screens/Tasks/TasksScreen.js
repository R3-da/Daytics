import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import MySnackBar from '../../Components/MySnackBar';
import AppStyles from '../../Styles/AppStyles';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

const TasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [undoData, setUndoData] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT NOT NULL,
          taskName TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          taskDescription TEXT
        );`
      );
    });
  }, []);

  const fetchTasks = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tasks ORDER BY createdAt DESC;`,
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
        `DELETE FROM tasks WHERE id = ?;`,
        [task.id],
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
        `INSERT INTO tasks (userId, taskName, createdAt, taskDescription)
        VALUES (?, ?, ?, ?);`,
        [
          undoData.userId,
          undoData.taskName,
          undoData.createdAt,
          undoData.taskDescription
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
        createdAt: timestamp,
        taskDescription: ''
      };
      setNewTaskName('');
      Keyboard.dismiss();
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO tasks (userId, taskName, createdAt, taskDescription)
          VALUES (?, ?, ?, ?);`,
          [
            data.userId,
            data.taskName,
            data.createdAt,
            data.taskDescription
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

  return (
    <View style={{ flex: 1 }}>
      <View style={AppStyles.taskInputContainer}>
        <TextInput
          style={AppStyles.taskInputText}
          placeholder="Add A New Todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={setNewTaskName}
          value={newTaskName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
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
            <Pressable
              style={AppStyles.taskContainer}
              onPress={() =>
                navigation.navigate('TaskDetailScreen', { item })
              }
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
          setSnackBarMessage('');
        }}
        snackBarMessage={snackBarMessage}
        undoDeleteTask={undoDeleteTask}
      />
    </View>
  );
};

export default TasksScreen;
