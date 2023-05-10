import { Button, Text, Touchable, TouchableOpacity, View, Image, DrawerLayoutAndroid } from 'react-native'
import React, { Component } from 'react'


function Menu({ navigation }) {

    const drawer = React.useRef(null);

    const openDrawer = () => {
        drawer.current.openDrawer();
    };

    const closeDrawer = () => {
        drawer.current.closeDrawer();
    };
    
    const renderNavigationView = () => {
        return (
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>
              Side Menu
            </Text>
          </View>
        );
      };



    const ProfileButton = ({imageURL, OnPress}) => (
        <TouchableOpacity onPress={OnPress} style={{position: "absolute", top: 1, left: 275, width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000',
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
        <View>
            
            <ProfileButton onPress={console.log("yo")} imageURL={"./Matt_CPU.jpg"}>
                
            </ProfileButton>

            <TouchableOpacity onPress={openDrawer}>
                <Text>Open Menu</Text>
            </TouchableOpacity>

            
        </View>
        </DrawerLayoutAndroid>
      );
    }
    
export default Menu;
    