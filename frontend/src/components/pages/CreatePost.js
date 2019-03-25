import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { createPost } from 'api'

import { Container, Row, Col, Jumbotron, Button, Input, Label, FormGroup } from 'reactstrap'

const validate = ({ title, text }) => {
  const errors = {}

  if (!title)
    errors.title = 'Required'

  if (!text)
    errors.text = 'Required'

  return errors
}

class CreatePost extends Component {
  
  submitPost = async ({title, text}) => {
    try {
      const res = await createPost(title, text)
      console.log(res)
      this.props.history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) =>
        <FormGroup row>
            {type === "text" && label && <Label sm={2}>{label}</Label>}
            <Col sm={type === "text" ? 10 : 12} >
              <Input {...input} placeholder={label} type={type} />
              {
                touched &&
                (
                  (error && <span className="text-danger">{error}</span>)
                  ||
                  (warning && <span className="text-warning">{warning}</span>)
                )
              }
            </Col>
        </FormGroup>

  render() {
    return (
      <Container>
        <Jumbotron className="text-center margin-top-100">
          <h1 className="display-3">Create Post</h1>
          <hr className="my-2" />
          
          <Container className="margin-top-10" >
            <form onSubmit={this.props.handleSubmit(this.submitPost)} >
                <Col sm={10} >
                  <Field name="title" type="text" label="Title" component={this.renderField} />
                </Col>
              <Row>
                <Col>
                  <Field name="text" type="textarea" label="Body" component={this.renderField} />
                </Col>
              </Row>
              <Row className="margin-top-10" >
                <Col>
                  <Button color="primary">Submit</Button>
                </Col>
              </Row>
            </form>
          </Container>
        </Jumbotron>
      </Container>
    )
  }
}

export default connect(
  state => ({ errorMsg: state.auth.error }),
  {}
)(reduxForm({ validate, form: 'CreatePostForm' })(CreatePost))
