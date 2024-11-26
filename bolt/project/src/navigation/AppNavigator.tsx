import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { CreateGameScreen } from "../screens/CreateGameScreen";

const StackNavigator = stackNavigatorFactory();

export function AppNavigator() {
  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: true,
        }}
      >
        <StackNavigator.Screen
          name="login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <StackNavigator.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <StackNavigator.Screen
          name="createGame"
          component={CreateGameScreen}
          options={{ title: "Create Game" }}
        />
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
}