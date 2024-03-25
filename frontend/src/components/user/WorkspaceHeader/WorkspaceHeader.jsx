import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';


import Offcanvas from 'react-bootstrap/Offcanvas';

// components
import UserProfileOffcanvas from './UserProfileOffcanvas/userProfileOffcanvas';

const WorkspaceHeader = () => {


    const [profileShowOffcanvas, setProfileShowOffcanvas] = useState(false);
    const handleClose = () => setProfileShowOffcanvas(false);
    const handleShow = () => setProfileShowOffcanvas(true);
  return (
    <>
        <div>
        <HeaderContainer>
        

            {/* header left  */}
            <HeaderLeft>
                
                <HeaderAvatar
                onClick={handleShow}
                
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


        <UserProfileOffcanvas show={profileShowOffcanvas} handleClose={handleClose}/>


    </>
  )
}

export default WorkspaceHeader

const HeaderSearch = styled.div`
    flex:0.4;
    opacity:1;
    border-radius:6px;
    text-align:center;
    background-color:#272727;
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
    background: #080808;
  
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

