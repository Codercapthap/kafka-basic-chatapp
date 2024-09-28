import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

const chatAPI = {
  getMessages: (groupId) => {
    console.log("Calling get messages for group " + groupId);
    return api.get(`/messages/${groupId}`);
  },

  sendMessages: (username, text) => {
    let message = {
      sender: username,
      content: text,
    };
    return api.post(`/send`, message);
  },
};

export default chatAPI;
