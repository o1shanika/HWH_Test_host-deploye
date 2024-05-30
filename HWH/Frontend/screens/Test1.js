import React, { useState } from "react";
import { View, Text, Alert, Button } from "react-native";
import { Input } from "react-native-elements"; // Changed import statement

export default function Test1() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const register = () => {
    // Your register function remains the same
    console.log("Registering...");
  };

  return (
    <View style={{ backgroundColor: "gray" }}>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />

      <Button title="Register" onPress={register} />
    </View>
  );
}


