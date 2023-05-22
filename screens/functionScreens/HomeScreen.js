import { Button, Text, Touchable, TouchableOpacity, View, Image, DrawerLayoutAndroid, StyleSheet } from 'react-native'
import React, { Component, useState } from 'react'


function Menu({ navigation }) {

  const [contentTitle, SetContentTitle] = useState('Jeres Familie')


  const handleRightButtonPress = (title) => {
    console.log("right")

    if(contentTitle == "Jeres Tid"){
      SetContentTitle("Jeres Familie");
      changeBoxContent();
      
    }
    if(contentTitle == "Jeres Familie"){
      SetContentTitle("Jeres Økonomi");
      changeBoxContent();
    }
    if(contentTitle == "Jeres Økonomi"){
      SetContentTitle("Jeres Tid");
      changeBoxContent();
    }
  };

  const handleLeftButtonPress = () => {
    console.log("left")
    
    if(contentTitle == "Jeres Tid"){
      SetContentTitle("Jeres Økonomi");
      changeBoxContent();
      
    }
    if(contentTitle == "Jeres Familie"){
      SetContentTitle("Jeres Tid");
      changeBoxContent();
    }
    if(contentTitle == "Jeres Økonomi"){
      SetContentTitle("Jeres Familie");
      changeBoxContent();
    }
  };

  const changeBoxContent = () => {
    if(contentTitle == "Jeres Tid"){
      return <Text>Tid</Text>;
    }
    if(contentTitle == "Jeres Familie"){
      return <Text>Fam</Text>;
    }
    if(contentTitle == "Jeres Økonomi"){
      return <Text>Øko</Text>;
    }
  };



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



    const ProfileButton = ({imageURL}) => (
        <TouchableOpacity onPress={() => navigation.navigate('View profile')} style={{position: "absolute", top: 40, left: 285, width: 70, height: 70, borderRadius: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000',
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
        </TouchableOpacity>
    );
    
      return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition='left'
            renderNavigationView={renderNavigationView}
            >
        <View style={styles.container}>
            
            <ProfileButton imageURL={'Matt_CPU.jpg'}>
                
            </ProfileButton>

            <TouchableOpacity onPress={openDrawer} style={{position: "absolute", top: 40, right: 285, width: 70, height: 70, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text>________{'\n'}________{'\n'}________{'\n'}________</Text>
            </TouchableOpacity>

            
            <Text style={styles.welcome}>Welcome You!</Text>

            <View style={styles.container2}>
            <Button title='' onPress={handleLeftButtonPress}/>
            <Text style={styles.text}>{contentTitle}</Text>
            <Button title='' onPress={handleRightButtonPress}/>
            </View>



            <View style={styles.container3}>
            {changeBoxContent()}
            </View>
            

        </View>
        </DrawerLayoutAndroid>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      welcome: {
        fontSize: 24,
      },
      text: {
        fontSize: 24,
      },
      container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#614e19',
        padding: 16,
        top: 90,
        width: 275,
      },
      container3: {
        backgroundColor: '#fff',
        padding: 16,
        top: 100,
        width: 300,
        height: 300,
        borderColor: 'black',
        borderWidth: 2,
      },
    });
    
export default Menu;
    