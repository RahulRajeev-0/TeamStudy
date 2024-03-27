import React from 'react'
import styled from 'styled-components'

const Message = ({message, username}) => {
  return (
   <MessageContainer>
        <MessageInfo>
            <h5>
            {message}
                <span>time </span>
            </h5>
            <p> {username}</p>
        </MessageInfo>
   </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
    display:flex;
    align-items:center;
    padding:20px;
`;

const MessageInfo = styled.div`
    padding-left:10px;
    background:violet;
    border-radius:10px;
    
    > h5 > span {
        color:gray;
        font-weight:300;
        margin-left:4px;
        font-size:10px;
    }
    >h5 {
        color:white;
        padding:5px;
    }
    >p {
        color:white;
        padding:5px;
    }
`;


