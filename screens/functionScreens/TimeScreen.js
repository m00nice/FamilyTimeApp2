import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { getISOWeek, setISODay } from 'date-fns';
import { database, storage } from '../../config/firebase';
import { onSnapshot, query} from 'firebase/firestore';
import {doc, setDoc, addDoc, getDoc, updateDoc, collection, getDocs, deleteField, FieldValue, Timestamp} from 'firebase/firestore'
import 'firebase/firestore';

function TimeScreen({ navigation, route }) {
  /*
  const Coll = "profiles"
  const [profilesDB, SetProfileDB] = useState([])

  const getProfiles = async () => {
    const collRef = collection(database, Coll)
    
  }

  useEffect(() => {
    getProfiles();

  },[displayDay])
*/
    const [appointments, setAppointments] = useState([])
    
    const [today, setToday] = useState(new Date())
    const [thisWeek, setThisWeek] = useState(getISOWeek(new Date()))

    const [displayDay, setDisplayDay] = useState(new Date())
    const [displayWeek, setDisplayWeek] = useState(getISOWeek(new Date()))
    let dateString = displayDay.toLocaleDateString();

    const [linePos, setLinePos] = useState(0);
    const [Appointment, SetAppointment] = useState([]);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setToday(new Date())
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const totalMinutes = 60 * hours + minutes;
        setLinePos(totalMinutes);
      }, 60000)
      return () => clearInterval(interval);
    },)

    useEffect(() => {
      const docRef = doc(database, "Users", "vMUxCNUEnHwW8XDsGgkO")
      
      const getAppointments = async () => {
      try{
        const docSnapshot = await getDoc(docRef)

        const currentArray = docSnapshot.get('appointments')

        const entries = Object.entries(currentArray)

        const filteredArray = entries.filter(([key, value]) => {
          
          const startDate = value[1]
          
          
          const formattedStartDate = startDate instanceof Timestamp ? startDate.toDate() : startDate
          

          return formattedStartDate.getDate() === displayDay.getDate();
        })
        

        const sortedArray = filteredArray.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
        setAppointments(sortedArray)
        
        
      }catch(error){
        console.error("error fetching appointments",error);
      }
    }
    getAppointments();

  },[displayDay])

    const renderAppointments = () => {
      let counter = 0;
      return appointments.map(([key, value]) => { 
        const title = value[0]
        const start = new Date(value[1].seconds * 1000 + Math.floor(value[1].nanoseconds/1000000))
        console.log(value[1])
        const end = new Date(value[2].seconds * 1000 + Math.floor(value[2].nanoseconds/1000000))
        const topHours = start.getHours()
        const topMinutes = start.getMinutes();
        console.log(topMinutes)
        const topPos =  topHours*60+topMinutes 
        console.log(topPos)
        const botHours = end.getHours()
        const botMinutes = end.getMinutes();
        const botPos = (botHours*60+botMinutes)-topPos
        console.log(botPos)
        counter += 60;
        if (counter > 240) {
        counter = 0;
        }
        return (
          <View key={key} style={{ top: topPos, height: botPos, backgroundColor: "blue", position: "absolute", width: 60, right: counter, zIndex: 1,}}>
            <Text>{title}</Text>
            <Text>{start.toLocaleTimeString()} to {end.toLocaleTimeString()}</Text>
          </View>
          )
      })
    }

    const dayButton = (number) => {
      const day = displayDay.getDay();
      const diff = displayDay.getDate() - day + (day === 0 ? -6: number)
      const newDate = new Date(displayDay.setDate(diff))
      
      setDisplayDay(newDate)
      setDisplayWeek(getISOWeek(newDate))
    };
    
    const weekForwardButton = () => {
      newDate = new Date(displayDay.getTime());
      newDate.setDate(newDate.getDate() + 7);
      setDisplayDay(newDate);

      newWeek = getISOWeek(newDate);
      setDisplayWeek(newWeek);
    };
    
    const weekBackwardsButton = () => {
      newDate = new Date(displayDay.getTime());
      newDate.setDate(newDate.getDate() - 7);
      setDisplayDay(newDate);

      newWeek = getISOWeek(newDate);
      setDisplayWeek(newWeek);
    };

    const handleDataFromFirebase = () => {
      //
      //
    }

    const addProfile = (id, name, color) => {
      const newProfile = (
          <TouchableOpacity onPress={hideApp(id)} style={{top: 3, width: 70, height: 70, borderRadius: 40, backgroundColor: {color}, alignItems: 'center', justifyContent: 'center', shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,}}>
          <Image
          style={{width: 50, height: 50, borderRadius: 25,}}
          source={imageURL}
          />
          <Text>{name}</Text>
  </TouchableOpacity>
      )

      SetProfiles(prevProfiles => [... prevProfiles, newProfile])
  }







    return (
        <View style={styles.container}>
        <View style={styles.container2}>
            <ScrollView horizontal>
                
                
                
                
                
            </ScrollView>
            
        </View>
        <View style={styles.container3}>
            <View style={styles.container4}>
                <Button title='<' onPress={weekBackwardsButton}></Button>
                    <Text style={{fontSize: 24, color: "white",}}>Uge {displayWeek}</Text>
                <Button title='>' onPress={weekForwardButton}></Button>
            </View>
            <View style={styles.container5}>
            <Button title='Man' onPress={() => dayButton(1)}></Button>
            <Button title='Tir' onPress={() => dayButton(2)}></Button>
            <Button title='Ons' onPress={() => dayButton(3)}></Button>
            <Button title='Tor' onPress={() => dayButton(4)}></Button>
            <Button title='Fre' onPress={() => dayButton(5)}></Button>
            <Button title='Lør' onPress={() => dayButton(6)}></Button>
            <Button title='Søn' onPress={() => dayButton(7)}></Button>
            </View>
            <Text style={{top: "21%"}}>{dateString}</Text>
            <View style={styles.container6}>
              

                <ScrollView >
                    <View style={styles.container7}>
                      <View style={[styles.line , { top: linePos }]}></View>
                      
                    <Text style={styles.hourMark}>00 - 01</Text>
                    
                    <Text style={styles.hourMark}>01 - 02</Text>

                    <Text style={styles.hourMark}>02 - 03</Text>

                    <Text style={styles.hourMark}>03 - 04</Text>

                    <Text style={styles.hourMark}>04 - 05</Text>

                    <Text style={styles.hourMark}>05 - 06</Text>

                    <Text style={styles.hourMark}>06 - 07</Text>

                    <Text style={styles.hourMark}>07 - 08</Text>

                    <Text style={styles.hourMark}>08 - 09</Text>

                    <Text style={styles.hourMark}>09 - 10</Text>

                    <Text style={styles.hourMark}>10 - 11</Text>

                    <Text style={styles.hourMark}>11 - 12</Text>

                    <Text style={styles.hourMark}>12 - 13</Text>

                    <Text style={styles.hourMark}>13 - 14</Text>

                    <Text style={styles.hourMark}>14 - 15</Text>

                    <Text style={styles.hourMark}>15 - 16</Text>

                    <Text style={styles.hourMark}>16 - 17</Text>

                    <Text style={styles.hourMark}>17 - 18</Text>

                    <Text style={styles.hourMark}>18 - 19</Text>

                    <Text style={styles.hourMark}>19 - 20</Text>

                    <Text style={styles.hourMark}>20 - 21</Text>

                    <Text style={styles.hourMark}>21 - 22</Text>

                    <Text style={styles.hourMark}>22 - 23</Text>

                    <Text style={styles.hourMark}>23 - 00</Text>
                    <View style={{top: 0, right: "0%", height: "91.15%", position: "absolute", width: "85%", zIndex: 1,}}>
                          {renderAppointments()}
                    </View>
                    
                    
                    <Text style={{height: 140, bottom: 0, backgroundColor: "#454343",  width: "100%",}}></Text>
                    </View>
                </ScrollView>
            </View>
        </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      },
      container2: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        top: "5%",
        width: '100%',
        backgroundColor: '#6b6b6b',
      },
      container3: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: "0%",
        width: '100%',
        backgroundColor: '#b9c4bc',
      },
      container4: {
        position: "absolute",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#454343',
        padding: 16,
        top: "0%",
        width: "100%",
        
      },
      container5: {
        position: "absolute",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#454343',
        padding: 16,
        top: "9%",
        width: "100%",
        
      },
      container6: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        top: "35%",
        width: "100%",
        bottom: "100%"
        
        
      },
      container7: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: "100%",
      },

      hourMark: {
        textAlignVertical: "center",
        textAlign: "center",
        backgroundColor: "#ffffff",
        height: 60,
        width: "15%",
        borderColor: "black",
        borderWidth: 1,
        zIndex: 1,
        
      },

      line: {
        width: "100%",
        height: 1,
        backgroundColor: 'red',
        position: "absolute",
        zIndex: 1,
      },
      
    name: {
        fontSize: 30,
    },

    fam: {
    width: 100,
    height: 110,
    top: 2,
    marginHorizontal: 3,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: "black",
    borderWidth: 1,
    }
  });

export default TimeScreen;