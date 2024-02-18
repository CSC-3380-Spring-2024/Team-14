import React, { useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, FlatList, StatusBar, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MenuButton from './MenuButton'



export default function Menu() {
    return(
        <View style={styles.container}>
            <Text style={styles.header}>
                Journal Buddy
            </Text>
            <FlatList 
                renderItem={({item}) => <MenuButton style={styles.button} buttonText={item}/>}
                data={DATA}
            />
        </View>
    )
}


const DATA = ["test.", "test.", "test.", "test."]

const styles = StyleSheet.create( {
    container: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'baseline',
        backgroundColor: '#dcdede',
        borderRightColor: 'black',
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        width: 225,
        height: 1000,
        flex: 1
    },
    button: {
        flex: 1,
        fontSize: 20,
        marginBottom: 20
    },
    header: {
        fontSize: 25,
        paddingLeft: 50
    }
})