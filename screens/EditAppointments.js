import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, StyleSheet, TouchableOpacity, Text, FlatList, Image, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import {database, storage} from '../config/firebase'
import {doc, setDoc, addDoc, getDoc, updateDoc, collection, getDocs, deleteField, FieldValue, Timestamp} from 'firebase/firestore'
import { firebase } from '@react-native-firebase/firestore';
//https://docs.expo.dev/versions/latest/sdk/date-time-picker/


function EditAppointments({ navigation, route }) {

    
    const [appointmentData, SetAppointmentData] = useState({})


    const [Titel, setTitel] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showStartTimePicker, setShowStartTimePicker] = useState(false)
    const [showEndTimePicker, setShowEndTimePicker] = useState(false)

    const [click, setClick] = useState(false);


    useEffect(() => {
        const docRef = doc(database, "Users", "vMUxCNUEnHwW8XDsGgkO")
        const fetchData = async () => {
            try{
                const docSnapshot = await getDoc(docRef);
                
                const currentArray = docSnapshot.get('appointments');
                
                console.log(currentArray);
                const entries = Object.entries(currentArray);

                const sortedArray = entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

                SetAppointmentData(sortedArray);
                
            }catch(error){
                console.error("error fecthing appointments", error);
            }
        }
        fetchData();
        
    },[click])


    const addAppointment = async () => {
        const docRef = doc(database, "Users", "vMUxCNUEnHwW8XDsGgkO")
        if(click){setClick(false)}else{setClick(true)}
        try{
            const docSnapshot = await getDoc(docRef);
            const currentArray = docSnapshot.get('appointments');
            const id = Date.now().toString();
             
            const updatedArray = { ...currentArray, [id]: [Titel, startDate, endDate] };

            await updateDoc(docRef, {"appointments": updatedArray})
            
            console.log("success")
            
            }catch(error){
            console.error("error add appointment", error)
        }
      }

      const DeleteAppointment = async (key) => {
        const docRef = doc(database, "Users", "vMUxCNUEnHwW8XDsGgkO")
        if(click){setClick(false)}else{setClick(true)}
        
        const updateObj = {
            [`appointments.${key}`]: deleteField()
        }

        try {
            await updateDoc(docRef, updateObj)
            console.log("Field deleted: "+key)
            
        }catch(error){
            console.error("Error deleting field",error);
        }
        
        
      }


      //DatePicker stuff

      const handleDateChange = (event, selectedDate) => {
            setShowDatePicker(false)

            const updateDate = new Date(startDate)

            if(selectedDate){
                updateDate.setFullYear(selectedDate.getFullYear())
                updateDate.setMonth(selectedDate.getMonth())
                updateDate.setDate(selectedDate.getDate())

                setStartDate(updateDate);
                setEndDate(updateDate)
            }
      }

      const handleStartTimeChange = (event, selectedDate) => {
        setShowStartTimePicker(false)

        const updateDate = new Date(startDate)

        if(selectedDate){
            updateDate.setHours(selectedDate.getHours())
            updateDate.setMinutes(selectedDate.getMinutes())
            setStartDate(updateDate);
        }

      }

      const handleEndTimeChange = (event, selectedDate) => {
        setShowEndTimePicker(false)

        const updateDate = new Date(startDate)

        if(selectedDate){
            updateDate.setHours(selectedDate.getHours())
            updateDate.setMinutes(selectedDate.getMinutes())
            setEndDate(updateDate);
        }

      }
      


      const renderComponents = () => {
        return Object.entries(appointmentData).map(([key, value]) => {
            
            const title = value[1][0]
            const start = value[1][1]
            const end = value[1][2]
            //console.log(start+" this is the start")
            const startD = start instanceof Timestamp ? start.toDate() : start;
            const endD = end instanceof Timestamp ? end.toDate() : end;
            //console.log(startD+" this is the startD")

            return (
                <View key={key} style={{backgroundColor: "gray", width: "100%", flexDirection: "column", alignItems: "center",justifyContent: 'center', margin: 2.5, height: 100,}}>
                    
                        <Text style={{}} key={0}>Titel:{title}</Text>
                        <Text style={{}} key={1}>Start: {startD.toString()}</Text>
                        <Text style={{}} key={2}>Slut: {endD.toString()}</Text>
                    
                    <Button title='X' onPress={() => DeleteAppointment(value[0])} style={{}}></Button>
                </View>
            )
        })
      }
    
    return (
        <View style={styles.container}>
            <TextInput placeholder='Titel' value={Titel} onChangeText={(text) => setTitel(text)}/>
            
            <Button title='Vælg start dato' onPress={() => setShowDatePicker(true)}/>
            {showDatePicker && (<DateTimePicker
            value={startDate}
            mode='date'
            display='default'
            onChange={handleDateChange}
            />)}

            <Button title='Vælg start tid' onPress={() => setShowStartTimePicker(true)}/>
            {showStartTimePicker && (<DateTimePicker
            value={startDate}
            mode='time'
            display='default'
            onChange={handleStartTimeChange}
            />)}

            <Button title='Vælg slut tid' onPress={() => setShowEndTimePicker(true)}/>
            {showEndTimePicker && (<DateTimePicker
            value={endDate}
            mode='time'
            display='default'
            onChange={handleEndTimeChange}
            />)}
            
            
            <Button title='Tilføj ny plan' onPress={() => addAppointment()}></Button>
            <ScrollView>
                <View style={{width: "100%", alignItems: "center", flexDirection: "column",}}>
                    
                {renderComponents()}
                    <View style={{height: 60, bottom: 0, width: "100%",}}></View>
                </View> 
                   
            </ScrollView>
                    
                
            
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