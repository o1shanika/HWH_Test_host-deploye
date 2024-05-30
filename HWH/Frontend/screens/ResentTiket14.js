import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResentTiket14() {
  const navigation = useNavigation();
  const [P, setP] = useState('');
  const [p2, setP2] = useState('');
  const [Entrance, setEntrance] = useState('');
  const [Exit, setExit] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [ticketAmount, setTicketAmount] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  {/*useEffect(() => {
    const getData = async () => {
      try {
        const storedP = await AsyncStorage.getItem('P');
        const storedP2 = await AsyncStorage.getItem('p2');
        if (storedP !== null && storedP2 !== null) {
          setP(storedP);
          setP2(storedP2);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    getData();
  }, []);*/}

  useEffect(() => {
    const fetchSelectedVehicle = async () => {
      try {
        const storedVehicle = await AsyncStorage.getItem('selectedVehicle');
        if (storedVehicle !== null) {
          setSelectedVehicle(JSON.parse(storedVehicle));
        }
      } catch (error) {
        console.error('Error retrieving selected vehicle:', error);
      }
    };
    fetchSelectedVehicle();
  }, []);

  useEffect(() => {
    const fetchEntrance = async () => {
      try {
        const storedEntrance = await AsyncStorage.getItem('Entrance');
        setEntrance(storedEntrance || '');
      } catch (error) {
        console.error('Error fetching entrance:', error);
      }
    };
    fetchEntrance();
  }, []);

  useEffect(() => {
    const fetchExit = async () => {
      try {
        const storedExit = await AsyncStorage.getItem('Exit');
        setExit(storedExit || '');
      } catch (error) {
        console.error('Error fetching exit:', error);
      }
    };
    fetchExit();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toDateString();
      const time = now.toLocaleTimeString();
      setCurrentDate(date);
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTicketAmount = async () => {
      try {
        const storedTicketAmount = await AsyncStorage.getItem('ticketAmount');
        if (storedTicketAmount !== null) {
          setTicketAmount(storedTicketAmount);
          
          // Set timeout to clear ticketAmount after 3 minutes
          setTimeout(async () => {
            await AsyncStorage.removeItem('ticketAmount');
            setTicketAmount(null);
          }, 180000); // 3 minutes in milliseconds
        }
      } catch (error) {
        console.error('Error fetching ticket amount:', error);
      }
    };

    fetchTicketAmount();
  }, []);

  useEffect(() => {
    // Set timeout to clear Entrance after 3 minutes
    setTimeout(async () => {
      await AsyncStorage.removeItem('Entrance');
      setEntrance('');
    }, 180000); // 3 minutes in milliseconds
  }, []);

  useEffect(() => {
    // Set timeout to clear Exit after 3 minutes
    setTimeout(async () => {
      await AsyncStorage.removeItem('Exit');
      setExit('');
    }, 180000); // 3 minutes in milliseconds
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.header}>
        <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('Home')} />
        <Text style={styles.title}>HighWay Hub</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.push('user')}>
          <Image source={require('../assets/images/profile.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View className="w-full p-1 mt-5 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
        <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>Recent Ticket</Text>
      </View>

      <View style={styles.ticketContainer}>
        <View style={styles.ticketUpperBox}>
          <View style={styles.ticketBox}>
            
            <Text style={styles.ticketText2}>OUTER CIRCULAR EXPRESSWAY</Text>
            <Text style={styles.ticketText3}>USER FEE TICKET</Text>
          </View>
        </View>
        <View style={styles.ticket}>
          
          <Text style={styles.ticketText}>Date: {currentDate}</Text>
          <Text style={styles.ticketText}>Time: {currentTime}</Text>
          <Text style={styles.ticketText}>Entrance Gate: {Entrance}</Text>
          <Text style={styles.ticketText}>Exit Gate: {Exit}</Text>
          {selectedVehicle && (
        <View>
          <Text style={styles.ticketText}>Vehicle number: {selectedVehicle.register_no}</Text>
          
        </View>
      )}
      
          <Text style={styles.ticketText}>Amount: {ticketAmount}</Text>
        </View>
      </View>
      <Text style={styles.ticketText4}>Thank You Come Again ! </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#080742',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FF6F00',
    fontSize: 20,
  },
  profileIcon: {
    padding: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  ticketContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  ticket: {
    backgroundColor: '#E0E0E0',
    padding: 30,
    borderRadius: 10,
    height: 350,
    width: 250,
    marginTop: 30,
    borderWidth: 2, 
    borderColor: '#080742',  
    marginBottom: 20, 
  },
  ticketText: {
    fontSize: 16,
    marginTop: 10,
  },
  ticketText2: {
    fontSize: 16,
    marginTop: 10,
    color: '#080742',
    textAlign: 'center',
  },
  ticketText3: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#080742',
    
  },
  ticketText4: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#080742',
    
  },
});
