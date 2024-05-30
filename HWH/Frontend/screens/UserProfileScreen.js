import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View,Pressable, Image, FlatList, TouchableOpacity } from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated,{ FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import React, { useEffect, useState, } from "react";
import axios from 'axios';


export default function UserProfileScreen() {

    const navigation = useNavigation();

    const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http:/192.168.43.116:8070/user/userdata');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
    
    
  

  
    
   

return (
    
<Pressable style={({pressed})=>pressed && styles.pressItem} >

    <View>

      <View style={{padding:20,paddingTop:20, backgroundColor:'#080742', marginTop:25}}>
        <TouchableOpacity style={styles.Edit} onPress={()=> navigation.push('Home')}>
          <Icon name="arrow-left" size={18} color="#ffff" className="pt-1.5" onPress={()=> navigation.push('Home')}/>
        </TouchableOpacity>
          
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,}}>
          <Image style={styles.image1} source={require('../assets/images/L.png')}/>
          
      {userData && ( // Conditionally render based on userData
            <>
                <Text style={styles.EditC}>{userData.NIC}</Text>
              {/*<Text style={styles.EditC}><Text>password:{userData.password}</Text></Text>*/}
                <Text style={styles.EditC}>{userData.email}</Text>
                <Text style={styles.EditC}><Text>{userData.Mobile}</Text></Text>

            </>
        )}
          
        </View>
      </View>


   
   
     {/* //console.log("Button Click")*/}

       
      <TouchableOpacity style={styles.Edit} onPress={()=> navigation.push('Payment1')}>
        <Icon name="book" size={18} color="#FF6F00" className="pt-8 pl-5 pr-5"/>
        <Text  style={styles.text3}> Payment details</Text>
      </TouchableOpacity>
              


      <TouchableOpacity style={styles.Edit} onPress={()=> navigation.push('Edit')}> 
        <Icon name="pencil" size={18} color="#FF6F00" className="pt-6 pl-5"/>
        <Text  style={styles.text4}> Edit profile</Text>
      </TouchableOpacity>
      


      <Animated.View style={{alignItems:'center', marginTop:150}} entering={FadeInDown.delay(800).duration(1000).springify()}>
        <TouchableOpacity style={{padding:20}} onPress={()=> navigation.push('Begin')}>
          <View style={{backgroundColor: '#080742',marginTop:50,borderRadius:60,alignItems:'center',height:40,width:300}}>
              <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>

</Pressable>
    
  );


}

const styles=StyleSheet.create({
  text3:{
    marginLeft:25,
    marginTop:30,
    fontSize:18
  },

  text4:{
    marginLeft:45,
    marginTop:20,
    fontSize:18
  },


  Edit:{
    flexDirection:'row',
    justifyContent:'flex-start',
    

  
  },

  Edit2:{
    flexDirection:'row',
    justifyContent:'space-between',
  
  },


  Edit1:{
    borderWidth:1,
    borderColor:'#ffffff',
    padding:3,
    borderRadius:10,
    marginBottom:20
  },

  EditC:{
    color:'white'
  },
  EditD:{
    color:'white',
    textAlign:'center'
  },

  Edit2:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  pressItem:{
    opacity:0.5
  },

  logout:{
    justifyContent:'space-between',
   
  },
  marginl:{
    padding:15,
    marginTop:180,
    borderRadius:99,
    backgroundColor:'#080742',
      textAlign:'center',
      color:'White'
    
  },
  image1:{
    width:100,
    height:100,
    margin:20,

  },

  image2:{
    width:10,
    height:10,
    paddingTop:20,
    paddingRight:25
  },


  image3:{
    width:50,
    height:50,
    paddingBottom:5,
    marginTop:20,
    
  },

  image4:{
    width:35,
    height:35,
    paddingBottom:5,
    marginTop:20,
   
    
  }


 
})