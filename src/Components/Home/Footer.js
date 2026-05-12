import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react'

export const Footer = () => {
  return (
    <Container fluid className='bg-primary pt-2 pb-2 mt-5'>
     <Col>
        <Row className='mt-3 text-white text-center'>
            
              <h3  style={{ fontFamily: "monospace", fontSize: "16px"}}>©2026 TaiSky. All Rights Reserved</h3>
            
        </Row>
     </Col>
    </Container>
  )
}
