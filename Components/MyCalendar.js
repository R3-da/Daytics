import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStyles from '../Styles/AppStyles';
import { Calendar } from 'react-native-calendars';

const MyCalendar = ({ 
    openCalendarDate,
    setSelectedDueDate,
    setShowCalendar,
    showCalendar}) => {
    const [containerOpacity] = useState(new Animated.Value(0)); // Initialize container opacity value
    const [contentOpacity] = useState(new Animated.Value(0)); 

  useEffect(() => {
    if (showCalendar) {
      // Fade in animation when the pop-up is visible
      Animated.parallel([
        Animated.timing(containerOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showCalendar, containerOpacity, contentOpacity]);




  const handleClose = () => {
    Animated.parallel([
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
        setShowCalendar(false); // Call the onClose callback to close the sign-up popup
    });
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop the event propagation to prevent closing when clicking inside the content
  };

  const calendarTheme = {
    // Customize the calendar theme properties here
    todayTextColor: '#788eec',
    selectedDayBackgroundColor: '#788eec',
    monthTextColor: '#788eec',
    //dayTextColor: 'red',
    arrowColor: '#788eec',
    // ...add more theme properties as needed
  }

  return (
    <Modal visible={showCalendar} transparent onRequestClose={() => setShowCalendar(false)}>
      <TouchableWithoutFeedback onPress={handleOverlayClick}>
        <Animated.View style={[AppStyles.popUpContainer, { opacity: containerOpacity }]}>
          <TouchableWithoutFeedback onPress={handleContentClick}>
            <Animated.View style={[AppStyles.popUpContent, { opacity: contentOpacity }]}>
              <Calendar
                hideDayNames = {true}
                markedDates={{
                    [openCalendarDate]: { selected: true },
                }}
                current= {openCalendarDate}
                onDayPress={(day) => {
                    setSelectedDueDate(day.dateString);
                    setShowCalendar(false);
                }}
                onCancel={() => {
                    setShowCalendar(false);
                }}
                theme={calendarTheme}
              />

              <TouchableOpacity
                style={AppStyles.clearCalendarButton}
                onPress={() => {
                  handleClose();
                  setSelectedDueDate('');
                }}
              >
                <Text style={AppStyles.clearCalendarText}>Clear Date</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={AppStyles.popUpCloseButton} onPress={handleClose}>
                <Ionicons name="close-outline" size={25} color="gray" />
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MyCalendar;
