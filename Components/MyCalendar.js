import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AppStyles from '../Styles/AppStyles';

const MyCalendar = ({ selectedDueDate, setSelectedDueDate, setIsDueDateSelected, setShowCalendar, showCalendar}) => {
    const calendarTheme = {
        // Customize the calendar theme properties here
        todayTextColor: '#788eec',
        selectedDayBackgroundColor: '#788eec',
        monthTextColor: '#788eec',
        //dayTextColor: 'red',
        arrowColor: '#788eec',
        // ...add more theme properties as needed
      }; 

    const handleOverlayClick = () => {
        setShowCalendar(false);
    };
    
    const handleContentClick = (e) => {
        e.stopPropagation(); // Stop the event propagation to prevent closing when clicking inside the content
    };
      return (
    <Modal visible={showCalendar} transparent onRequestClose={() => setShowCalendar(false)}>
        <TouchableWithoutFeedback onPress={handleOverlayClick}>
            <View style={AppStyles.modalContainer}>
                <TouchableWithoutFeedback onPress={handleContentClick}>
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
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
    );
};

export default MyCalendar;
