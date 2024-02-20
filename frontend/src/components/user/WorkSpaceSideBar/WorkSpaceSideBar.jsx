import React from 'react'
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const WorkSpaceSideBar = () => {
  return (
    <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
                <h2>Workspace Name</h2>
                  <h3>
                    <FiberManualRecordIcon/>
                      User name 
                </h3> 

          </SidebarInfo>
                      <EditIcon/>
        </SidebarHeader>
    </SidebarContainer>
  )
}

export default WorkSpaceSideBar;

const SidebarContainer = styled.div`
    color:white;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,109,244,1) 100%, rgba(0,212,255,1) 100%);    
    flex:0.3;
    border-top:1px solid #49274b;
    max-width:260px;
    margin-top:45px;
`;

const SidebarHeader = styled.div`
  display:flex;
  border-bottom:1px solid #49274b;

  >.MuiSvgIcon-root {
    
    color:black;
    font-size:25px;
   background:white;
   border-radius:999px;
    
  }
`;

const SidebarInfo = styled.div` 
  flex:1;

  >h2{
    font-size:15px;
    font-weight:900;
    margin-bottom: 5px;
  }
  >h3{
    display:flex;
    font-size:13px;
    font-weight:400;
    align-items:center;

  }

  > h3 > .MuiSvgIcon-root{
    font-size:14px;
    margin-top:1px;
    margin-right:2px;
    color:green;
  }

`;


