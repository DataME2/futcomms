body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  font-size: 18px;
  margin: 20px 0;
}

button {
  font-size: 16px;
  margin: 10px 0;
}

#google-login {
  background-color: #4285F4;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#google-login:hover {
  background-color: #357ae8;
}

.separator {
  color: orange;
  margin: 15px 0;
  font-style: italic;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#login-button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

#login-button:hover {
  background-color: darkgreen;
}

#forgot-password {
  display: block;
  margin-top: 15px;
  color: #007BFF;
  text-decoration: none;
}

#forgot-password:hover {
  text-decoration: underline;
}

.app-version {
  margin-top: 20px;
  font-size: 12px;
  color: #888;
}