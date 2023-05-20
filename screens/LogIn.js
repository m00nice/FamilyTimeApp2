import React, { useState } from 'react';
import { ScrollView, Button, TextInput, View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';




function LogIn({ navigation, route }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const logIn = () => {

        //if(username and password correct){
            navigation.navigate('Welcome');
        //}else{username or password wrong}

    }


    return (
        <View style={styles.container} >
            <TextInput placeholder='Username' value={username} onChangeText={() => setUsername(username)}/>
            <TextInput placeholder='Password' value={password} onChangeText={() => setPassword(password)}/>
            <Button title='Log Ind' onPress={logIn}></Button>
            <Button title='Opret Bruger'/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
        fontSize: 30,
    },
  });

export default LogIn;