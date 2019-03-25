import React from 'react'

import { Container, Row, Col, Jumbotron } from 'reactstrap'
import { CoolButton } from 'style/components'

const Home = props =>
  <Container>
    <Jumbotron className="margin-top-100">
      <Container className="text-center">
        <h1 className="display-3">Hamster?</h1>
        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Container>
      
      <Container className="text-center margin-top-10" >
        <Row>
          <Col sm={{ offset: 2, size: 3 }}>
            <CoolButton onClick={() => props.history.push('/signin')}>Signin</CoolButton>
          </Col>
          <Col sm={2}><p>Or</p></Col>
          <Col sm={3}>
            <CoolButton onClick={() => props.history.push('/signup')}>Signup</CoolButton>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </Container>

export default Home