import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, StyleSheet, TouchableOpacity, Text, FlatList, Image, TextInput } from 'react-native';

import {database, storage} from '../config/firebase'
import {doc, setDoc, addDoc, getDoc, updateDoc, collection, getDocs, deleteField, FieldValue} from 'firebase/firestore'
import { firebase } from '@react-native-firebase/firestore';



function EditAppointments({ navigation, route }) {

    const [appointmentInputs, SetAppointmentInputs] = useState([])
    const [appointmentData, SetAppointmentData] = useState({})

    const InputChange = (inputName, inputValue) => {
        SetAppointmentInputs({...appointmentInputs, [inputName]: inputValue})
    }

    useEffect(() => {
        const docRef = doc(database, "Users", "vMUxCNUEnHwW8XDsGgkO")
        const fetchData = async () => {
            try{
                const docSnapshot = await getDoc(docRef);
                const currentArray = docSnapshot.get('appointments');
                console.log(currentArray);
                console.log(appointmentData);
                SetAppointmentData(currentArray);
                console.log(appointmentData);
            }catch(error){
                console.error("error fecthing appointments", error);
            }
        }
        fetchData();
    },[DeleteAppointment, addAppointment])


    const addAppointment = async () => {
        const docRef = doc(database, "Users", "vMUxCNUEnHwW8XDsGgkO")
        try{
            const docSnapshot = await getDoc(docRef);
            const currentArray = docSnapshot.get('appointments');
            const id = Date.now().toString();
             
            const updatedArray = { ...currentArray, [id]: [appointmentInputs.Titel, appointmentInputs.startDato, appointmentInputs.endDato] };

            await updateDoc(docRef, {"appointments": updatedArray})
            console.log(currentArray);
            console.log("success")

            }catch(error){
            console.error("error add appointment", error)
        }
      }

      const DeleteAppointment = async (key) => {
        const docRef = doc(database, "Users", "vMUxCNUEnHwW8XDsGgkO")
        console.log(key);
        
        const updateObj = {
            [`appointments.${key}`]: deleteField()
        }

        try {
            await updateDoc(docRef, updateObj)
            console.log("Field deleted")
        }catch(error){
            console.error("Error deleting field",error);
        }
        
        
      }


      const renderComponents = () => {
        return Object.entries(appointmentData).map(([key, value]) => {
            return (
                <View key={key} style={{backgroundColor: "gray", width: "100%", flexDirection: "row", alignItems: "center",justifyContent: 'space-around', margin: 2.5, flex: 0.07}}>
                    
                        <Text style={{}} key={0}>Titel:{value[0]}</Text>
                        <Text style={{}} key={1}>Start: {value[1]}</Text>
                        <Text style={{}} key={2}>Slut: {value[2]}</Text>
                    
                    <Button title='X' onPress={() => DeleteAppointment(key)} style={{}}></Button>
                </View>
            )
        })
      }
    
    return (
        <View style={styles.container}>
            <TextInput placeholder='Titel' value={appointmentInputs.Titel} onChangeText={(text) => InputChange('Titel', text)}/>
            <TextInput placeholder='Start dato' value={appointmentInputs.startDato} onChangeText={(text) => InputChange('startDato', text)}/>
            <TextInput placeholder='Slut dato' value={appointmentInputs.endDato} onChangeText={(text) => InputChange('endDato', text)}/>
            <Button title='Tilføj ny plan' onPress={() => addAppointment()}></Button>
            
                <View style={{height: "100%", width: "100%", alignItems: "center", flexDirection: "column",}}>
                {renderComponents()}
                </View>    

                    
                
            
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      top: 50,
    },
    name: {
        fontSize: 30,
    },
  });

export default EditAppointments;