import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RandomNumber } from "./RandomNumber";
import * as Progress from "react-native-progress";

const progressTimeLimit = 20;
export const Game = ({ randomNumberCount, isWon }) => {
  const [randomNumbers] = useState(
    Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(10 * Math.random() * (randomNumberCount - 5))
    )
  );
  const [progress, setProgress] = useState(progressTimeLimit);
  const [sum, setSum] = useState(0);

  const [targetSum] = useState(
    randomNumbers.reduce(
      (acc, randomNumber) => (Math.random() > 0.5 ? acc + randomNumber : acc),
      0
    ) || randomNumbers[3]
  );

  useEffect(() => {
    const timeOut = setInterval(() => {
      setProgress((pre) => pre - 1);
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    if (sum === targetSum) {
      isWon(true);
    } else if (sum > targetSum) {
      Alert.alert("you lost");
      isWon(false);
    }
  }, [sum]);

  const handlePress = (number) => {
    setSum((preSum) => preSum + number);
  };

  useEffect(() => {
    if (progress == 0) {
      Alert.alert("time up");
      isWon(false);
    }
  }, [progress]);
  return (
    <View>
      <Progress.Bar
        progress={progress / progressTimeLimit}
        width={350}
        height={10}
        color={progress / progressTimeLimit < 0.3 ? "red" : "green"}
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
