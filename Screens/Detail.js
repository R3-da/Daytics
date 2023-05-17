import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import React, {useState, useEffect} from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardListener from 'react-native-keyboard-listener';


const Detail = ({route}) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.heading);
    const [todoDescription, onChangeDescriptionText] = useState(route.params.item.description)
    const navigation = useNavigation();
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

    const handleKeyboardWillShow = (frames) => {
        console.log('Keyboard will show:', frames.endCoordinates);
        // Perform additional actions
    };
    
    const handleKeyboardWillHide = () => {
        console.log('Keyboard will hide');
        // Perform additional actions
    };

    const updateTodo = () => {
        if (textHeading &&  textHeading.length > 0) {
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
                description: todoDescription,
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

    return (
        <KeyboardAwareScrollView
            onKeyboardWillShow={handleKeyboardWillShow}
            onKeyboardWillHide={handleKeyboardWillHide}
        >
            <View style={styles.titleContainer}>
                <TextInput
                    style={styles.titleInput}
                    onChangeText= {onChangeHeadingText}
                    onBlur={updateTodo()}
                    value={textHeading}
                    textAlignVertical="bottom"
                />
                <TouchableOpacity onPress={() => console.log(windowHeight)}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.decriptionContainer}>
                <AutoGrowingTextInput 
                    style={styles.descriptionInput} 
                    placeholder='Description'
                    placeholderTextColor='#aaaaaa'
                    onChangeText= {onChangeDescriptionText}
                    onBlur={updateTodo()}
                    value={todoDescription}
                    maxHeight={windowHeight * 0.75}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Detail

const styles = StyleSheet.create({
    titleContainer: {
        marginTop:10,
        marginLeft:15,
        marginRight:15
    },
    titleInput: {
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:0,
        fontSize:20,
        color:'#000000',
        backgroundColor:'transparent',
    },
    decriptionContainer: {
        marginTop:15,
        marginLeft:15,
        marginRight:15,
    },
    descriptionInput: {
        padding:10,
        fontSize:16,
        color:'#000000',
        backgroundColor:'#e0e0e0',
        borderRadius:5
    }
})