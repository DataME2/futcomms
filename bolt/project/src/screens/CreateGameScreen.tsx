import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { bluetoothService } from "../services/BluetoothService";
import { Game, RefereeRole, User } from "../types";

interface CreateGameScreenProps {
  navigation: FrameNavigationProp<any, "createGame">;
}

export function CreateGameScreen({ navigation }: CreateGameScreenProps) {
  const [homeTeam, setHomeTeam] = React.useState("");
  const [awayTeam, setAwayTeam] = React.useState("");
  const [scanning, setScanning] = React.useState(false);
  const [connectedReferees, setConnectedReferees] = React.useState<User[]>([]);

  React.useEffect(() => {
    initializeBluetooth();
  }, []);

  const initializeBluetooth = async () => {
    const initialized = await bluetoothService.initialize();
    if (!initialized) {
      // Show error message
    }
  };

  const startScanning = async () => {
    setScanning(true);
    const scanner = await bluetoothService.startScanning();
    scanner.subscribe((peripheral) => {
      // Handle discovered peripheral
    });
  };

  const createGame = async () => {
    if (!homeTeam || !awayTeam) {
      // Show error message
      return;
    }

    const game: Game = {
      id: Date.now().toString(),
      homeTeam,
      awayTeam,
      principalReferee: {} as User, // Add current user
      assistantReferees: connectedReferees,
      date: new Date(),
      status: 'PENDING'
    };

    // Save game and navigate to field setup
    navigation.navigate("fieldSetup", { game });
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl font-bold mb-6">Create New Game</label>

      <textField
        style={styles.input}
        hint="Home Team"
        text={homeTeam}
        onTextChange={(e) => setHomeTeam(e.value)}
      />

      <textField
        style={styles.input}
        hint="Away Team"
        text={awayTeam}
        onTextChange={(e) => setAwayTeam(e.value)}
      />

      <button
        className={`p-4 rounded-lg mb-4 w-64 ${scanning ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
        onTap={scanning ? bluetoothService.stopScanning : startScanning}
      >
        {scanning ? 'Stop Scanning' : 'Scan for Referees'}
      </button>

      <stackLayout className="mb-4">
        <label className="text-lg font-semibold mb-2">Connected Referees:</label>
        {connectedReferees.map((referee) => (
          <label key={referee.id} className="text-md">
            {referee.name} - {referee.role}
          </label>
        ))}
      </stackLayout>

      <button
        className="bg-green-500 text-white p-4 rounded-lg w-64"
        onTap={createGame}
      >
        Create Game
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});