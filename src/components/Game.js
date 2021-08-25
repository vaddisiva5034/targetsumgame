import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RandomNumber } from "./RandomNumber";
import * as Progress from "react-native-progress";

export const Game = ({ randomNumberCount, setEndGame }) => {
  const [randomNumbers] = useState(
    Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    )
  );
  const [progress, setProgress] = useState(1000);
  const [sum, setSum] = useState(0);
  const [targetSum] = useState(
    randomNumbers
      .slice(0, randomNumberCount - 2)
      .reduce((acc, randomNumber) => acc + randomNumber, 0)
  );

  useEffect(() => {
    const timeOut = setInterval(() => {
      setProgress((pre) => pre - 1);
      //Alert.alert("time up");
      // setEndGame(true);
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    if (sum === targetSum) {
      Alert.alert("you won");
      setEndGame(true);
    } else if (sum > targetSum) {
      Alert.alert("you lost");
      setEndGame(true);
    }
  }, [sum]);
  const handlePress = (number) => {
    setSum((preSum) => preSum + number);
  };
  useEffect(() => {
    if (progress == 0) {
      Alert.alert("time up");
      setEndGame(true);
    }
  }, [progress]);
  return (
    <View>
      <Progress.Bar
        progress={progress / 1000}
        width={350}
        height={10}
        color={progress / 1000 < 0.3 ? "red" : "green"}
      />
      <Text style={styles.target}>{targetSum}</Text>

      <View style={styles.numberContainer}>
        {randomNumbers.map((number, index) => (
          <RandomNumber
            key={index}
            number={number}
            handlePress={() => {
              handlePress(number);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
  },
  target: {
    fontSize: 40,
    backgroundColor: "#aaa",
    textAlign: "center",
    margin: 50,
  },
  numberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
