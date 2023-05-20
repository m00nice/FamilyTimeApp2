import React, { useState } from 'react';
import { ScrollView, Button, View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';




function FamilyScreen({ navigation, route }) {

    const ProfileButton = ({imageURL}) => (
        <TouchableOpacity onPress={() => navigation.navigate('View profile')} style={{position: "absolute", top: 20, left: 265, width: 70, height: 70, borderRadius: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000',
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

    const FamMember = () => (
        <View style={{width: "100%", height: "15%", backgroundColor: '#fff', justifyContent: "center",}}>
        <Text style={{fontSize: 24,}}>
            Name Nameson
        </Text>
        <ProfileButton></ProfileButton>
        </View>
    );

    const genFamMembers = () => {
        
    }

    return (
        <View style={styles.container}>
            <FamMember></FamMember>
            {genFamMembers()}
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

export default FamilyScreen;