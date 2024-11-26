import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { RefereeRole } from "../types";

interface HomeScreenProps {
  navigation: FrameNavigationProp<any, "home">;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [role, setRole] = React.useState<RefereeRole | null>(null);

  const handleCreateGame = () => {
    navigation.navigate("createGame");
  };

  const handleJoinGame = () => {
    navigation.navigate("joinGame");
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl font-bold mb-8">Welcome to FutComms</label>

      <button
        className="bg-green-500 text-white p-4 rounded-lg mb-4 w-64"
        onTap={handleCreateGame}
      >
        Create New Game
      </button>

      <button
        className="bg-blue-500 text-white p-4 rounded-lg w-64"
        onTap={handleJoinGame}
      >
        Join Game
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});