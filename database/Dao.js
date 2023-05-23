import * as SQLite from 'expo-sqlite';
import {useEffect } from 'react';

const db = SQLite.openDatabase('tasks.db');

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

export {
    db
}