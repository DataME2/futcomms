import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";

interface LoginScreenProps {
  navigation: FrameNavigationProp<any, "login">;
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      // TODO: Implement Firebase authentication
      navigation.navigate("home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // TODO: Implement Google Sign-In
      navigation.navigate("home");
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl font-bold mb-8">FutComms</label>
      
      <textField
        style={styles.input}
        hint="Email"
        keyboardType="email"
        autocorrect={false}
        autocapitalizationType="none"
        text={email}
        onTextChange={(e) => setEmail(e.value)}
      />

      <textField
        style={styles.input}
        hint="Password"
        secure={true}
        text={password}
        onTextChange={(e) => setPassword(e.value)}
      />

      <button
        className="bg-blue-500 text-white p-4 rounded-lg mb-4"
        onTap={handleLogin}
      >
        Login
      </button>

      <button
        className="bg-red-500 text-white p-4 rounded-lg"
        onTap={handleGoogleSignIn}
      >
        Sign in with Google
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