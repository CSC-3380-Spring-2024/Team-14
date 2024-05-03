import React from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, FlatList, Pressable} from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { Quotes} from '../../Types';
import { getAuth, signOut } from 'firebase/auth';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';
import CheckboxButton from '../Buttons/CheckboxButton';
import { getDatabase, onValue, ref } from 'firebase/database'
import { Habit, addHabitTime, getHabitByID, getHabitsByCurrentUser } from '../../firebase/Database';
import { time } from 'console';
//import { FlatList } from 'react-native-gesture-handler';
// import { getapi } from '../../Quotes';


export default function HomeMenu({ navigation }: any) {
    //TODO: Add functions to do their respective tasks once they are implemented
    //TODO: Interface with the backend in order to save the user's response.
    let [DATA, setData] = React.useState([] as Habit[])
    //let [ data, setData ] = React.useState([] as Journal[])
    let days:string[] = ["monday", "tuesday", "wednsday", "thursday", "friday"];

    let [quote, updateQuote] = React.useState({q: 'haiii', a: '- T'});
    //let user = getAuth().currentUser?.uid;
    
    React.useEffect(() => {
        let ignore = false;
        async function getHabits(){
            getHabitsByCurrentUser().then((habits) => {
                if(!ignore){
                    // let todaysHabits: Habit[] = [];
                    // let currentDay:number = new Date().getDay();
                    // habits.forEach(function (i) {
                    //     i.daysToComplete[days[currentDay]];
                        
                        
                         
                    // });
                    // console.log(todaysHabits);
                    setData(habits);
                    //console.log("habit done:");
                    //console.log(DATA);
                }
            });
        }

        onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/habits`), (data) =>{
            getHabits();
        })
        return () => {ignore = true};
    }, []);
    const [fontsLoaded] = useFonts({Inter_400Regular});

    function UTCToTime(UTCms: number){
        return UTCms%86400000;
    }
    
    function HabitIsDone(habit : Habit): boolean {
        console.log(habit);
        let currentDate: string = new Date().toDateString();
        console.log("current date: " + currentDate);
        if(habit.lastTimeComplete !== undefined){
            let lastDone: number = habit.lastTimeComplete;
            console.log("Last UTC time done: " + lastDone);
            if(currentDate === new Date(lastDone).toDateString()){
                let recentTime: number = UTCToTime(lastDone);
                console.log("Recent UTC to time: " + recentTime);
                let currentTime = UTCToTime(Date.now());
                console.log(currentTime);
                console.log("Current time UTC to time: " + currentTime);
                let TimeList = Object.values(habit.timesToComplete);
                
                let i: number = 0;
                while(currentTime > TimeList[i]){
                    i++;
                }
        
                let j: number = 0;
                while(currentTime > TimeList[j]){
                    j++;
                }
                console.log("i: " + i);
                console.log("j: " + j);
                return i === j;
                // return true;
            } else {
                console.log("no previous time logged")
                return false;
            }

            

        } else {
            return false;
        }
    } 
    

    async function getQuote(){
        const url:string ="https://zenquotes.io/api/random";
        const response = await fetch(url);
        let data = await response.json();
        let quotes: Quotes = data[0];
        updateQuote(quotes);
    }

    let [input, onChangeInput] = React.useState('');
    return (
        <SafeAreaView style={styles.overlord}>
            {/*<View style={{zIndex: 1}}>
                <Menu />
            </View>*/}
            <ScrollView style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.header2}>
                            Hi, John!
                    </Text>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header2}>
                            {"\"" + quote.q + "\""}
                        </Text>
                        <Text style={styles.prompt}>
                            {"-" + quote.a}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {new Date().toDateString()}
                        </Text>
                    </View>
                    
                    <View style = {styles.buttonBox}>
                        {/* <GeneralButton buttonText={"Start Today's Entry"} onPress = {() => null}/> */}
                        <GeneralButtonDark onPress={() => navigation.navigate("NewJournal")} buttonText="Start Today's Entry" textStyle={styles.buttonText} containerStyle={styles.button}/>
                    </View>
                    <View>
                        <Text style={styles.header2}>
                            Today's Task
                        </Text>
                    </View>
                    <View style = {styles.habitBox}>
                        {   DATA.length > 0 ?
                            DATA.map((item, index) => {
                            return <CheckboxButton  onPress={() => {
                                    if(HabitIsDone(item)){
                                        console.log("Habit is done today, switch to not done");
                                        //uncomment later when you have habiti time removal done
                                        //item.lastTimeComplete = undefined;
                                        //add database logic later :3
                                    } else {
                                        console.log("habit was not done, changing to completed");
                                        let timestamp: number = Date.now();
                                        item.lastTimeComplete = timestamp;
                                        addHabitTime(item.uid, timestamp);
                                    }}} buttonText={(item.uid === undefined)? ":c" : item.title} containerStyle={styles.checkButton} checked = {HabitIsDone(item)} key = {index + ""}/>;
                            }) : <Text>:c</Text>
                        }
                    </View>

                    <View>
                    {/* <GeneralButtonLight buttonText='refresh' onPress={()=> getHa}></GeneralButtonLight> */}
                    </View>
                    <GeneralButtonDark onPress={ () => signOut(getAuth()) } buttonText='Sign Out'/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        zIndex: 0,
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: '#050B24',
    },
    headerWrapper: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#f2f9ff',
        flex:1
    },
    header2: {
        fontSize: 20,
    },
    prompt: {
        fontSize: 15,
        color: 'black',
        padding: 10,
    },
    top: {
        fontSize: 30,
        // flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    buttonBox:{
        width:'100%',
        alignItems:'center'
    },
    button: {
        height: 50,
        width: '90%',
        margin: 10,
        borderRadius: 12,
        flexDirection:'row',
    },
    checkButton:{
        height: 50,
        width: '90%',
        margin: 10,
        borderRadius: 12,
        justifyContent:'flex-start'
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center'
    },
    habitBox:{
        borderWidth:1,
        borderRadius: 12,
        width:'90%',
        height:400,
        alignItems:'center'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
        fontFamily: "Inter_400Regular"
    }
}
)