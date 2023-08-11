import React, {useState} from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Navbar } from '../components/Navbar';
import { Header } from '../components/Header';

const API_KEY = "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"

export const Chatbot = () => {

    const [typing, setTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT!",
            sentTime: "just now",
            sender: "ChatGPT",
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage] // all the old messages, + the new message

        //update our messages state
        setMessages(newMessages)
        
        //set typing indicator
        setTyping(true)

        //process message to chatGPT (send ir over and see the response)
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages){
        //chatMessages {sender: "user" or "ChatGPT", message: "The message content here"}
        //apiMessages {role: "user" or "assistant", content: "The message content here"}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";

            if(messageObject.sender === "ChatGPT") {
                role="assistant"
            } else {
                role="user"
            }
            return { role: role, content: messageObject.message}
        })

        // role: "user" -> a message from the user, "assistant" -> a response from chatGPT
        // "system" -> genrally one initial message defining How we want chatGPT to talk

        const systemMessage = {
            role: "system",
            content: "Explain all concepts like I am 10 years old." //speak like a pirate, Explain like I am 10 years of experience software engineer
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages //[message1, message2, message3]
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data)
            console.log(data.choices[0].message.content)
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            )
            setTyping(false);
        })

    }




    return (
        <div className="App">
            <Header />
            <div style={{position: "relative", height: "85vh", width:"700px", margin:"0 auto", marginTop: "10px"}}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing"/> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}
