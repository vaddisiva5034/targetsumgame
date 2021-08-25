import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Game } from "./src/components/Game";

export default function App() {
  const [endGame, setEndGame] = useState(true);
  return (
    <View style={styles.container}>
      {endGame ? (
        <TouchableOpacity
          onPress={() => {
            setEndGame(false);
          }}
        >
          <Text style={styles.startGame}>start Game</Text>
        </TouchableOpacity>
      ) : (
        <Game randomNumberCount={6} setEndGame={setEndGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  startGame: {
    fontSize: 40,
    backgroundColor: "#aaa",
    marginVertical: 40,
    marginHorizontal: 40,
    textAlign: "center",
  },
});
