// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import AppNavigator from './navigation/AppNavigator';
import { BluetoothProvider } from './contexts/BluetoothContext';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => {
  return (
    <NavigationContainer>
      <BluetoothProvider>
        <AppNavigator />
      </BluetoothProvider>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);

// src/contexts/BluetoothContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import BleManager from 'react-native-ble-manager';

interface BluetoothContextType {
  isEnabled: boolean;
  devices: Device[];
  scanForDevices: () => void;
  connectToDevice: (deviceId: string) => Promise<void>;
  startAudioStream: (deviceId: string) => Promise<void>;
}

const BluetoothContext = createContext<BluetoothContextType>({} as BluetoothContextType);

export const BluetoothProvider: React.FC = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    BleManager.start({ showAlert: false });
    checkBluetoothStatus();
  }, []);

  const checkBluetoothStatus = async () => {
    try {
      const enabled = await BleManager.checkState();
      setIsEnabled(enabled === 'on');
    } catch (error) {
      console.error('Bluetooth check failed:', error);
    }
  };

  const scanForDevices = async () => {
    try {
      await BleManager.scan([], 5, true);
      // Handle scan results
    } catch (error) {
      console.error('Scan failed:', error);
    }
  };

  const connectToDevice = async (deviceId: string) => {
    try {
      await BleManager.connect(deviceId);
      // Handle connection success
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const startAudioStream = async (deviceId: string) => {
    // Implement audio streaming logic
  };

  return (
    <BluetoothContext.Provider
      value={{
        isEnabled,
        devices,
        scanForDevices,
        connectToDevice,
        startAudioStream,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => useContext(BluetoothContext);
