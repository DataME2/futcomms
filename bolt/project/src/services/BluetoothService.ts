import { Bluetooth } from '@nativescript/bluetooth';
import { Observable } from '@nativescript/core';

class BluetoothService {
  private bluetooth: Bluetooth;
  private isScanning = false;

  constructor() {
    this.bluetooth = new Bluetooth();
  }

  async initialize(): Promise<boolean> {
    try {
      const hasPermission = await this.bluetooth.hasCoarseLocationPermission();
      if (!hasPermission) {
        await this.bluetooth.requestCoarseLocationPermission();
      }
      return true;
    } catch (error) {
      console.error('Bluetooth initialization failed:', error);
      return false;
    }
  }

  async startScanning(): Promise<Observable> {
    if (this.isScanning) {
      return;
    }

    this.isScanning = true;
    return this.bluetooth.startScanning({
      serviceUUIDs: [], // Add your service UUIDs
      seconds: 30,
      onDiscovered: (peripheral) => {
        console.log('Discovered peripheral:', peripheral);
      }
    });
  }

  async stopScanning(): Promise<void> {
    if (!this.isScanning) {
      return;
    }

    this.isScanning = false;
    await this.bluetooth.stopScanning();
  }

  async connect(UUID: string): Promise<void> {
    try {
      await this.bluetooth.connect({
        UUID,
        onConnected: (peripheral) => {
          console.log('Connected to peripheral:', peripheral);
        },
        onDisconnected: (peripheral) => {
          console.log('Disconnected from peripheral:', peripheral);
        }
      });
    } catch (error) {
      console.error('Connection failed:', error);
      throw error;
    }
  }

  async disconnect(UUID: string): Promise<void> {
    try {
      await this.bluetooth.disconnect({
        UUID
      });
    } catch (error) {
      console.error('Disconnection failed:', error);
      throw error;
    }
  }
}

export const bluetoothService = new BluetoothService();