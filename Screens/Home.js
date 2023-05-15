import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import {AsyncStorage} from 'react-native';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const [refreshing, setRefreshing] = useState(false); // added
    const navigation = useNavigation();

    // fetch data from the cache or firestore
    const fetchData = async () => {
        try {
          // Check if the data exists in the cache
          const cachedData = await AsyncStorage.getItem('todos');
      
          if (cachedData) {
            // If data exists in the cache, parse and set it in the state
            const parsedData = JSON.parse(cachedData);
            setTodos(parsedData);
          } else {
            // If data doesn't exist in the cache, fetch it from Firestore
            const querySnapshot = await todoRef.orderBy('createdAt', 'desc').get();
      
            const todos = querySnapshot.docs.map(doc => ({
              id: doc.id,
              heading: doc.data().heading,
            }));
      
            // Store the fetched data in the cache
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
      
            // Set the fetched data in the state
            setTodos(todos);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setRefreshing(false);
        }
      };
      

    //fetch or read the data from firestore
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const todos = []
                querySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,
                    })
                })
                setTodos(todos)
                setRefreshing(false);
            }
        )
    }, [])

    // delete a todo from firestore db

    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                // show a successful alert
                //alert('Delete Successfully')
            })
            .catch(error => {
                alert(error);
            })
    }

    // add todo
    const addTodo = () => {
        //check if we have a todo
        if (addData && addData.length > 0) {
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    setAddData('');
                    // release Keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    // refresh the data in the flatlist
    const handleRefresh = () => {
        setRefreshing(true);
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const todos = []
                querySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,
                    })
                })
                setTodos(todos)
                setRefreshing(false);
            }
        )
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.formContainer}> 
                <TextInput
                    style={styles.input}
                    placeholder='Add A New Todo'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate('Detail', {item})}
                        >
                            <FontAwesome 
                                name='trash-o'
                                color='red'
                                onPress={() => deleteTodo(item)}
                                style={styles.todoIcon}
                            />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>

                            </View>

                        </Pressable>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={false} // state variable to keep track of refresh status
                        onRefresh={() => console.log('onRefresh')} // function to handle refresh action
                    />
                }
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding: 15,
        borderRadius : 15,
        margin: 5,
        marginHorizontal : 10,
        flexDirection: 'row' ,
        alignItems: 'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight : 22,
    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:50,
    },
    input:{
        height: 48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    button: {
        height:47,
        borderRadius:5,
        backgroundColor:'#788eec',
        width:80,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        color:'white',
        fontSize:20
    },
    todoIcon: {
        marginTop: 5,
        fontSize:20,
        marginLeft:14
    }
})