import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignupScreen() {
    const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white' , marginTop:25}}>
        <StatusBar style='dark'/>
        <View className="bg-blue-950 w-full p-4 absolute flex-row justify-between" style={{backgroundColor:'#080742'}}>
        <Icon name="arrow-left" size={18} color="#ffff" className="pt-1.5" onPress={()=> navigation.push('Home')}/>
        <Text className="text-center  text-xl" style={{color:'#FF6F00'}}>   HighWay Hub</Text>
        <TouchableOpacity style={{padding:5}} onPress={()=> navigation.push('user')}>
          <Image source={require('../assets/images/profile.jpg')} className="w-6 h-6 rounded-3xl"/>
        </TouchableOpacity>
      </View>

        <View className="w-full p-1 mt-20 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
          <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>Payment Methods</Text>
        </View>

          <Animated.View style={{width:'90%', height:75,backgroundColor:'#D9D9D9',left:'5%',marginTop:60,borderRadius:15}} entering={FadeInDown.duration(1000).springify()}>
              <Icon name="credit-card" size={30} color="#080742" style={{padding:20}}/>
              <Text style={{position:'absolute',padding:13,color:'#022043',width:'60%', left:80,fontSize:15}}>Master</Text>
              <Text style={{position:'absolute',padding:35,color:'#022043',width:'80%', left:57,fontSize:15}}>**** **** **** 8976</Text>
          </Animated.View>

          <Animated.View style={{width:'90%', height:75,backgroundColor:'#D9D9D9',left:'5%',marginTop:20,borderRadius:15}} entering={FadeInDown.delay(200).springify()}>
              <Icon name="credit-card" size={30} color="#080742" style={{padding:20}}/>
              <Text style={{position:'absolute',padding:13,color:'#022043',width:'60%', left:80,fontSize:15}}>Visa</Text>
              <Text style={{position:'absolute',padding:35,color:'#022043',width:'80%', left:57,fontSize:15}}>**** **** **** 5684</Text>
          </Animated.View>

          <Animated.View style={{width:'90%', height:75,backgroundColor:'#D9D9D9',left:'5%',marginTop:20,borderRadius:15}} entering={FadeInDown.delay(400).springify()}>
              <Icon name="credit-card" size={30} color="#080742" style={{padding:20}}/>
              <Text style={{position:'absolute',padding:13,color:'#022043',width:'60%', left:80,fontSize:15}}>Master</Text>
              <Text style={{position:'absolute',padding:35,color:'#022043',width:'80%', left:57,fontSize:15}}>**** **** **** 4584</Text>
          </Animated.View>

          <Animated.View style={{alignItems:'center'}} entering={FadeInDown.delay(600).duration(1000).springify()}>
            <TouchableOpacity style={{padding:20}} onPress={()=> navigation.push('Payment2')}>
              <View style={{backgroundColor: '#080742',marginTop:50,borderRadius:60,alignItems:'center',height:40,width:300}}>
                  <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Add Another Card</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

    </View>
    
  )
}