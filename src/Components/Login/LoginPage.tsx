import React, { useContext } from 'react';
import {Image, View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { AuthContext } from '../../AuthContext'; 

//potentionally add eye icon to mask and unmask
//incorrect password/email
//if click outside keyboard get rid off, no worky in android?
//confirm password

export default function LoginPage({navigation}) {
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    let auth = useContext(AuthContext);


    function handleLogin() {
        auth.login();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
        <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.overlord}>
                <View style={styles.top}>
                    <Text style={styles.header}>
                        Welcome!
                    </Text>
                </View>
                <View style={styles.container}> 
                    <View style={styles.texboxWithLabel}>
                        <Text style={styles.label}>
                            Email:
                        </Text>
                        <TextInput
                            editable 
                            onChangeText={text => setEmail(text)} 
                            value={email} placeholder="" 
                            autoCapitalize="none"
                            style={styles.inputField} 
                            numberOfLines={1}
                        />
                    </View>
                    <View style={styles.texboxWithLabel}>
                        <Text style={styles.label}>
                            Password:
                        </Text>
                        <TextInput  
                            editable 
                            onChangeText={text => setPassword(text)} 
                            value={password} placeholder=""
                            autoCapitalize="none"
                            secureTextEntry
                            style={styles.inputField} 
                            numberOfLines={1}
                        />
                    </View>
                    <GeneralButtonDark buttonText={"Log In"} onPress={handleLogin} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: 0}}/>
                <Pressable
                    onPress={() => navigation.navigate("SignUp")}>
                    {({ pressed }) => (
                <Text style={[styles.thin, {opacity: pressed ? 0.5 : 1}]}>
                        Don't have an account? Sign up!
                </Text>)}
                </Pressable>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create( {
    top: {
        alignItems: 'center'
    },
    container: {
        alignItems: 'center'
    },
    header: {
        marginTop: '70%',
        marginBottom: '5%',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#050B24',
        alignItems: 'center'
    },
    label: {
        color: '#050B24',
        marginBottom: 2,
        textAlign: 'left' //how to align labels to the left of the boxes, not screen?? use views!!
    },
    inputField: {
        marginBottom: '10%',
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: '3%',
        height: '50%'
    },
    texboxWithLabel: {
        width: '78%',
        height: 100
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    thin: {
        alignItems: 'center',
        fontWeight: '100',
        color: '#050B24'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});