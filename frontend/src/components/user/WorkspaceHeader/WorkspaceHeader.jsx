import React from 'react'
import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';


const WorkspaceHeader = () => {
  return (
    <div>
      <HeaderContainer>
       

        {/* header left  */}
        <HeaderLeft>
            
            <HeaderAvatar
            // TODO : onclick
            />
            <AccessTimeFilledIcon/>

        </HeaderLeft>
        {/* header search  */}

        <HeaderSearch>
            <SearchIcon/>
            <input placeholder='Search.......'/>
        </HeaderSearch>

        {/* header right */}
        <HeaderRight>

            <HelpIcon/>
        </HeaderRight>
      </HeaderContainer>
    </div>
  )
}

export default WorkspaceHeader

const HeaderSearch = styled.div`
    flex:0.4;
    opacity:1;
    border-radius:6px;
    text-align:center;
    background-color:#421f44;
    display:flex;
    padding:0 50px;
    color:grey;
    border:1px grey solid;

    >input{
        background-color:transparent;
        border:none;
        text-align:center;
        min-width:30vw;
        outline:none;
        color:white;
    }
`;

const HeaderContainer = styled.div`
    display:flex;
    position:fixed;
    width:100%;
    align-items: center;
    justify-content:space-between;
    padding:10px 0;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);    
    color:white;
`;

const HeaderLeft = styled.div`
    flex:0.3;
    display:flex;
    align-items: center;
    margin-left:20px;

    > .MuiSvgIcon-root {
        margin-left:auto;
        margin-right:30px;
    }
`;

const HeaderAvatar = styled(AccountCircleIcon)`
    cursor:pointer;

    :hover{
        opacity: 0.8;
    }
`;


const HeaderRight = styled.div`
    flex:0.3;
    display:flex;
    align-items: flex-end;

    >.MuiSvgIcon-root{
        margin-left:auto;
        margin-right:20px;
    }
`;

