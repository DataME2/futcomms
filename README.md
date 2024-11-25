# FutComms
## Project Overview

FutComms is a mobile app that facilitates real-time audio communication between smartphones via Bluetooth, and it will be supported by AWS cloud infrastructure. It operates in aeroplane mode with Bluetooth enabled, making it ideal for situations with limited or no internet connectivity.

The app is primarily designed for football referees, including a Principal Referee, two Assistant Referees, and optionally a Commissioner Referee or Fourth Assistant Referee responsible for team management and registration. All referees have bi-directional communication, except for the Commissioner. The Commissioner is could be absent; the principal referee should check if there is one, and then the record should be uploaded to the cloud for later analysis.

The football field layout must be set up once referees sync their phones and register for the game.

All participants must sign up, with roles including Principal Referee, Assistant Referee 1, Assistant Referee 2, Assistant Referee 3, and optionally Commissioner Referee. The Principal Referee registers the game and selects assistants and the commissioner. Sign-up can be done via Google or personal email and password.

The app will also collect basic information about the names of the Home Team and Away Team.

After the game concludes, the Principal Referee must stop the recording, and a background process will upload the record to the cloud using Wi-Fi only. The Principal Referee cannot delete records.

The front end will be developed in React Native, while the back end will be in Node.js.
