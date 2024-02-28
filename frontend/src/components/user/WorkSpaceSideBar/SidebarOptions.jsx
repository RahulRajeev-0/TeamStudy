import React from 'react'
import styled from 'styled-components'

const SidebarOptions = ({Icon, title}) => {
  return (
   <SidebarOptionsContainer>
   {Icon && <Icon fontSize='large' style={{padding: '8px'}}/>}
    {Icon ? (
        <h6>{title}</h6>
    ):(
        <SidebarOptionChannel>
            <span>#</span>{title}
        </SidebarOptionChannel>
    )}
   </SidebarOptionsContainer>
  )
}

export default SidebarOptions

const SidebarOptionsContainer = styled.div`
   display:flex;
   font-size:12px;
   align-items:end;
   padding-left:2px;
   cursor:pointer;

   :hover{
    opacity:0.9;
    background-color:#340e36;
   }

   > h6 {
    font-weight:500;
   }

   > h6 > span {
    padding:15px;
    
   }
`;

const SidebarOptionChannel = styled.div`

`;