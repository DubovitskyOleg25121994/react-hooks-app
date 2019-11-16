import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';


const Content = styled.span`
  display: flex;
  justify-content: center;
  margin: 10px;
`;


export default function Loading() {
    return (
     <Content style={{ display: 'flex' }}>
      <Spinner animation="border" role="status">
       <div className="sr-only">Loading...</div>
      </Spinner>
     </Content>
    );
   }
   