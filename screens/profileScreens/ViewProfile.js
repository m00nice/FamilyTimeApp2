import { Button, Text, Touchable, TouchableOpacity, View, Image, DrawerLayoutAndroid, StyleSheet } from 'react-native'
import React, { Component, useState } from 'react'




function ViewProfile({ navigation, route }) {

  const [name, setName] = useState('Name Nameson')
  const [colour, setColour] = useState('Blue')
  const [gender, setGender] = useState('Mand')
  const [age, setAge] = useState('23')
  

    const drawer = React.useRef(null);

    const openDrawer = () => {
        drawer.current.openDrawer();
    };

    const closeDrawer = () => {
        drawer.current.closeDrawer();
    };
    
    const renderNavigationView = () => {
        return (
          <View style={{ flex: 1, top: 40, backgroundColor: '#fff' }}>
            <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>
              Menu
            </Text>
            <Button title='Min Familie' onPress={() => navigation.navigate('Your family')}></Button>
            <Button title='Økonomi' onPress={() => navigation.navigate('Economy')}></Button>
            <Button title='Tidsplan' onPress={() => navigation.navigate('Timeplan')}></Button>
          </View>
        );
      };

      const ProfileButton = ({imageURL}) => {
        return (<TouchableOpacity onPress={() => navigation.navigate('Edit profile')} style={{position: "absolute", top: 40, width: 300, height: 300, borderRadius: 300, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000',
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
        </TouchableOpacity>)
    };


      return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition='left'
            renderNavigationView={renderNavigationView}
            >
        <View style={styles.container}>
        <ProfileButton imageURL={"./Matt_CPU.jpg"}>
                
        </ProfileButton>
        <View style={styles.container2}>
        <Text style={styles.name}>{name}</Text>
        <Text>Køn: {gender}</Text>
        <Text>Alder: {age}</Text>
        <Text>Color: {colour}</Text>
        <Button title='Dine Planer' onPress={() => navigation.navigate('Edit Appointments')}></Button>
        <Button title='Din Familie'></Button>
        <Button title='Dit Familie Træ'></Button>
        <Button title='Log ud' onPress={() => navigation.navigate('Welcome')}></Button>
        </View>
        </View>
        </DrawerLayoutAndroid>
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
        container2: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            top: 70,
          },
      });
export default ViewProfile;