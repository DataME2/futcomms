import { TNSRecorder, TNSPlayer, AudioRecorderOptions, AudioPlayerOptions } from '@nativescript/audio';

class AudioService {
  private recorder: TNSRecorder;
  private player: TNSPlayer;
  private isRecording: boolean = false;
  private currentRecordingPath: string | null = null;

  constructor() {
    this.recorder = new TNSRecorder();
    this.player = new TNSPlayer();
  }

  async startRecording(gameId: string): Promise<void> {
    if (this.isRecording) {
      return;
    }

    try {
      const options: AudioRecorderOptions = {
        filename: `${gameId}_${Date.now()}.m4a`,
        infoCallback: (info) => {
          console.log('Audio recording info:', info);
        },
        errorCallback: (error) => {
          console.error('Audio recording error:', error);
        }
      };

      const hasPermission = await this.recorder.requestRecordPermission();
      if (!hasPermission) {
        throw new Error('Recording permission denied');
      }

      await this.recorder.start(options);
      this.isRecording = true;
      this.currentRecordingPath = options.filename;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<string | null> {
    if (!this.isRecording) {
      return null;
    }

    try {
      await this.recorder.stop();
      this.isRecording = false;
      return this.currentRecordingPath;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      throw error;
    }
  }

  async playRecording(filePath: string): Promise<void> {
    try {
      const options: AudioPlayerOptions = {
        audioFile: filePath,
        loop: false,
        completeCallback: () => {
          console.log('Audio playback completed');
        },
        errorCallback: (error) => {
          console.error('Audio playback error:', error);
        }
      };

      await this.player.playFromFile(options);
    } catch (error) {
      console.error('Failed to play recording:', error);
      throw error;
    }
  }

  async dispose(): Promise<void> {
    try {
      if (this.isRecording) {
        await this.stopRecording();
      }
      await this.recorder.dispose();
      await this.player.dispose();
    } catch (error) {
      console.error('Failed to dispose audio service:', error);
      throw error;
    }
  }
}

export const audioService = new AudioService();