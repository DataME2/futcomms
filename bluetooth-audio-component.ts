// src/components/AudioStreamingScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useBluetoothAudio } from '../hooks/useBluetoothAudio';
import { Peripheral } from 'react-native-ble-manager';

export const AudioStreamingScreen: React.FC = () => {
  const { bluetoothService, isInitialized, error } = useBluetoothAudio();
  const [devices, setDevices] = useState<Peripheral[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const startScan = async () => {
    if (!isInitialized) return;

    setIsScanning(true);
    try {
      await bluetoothService.startScanning();
    } catch (err) {
      console.error('Scan failed:', err);
    }
    setIsScanning(false);
  };

  const connectToDevice = async (deviceId: string) => {
    try {
      await bluetoothService.connectToDevice(deviceId);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  const toggleStreaming = async (deviceId: string) => {
    try {
      if (isStreaming) {
        await bluetoothService.stopAudioStream();
      } else {
        await bluetoothService.startAudioStream(deviceId);
      }
      setIsStreaming(!isStreaming);
    } catch (err) {
      console.error('Streaming toggle failed:', err);
    }
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={startScan}
            disabled={isScanning}
          >
            <Text style={styles.buttonText}>
              {isScanning ? 'Scanning...' : 'Scan for Devices'}
            </Text>
          </TouchableOpacity>

          <FlatList
            data={devices}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.deviceItem}>
                <Text style={styles.deviceName}>{item.name || 'Unknown Device'}</Text>
                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={() => connectToDevice(item.id)}
                >
                  <Text style={styles.buttonText}>Connect</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.streamButton,
                    isStreaming && styles.streamingActive
                  ]}
                  onPress={() => toggleStreaming(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deviceName: {
    flex: 1,
    fontSize: 16,
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  streamButton: {
    backgroundColor: '#FF9800',
    padding: 8,
    borderRadius: 6,
  },
  streamingActive: {
    backgroundColor: '#F44336',
  },
});
