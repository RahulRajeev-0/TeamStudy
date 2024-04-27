import React, { useRef, useState } from 'react'
import styled from 'styled-components'

// material ui icon
import SendIcon from '@mui/icons-material/Send';

// material ui components
import Button from '@mui/material/Button';

const ChatInput = ({connection, chatRef}) => {

    const inputRef = useRef(null);
    const [message, setMessage] = useState(null)

    const sendMessage = (e)=> {
        e.preventDefault();
        if (!connection || connection.readyState !== connection.OPEN) {
            console.error("WebSocket is not open");
            return;
          }
      
          const sender = profile.id;
          console.log("SENDER id:", sender);
      
          const messageData = { message, sender };
          const messageString = JSON.stringify(messageData);
      
          console.log("Sending Message:", messageString);
      
          connection.send(messageString);
          setMessage("");
        console.log(inputRef.current.value);
        inputRef.current = '';

        chatRef.current?.scrollIntoView({
            behavior:'smooth',
        });
    }
  return (
    <>
    <ChatInputContainer>
        <form>
            <input ref={inputRef} placeholder='Message'/>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' onClick={sendMessage}>
                send
            </Button>
        </form>
    </ChatInputContainer>
    </>
  )
}

export default ChatInput;

    const ChatInputContainer = styled.div`
        border-radius: 20px;

        > form {
            position: relative;
            display: flex;
            justify-content: center;

        }

        > form > input {
            position: fixed;
            bottom:30px;
            width:60%;
            height:35px;
            border: 1px solid gray;
            padding: 20px;
            outline:none;
            border-radius: 10px;
        }

        > form > Button {
            position : fixed;
            bottom: 34px;
            left: 1150px;
        }
    `;
