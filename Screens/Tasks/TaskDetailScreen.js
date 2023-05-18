import { View, Text, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

const Detail = ({route}) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.heading);
    const [todoDescription, onChangeDescriptionText] = useState(route.params.item.description)
    const navigation = useNavigation();

    // Get the dimensions of the screen
    const windowHeight = Dimensions.get('window').height;

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
            <KeyboardAvoidingView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" behavior="padding">
                <View style={styles.innerContainer}>
                    <View style={styles.titleContainer}>
                        <TextInput
                            style={styles.titleInput}
                            onChangeText= {onChangeHeadingText}
                            onBlur={updateTodo()}
                            value={textHeading}
                            textAlignVertical="bottom"
                        />
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
                </View>
            </KeyboardAvoidingView>
        
    );
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flexGrow: 1,
    },
    titleContainer: {
        marginTop:10,
        marginLeft:15,
        marginRight:15
    },
    titleInput: {
        paddingLeft:10,
        paddingTop:10,
        fontSize:20,
        color:'#000000',
        backgroundColor:'transparent'
    },
    decriptionContainer: {
        marginTop:15,
        marginLeft:15,
        marginRight:15
    },
    descriptionInput: {
        padding:10,
        fontSize:16,
        color:'#000000',
        backgroundColor:'#e0e0e0',
        borderRadius:5
    }
})