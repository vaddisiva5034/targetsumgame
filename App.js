import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Game } from "./src/components/Game";

export default function App() {
  const [score, setScore] = useState(0);

  const [endGame, setEndGame] = useState(true);
  const isWon = (won) => {
    if (won) {
      setScore((prev) => prev + 1);
    } else {
      setScore(0);
    }
    setEndGame(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score : {score}</Text>
      {endGame ? (
        <TouchableOpacity
          onPress={() => {
            setEndGame(false);
          }}
        >
          <Text style={styles.startGame}>
            {score > 0 ? "continue" : "start new Game"}
          </Text>
        </TouchableOpacity>
      ) : (
        <Game randomNumberCount={6 + Math.floor(score / 5)} isWon={isWon} />
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
  score: {
    fontSize: 40,
    color: "red",
  },
});
