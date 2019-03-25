import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from 'api'

import { Container, Row, Col, Jumbotron } from 'reactstrap'
import { CoolButton } from 'style/components'
import Post from './Post'

export class Timeline extends Component {
  state = { items: [] }

  async componentDidMount() {
    if (this.props.items) { // For testing, kinda hacky
      this.setState({ ...this.props }) 
    } else {
      try {
        const { Items } = await fetchPosts()
        this.setState({ items: Items.sort((a, b) => a.timestamp < b.timestamp) })
      } catch (error) {
        console.error(error)
      }      
    }
  }

  deletePost = async postId => {
    try {
      const data = await deletePost(postId)
      console.log(data)
      this.setState({ items: this.state.items.filter(item => item.uuid !== postId) })
    } catch (error) {
      console.error(error) 
    }
  }

  render() {
    const { user, loading } = this.props.auth
    return (
      <Container>
        <Jumbotron className="margin-top-100">
          <Container className="text-center">
            <h1 className="display-3">Greetings, fellow hamsters!</h1>
            <CoolButton onClick={() => this.props.history.push('/posts/new')} >Create Post</CoolButton>
            <hr className="my-2" />
          </Container>
          
          <Container className="margin-top-10" >
            <Row>
              <Col>
                {
                  this.state.items.map((item, i) =>
                    <React.Fragment key={item.uuid}>
                      <Post
                        {...item}
                        deletePost={this.deletePost}
                        userId={!loading && user && user.attributes.sub} />
                      { i !== (this.state.items.length - 1) && <hr className="my-2" />}
                    </React.Fragment>
                  )
                }
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Container>
    )
  }
}

export default connect(
  store => ({ auth: store.auth }),
  null
)(Timeline)