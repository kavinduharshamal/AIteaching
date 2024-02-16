import { useState } from "react";
//import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

function Inputdata({ admin }) {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  //file uploader ////////////////////////////////////////////////////
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    console.log(file.name);
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  /*function generateMessage() {
    const userInput = document.getElementById("userInput").value;
    fetch("http://localhost:3000/generateMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }*/
  const [lectureName, setLectureName] = useState("");
  const [batch, setBatch] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [inputData, setInputData] = useState("");
  //const [fileInput, setFileInput] = useState("");

  const handleGenerate = () => {
    const loadingToastId = toast.loading("Hold for Complete the process", {
      autoClose: false, // To keep the loading toast until you manually clear it
    });
    handleUpload();
    // Log the data to the console
    console.log("Lecture Name:", lectureName);
    console.log("Input Data:", inputData, batch, moduleName, moduleCode);

    // Prepare the data object to send to the server
    const requestData = {
      message: inputData,
      name: lectureName,
      moduleName: moduleName,
      moduleCode: moduleCode,
      batch: batch,
      texture: file.name,
    };

    // Send a POST request to localhost:3000/voice
    fetch("http://localhost:3000/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log("Server Response:", data);
        toast.dismiss(loadingToastId);
        toast.success("Successfully entered!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return admin === "admin" ? (
    <div className="Inputdata">
      <div
        style={{
          color: "#6DB9EF",
          width: "400px",
          height: "100px",
          fontSize: "30px",
          paddingLeft: "90px",
          paddingTop: "50px",
        }}
      >
        Input Of The Page
      </div>
      <div>{admin}</div>
      <a
        href="/aiteacher"
        style={{
          position: "absolute",
          top: "20px", // Adjust the top position as needed
          right: "20px", // Adjust the right position as needed
          color: "blue",
          textDecoration: "none",
          fontSize: "20px",
          width: "70px",
          height: "70px",
          padding: "10px",
          borderRadius: "50%",
          backgroundColor: "#6DB9EF",
          color: "white",
          textDecoration: "none",
          transition: "transform 0.2s",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)", // Add shadow effect
        }}
      >
        HOME
      </a>

      <ToastContainer />
      <div
        style={{
          position: "relative",
          height: "1000px",
          width: "70%",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
      <div
        style={{
          height: "800px",
          width: "100%",
          paddingTop: "50px",
        }}
      >
        <input
          style={{
            width: "30%",
            height: "5%",
            /* Add any additional styling for your text field here */
            margin: "auto", // Center the input horizontally
            display: "block",
            margin: "20px",
            // Make the input a block element
          }}
          type="text"
          className="custom-text-field"
          placeholder="Enter name of lecture"
          id="userName"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
        />

        <input
          style={{
            width: "30%",
            height: "5%",
            /* Add any additional styling for your text field here */
            margin: "auto", // Center the input horizontally
            display: "block",
            margin: "20px",
            // Make the input a block element
          }}
          type="text"
          className="custom-text-field"
          placeholder="Enter name of Batch"
          id="Batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        <input
          style={{
            width: "40%",
            height: "5%",
            /* Add any additional styling for your text field here */
            margin: "auto", // Center the input horizontally
            display: "block",
            margin: "20px",
            // Make the input a block element
          }}
          type="text"
          className="custom-text-field"
          placeholder="Enter name of ModuleName"
          id="modulename"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        <input
          style={{
            width: "40%",
            height: "5%",
            /* Add any additional styling for your text field here */
            margin: "auto", // Center the input horizontally
            display: "block",
            margin: "20px",
            // Make the input a block element
          }}
          type="text"
          className="custom-text-field"
          placeholder="Enter name of ModuleCode"
          id="moduleCode"
          value={moduleCode}
          onChange={(e) => setModuleCode(e.target.value)}
        />
        <textarea
          style={{
            width: "80%",
            height: "90%",
            /* Add any additional styling for your text area here */
            margin: "auto", // Center the textarea horizontally
            display: "block",
            // Make the textarea a block element
          }}
          className="custom-text-area"
          placeholder="Enter text here"
          id="userInput"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></textarea>
        <div style={{ width: "100%", height: "20px" }}></div>

        <input type="file" onChange={handleFileChange} />

        <button
          className="generate-button"
          style={{
            margin: "auto", // Center the input horizontally
            display: "block",
          }}
          onClick={handleGenerate}
        >
          Generate
        </button>
        <button onClick={handleUpload}>Upload File</button>
      </div>
    </div>
  ) : (
    <div>you not allow</div>
  );
}

export default Inputdata;
