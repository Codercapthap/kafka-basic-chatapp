import "./App.css";
import React, { useState } from "react";
import chatAPI from "./services/http";
import { randomColor } from "./utils/common";
import LoginForm from "./components/LoginForm";
import SockJsClient from "react-stomp";
import Messages from "./components/Messages";
import { Input } from "@mui/material";

const SOCKET_URL = "http://localhost:8080/ws-chat/";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  let onConnected = () => {
    console.log("Connection established");
  };

  let onMessageReceived = (message) => {
    console.log("New message received: " + message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  let onSendMessage = (message) => {
    chatAPI
      .sendMessages(user.username, message)
      .then((messages) => {
        console.log("Sent message: " + messages);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  let handleLoginSubmit = (username) => {
    console.log("Login: " + username);
    setUser({
      username: username,
      colors: randomColor(),
    });
  };

  return (
    <div className="App">
      {!!user ? (
        <>
          <SockJsClient
            url={SOCKET_URL}
            topics={["/topic/group"]}
            onConnect={onConnected}
            onDisconnect={console.log("Disconnected")}
            onMessage={(message) => onMessageReceived(message)}
            debug={false}
          />
          <Messages messages={messages} currentUser={user} />
          <Input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSendMessage(event.target.value);
                event.target.value = "";
              }
            }}
          />
        </>
      ) : (
        <LoginForm onSubmit={handleLoginSubmit} />
      )}
    </div>
  );
}

export default App;
