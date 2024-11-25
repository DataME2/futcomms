## FutComms Architecture Overview

### Front-end (React Native)
- User Authentication (Sign up/Sign in)
  - Google OAuth integration
  - Email/password authentication
- User Roles
  - Principal Referee
  - Assistant Referee 1
  - Assistant Referee 2 
  - Assistant Referee 3
  - Commissioner Referee (optional)
- Game Registration
  - Principal Referee registers the game
  - Assigns Assistant Referees and Commissioner
  - Inputs Home Team and Away Team names
- Bluetooth Connection
  - Establishes P2P connections between referees' devices
  - Handles device discovery and pairing
- Audio Transmission
  - Real-time audio streaming between connected devices
  - Bi-directional communication for all referees except Commissioner
- Game Recording
  - Starts recording when the game begins
  - Stops recording when Principal Referee ends the game
  - Uploads recording to AWS S3 when Wi-Fi is available
- User Interface
  - Football field visualization once referees sync their devices
  - Controls for starting/stopping game and recording
  - Display of connected referees and their roles

### Back-end (Node.js)
- User Management
  - User registration and authentication
  - Stores user information and roles in database
- Game Management 
  - Creates and stores game records
  - Associates referees with each game
- AWS Integration
  - S3 storage for uploaded game recordings
  - Possible integration with transcription services
- Database (e.g., MongoDB, PostgreSQL)
  - Stores user accounts, roles, and credentials
  - Stores game records and associated referees
- REST API
  - Endpoints for user registration and authentication
  - Endpoints for creating and retrieving game records
  - Secure access tokens for client requests

### AWS Cloud Infrastructure
- Elastic Beanstalk for Node.js application deployment
- S3 buckets for storage of game recordings
- Possible use of Transcribe for speech-to-text of recordings
- Cognito for user authentication and authorization
- RDS if using a relational database like PostgreSQL

### Bluetooth Communication
- Uses Bluetooth Low Energy (BLE) for power efficiency
- Establishes mesh network between referees' devices
- Handles reconnection if devices go out of range
- Ensures stable audio transmission with low latency

The application will be developed using React Native for the front-end, allowing for cross-platform compatibility on iOS and Android devices. The back-end will be implemented using Node.js, with a REST API to handle client requests. AWS services like Elastic Beanstalk, S3, and potentially Transcribe and Cognito will be leveraged for efficient deployment, storage, and possible speech-to-text capabilities.

Bluetooth Low Energy (BLE) will be used to establish P2P connections between the referees' devices, forming a mesh network for stable, low-latency audio transmission. The app will handle device discovery, pairing, and reconnection if devices go out of range.

User authentication will be implemented using Google OAuth and email/password login. User roles (Principal Referee, Assistant Referees, Commissioner) will be assigned during game registration. The Principal Referee will have the authority to register games, assign roles, and start/stop game recording.

Game recordings will be automatically uploaded to AWS S3 when Wi-Fi connectivity is available, ensuring secure storage and potential for further analysis. The Principal Referee will not have permissions to delete recordings to maintain integrity.
