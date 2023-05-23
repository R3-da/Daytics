import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AppStyles from '../Styles/AppStyles';

const MyCalendar = ({ selectedDueDate, setSelectedDueDate, setIsDueDateSelected, setShowCalendar}) => {
    const calendarTheme = {
        // Customize the calendar theme properties here
        todayTextColor: '#788eec',
        selectedDayBackgroundColor: '#788eec',
        monthTextColor: '#788eec',
        //dayTextColor: 'red',
        arrowColor: '#788eec',
        // ...add more theme properties as needed
      }; 
      return (
    <View style={AppStyles.modalContainer}>
        <View style={AppStyles.calendarContainer}>
            <Calendar
                hideDayNames = {true}
                markedDates={{
                    [selectedDueDate]: { selected: true },
                }}
                current= {selectedDueDate}
                onDayPress={(day) => {
                    setSelectedDueDate(day.dateString);
                    setIsDueDateSelected(true);
                    setShowCalendar(false);
                }}
                onCancel={() => {
                    setShowCalendar(false);
                }}
                theme={calendarTheme}
            />
        </View>
    </View>
    );
};

export default MyCalendar;
