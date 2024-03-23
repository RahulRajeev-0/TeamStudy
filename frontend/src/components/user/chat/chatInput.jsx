import React from 'react'
import styled from 'styled-components'

// material ui icon
import SendIcon from '@mui/icons-material/Send';

// material ui components
import Button from '@mui/material/Button';

const ChatInput = () => {
    const sendMessage = (e)=> {
        e.preventDefault();
    }
  return (
    <>
    <ChatInputContainer>
        <form>
            <input placeholder='Message'/>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' onClick={sendMessage}>
                Send
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
