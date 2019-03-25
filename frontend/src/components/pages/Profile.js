import React from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col, Jumbotron } from 'reactstrap'

const Profile = ({user}) =>
  <Container>
    <Jumbotron className="margin-top-100">
      <Container className="text-center" >
        <Row>
          <Col>
            <h1>Username: { user.username }</h1>
          </Col>
        </Row>
        <Row className="margin-top-25" >
          <Col>
            <h3>Email: { user.attributes.email }</h3>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </Container>


export default connect(
  state => ({ user: state.auth.user }),
  {  }
)(Profile)