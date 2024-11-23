// src/services/BluetoothAudioService.ts
import BleManager, { Peripheral } from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import { NativeEventEmitter, NativeModules } from 'react-native';
import AudioRecord from 'react-native-audio-record';
import { decode, encode } from 'base64-arraybuffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// Audio configuration
const AUDIO_CONFIG = {
  sampleRate: 44100,
  channels: 1,
  bitsPerSample: 16,
  audioSource: 6, // MIC
  bufferSize: 4096
};

// Bluetooth service and characteristic UUIDs
const AUDIO_SERVICE_UUID = '1234';
const AUDIO_CHARACTERISTIC_UUID = '5678';

export class BluetoothAudioService {
  private connectedDevices: Map<string, Peripheral> = new Map();
  private isRecording: boolean = false;
  private listeners: any[] = [];

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.listeners = [
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral),
      bleManagerEmitter.addListener('BleManagerConnectPeripheral', this.handleConnectPeripheral),
      bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectPeripheral),
    ];
  }

  async initialize(): Promise<void> {
    try {
      await BleManager.start({ showAlert: false });
      console.log('Bluetooth manager initialized');
    } catch (error) {
      console.error('Failed to initialize Bluetooth manager:', error);
      throw error;
    }
  }

  async startScanning(): Promise<void> {
    try {
      await BleManager.scan([AUDIO_SERVICE_UUID], 5, true);
      console.log('Started scanning for devices');
    } catch (error) {
      console.error('Failed to start scanning:', error);
      throw error;
    }
  }

  async connectToDevice(deviceId: string): Promise<void> {
    try {
      await BleManager.connect(deviceId);
      console.log('Connected to device:', deviceId);
      
      // Discover services and characteristics
      await BleManager.retrieveServices(deviceId);
      console.log('Retrieved device services');
    } catch (error) {
      console.error('Failed to connect to device:', error);
      throw error;
    }
  }

  async startAudioStream(deviceId: string): Promise<void> {
    if (!this.connectedDevices.has(deviceId)) {
      throw new Error('Device not connected');
    }

    try {
      await this.setupAudioRecording();
      await this.startStreamingToDevice(deviceId);
    } catch (error) {
      console.error('Failed to start audio stream:', error);
      throw error;
    }
  }

  private async setupAudioRecording(): Promise<void> {
    try {
      await AudioRecord.init(AUDIO_CONFIG);
      
      AudioRecord.on('data', (data: Buffer) => {
        this.processAudioData(data);
      });

      this.isRecording = true;
      await AudioRecord.start();
    } catch (error) {
      console.error('Failed to setup audio recording:', error);
      throw error;
    }
  }

  private async processAudioData(data: Buffer): Promise<void> {
    try {
      // Process audio data in chunks
      const chunks = this.splitIntoChunks(data, 512); // Split into smaller chunks for BLE transmission
      
      // Send to all connected devices
      for (const [deviceId, _] of this.connectedDevices) {
        for (const chunk of chunks) {
          await this.sendAudioChunk(deviceId, chunk);
        }
      }
    } catch (error) {
      console.error('Error processing audio data:', error);
    }
  }

  private splitIntoChunks(buffer: Buffer, chunkSize: number): Buffer[] {
    const chunks: Buffer[] = [];
    for (let i = 0; i < buffer.length; i += chunkSize) {
      chunks.push(buffer.slice(i, i + chunkSize));
    }
    return chunks;
  }

  private async sendAudioChunk(deviceId: string, chunk: Buffer): Promise<void> {
    try {
      await BleManager.writeWithoutResponse(
        deviceId,
        AUDIO_SERVICE_UUID,
        AUDIO_CHARACTERISTIC_UUID,
        Array.from(chunk)
      );
    } catch (error) {
      console.error('Failed to send audio chunk:', error);
    }
  }

  async stopAudioStream(): Promise<void> {
    if (this.isRecording) {
      await AudioRecord.stop();
      this.isRecording = false;
    }
  }

  private handleDiscoverPeripheral = (peripheral: Peripheral) => {
    if (!peripheral.name) {
      return;
    }
    console.log('Discovered peripheral:', peripheral.name);
  };

  private handleConnectPeripheral = (peripheral: Peripheral) => {
    this.connectedDevices.set(peripheral.id, peripheral);
    console.log('Connected to peripheral:', peripheral.name);
  };

  private handleDisconnectPeripheral = (peripheral: Peripheral) => {
    this.connectedDevices.delete(peripheral.id);
    console.log('Disconnected from peripheral:', peripheral.name);
  };

  cleanup(): void {
    this.listeners.forEach(listener => listener.remove());
    this.stopAudioStream();
  }
}

// src/hooks/useBluetoothAudio.ts
import { useState, useEffect } from 'react';
import { BluetoothAudioService } from '../services/BluetoothAudioService';

export const useBluetoothAudio = () => {
  const [bluetoothService] = useState(() => new BluetoothAudioService());
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeService = async () => {
      try {
        await bluetoothService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError('Failed to initialize Bluetooth service');
        console.error(err);
      }
    };

    initializeService();

    return () => {
      bluetoothService.cleanup();
    };
  }, []);

  return {
    bluetoothService,
    isInitialized,
    error
  };
};
