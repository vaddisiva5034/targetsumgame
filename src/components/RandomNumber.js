import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export function RandomNumber({ number, handlePress }) {
  const [disbale, setDisable] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setDisable(true);
        handlePress();
      }}
      disabled={disbale}
    >
      <Text style={{ ...styles.random, color: disbale ? "#3d3d5c" : "blue" }}>
        {number}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  random: {
    width: 100,
    fontSize: 40,
    backgroundColor: "#aaa",
    marginVertical: 40,
    marginHorizontal: 40,
    textAlign: "center",
  },
});
