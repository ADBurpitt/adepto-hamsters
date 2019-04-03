import React, { useState } from 'react'
import { toggleLike } from 'api'

import { Container, Row, Col, Button } from 'reactstrap'
import { ImgButton } from 'style/components'
import trash from 'assets/trash.svg'

const Post = ({uuid, user, title, text, likes, email, timestamp, deletePost}) => {
  const [likeState, setLikes] = useState(likes)
  const date = new Date(timestamp)

  return (
    <Container>
      <Row>
        <Col sm={11}>
          <h1 className="display-5">
            {title}
            <span style={{fontSize: 12}} className="align-middle text-muted">
              {email} - {date.toLocaleDateString()}
            </span>
          </h1>
        </Col>
        { 
          user.email === email &&
          <Col sm={1}>
            <ImgButton src={trash} alt="delete" onClick={() => deletePost(uuid)}/>
          </Col>
        }
      </Row>
      <Row>
        <Col><p className="lead">{text}</p></Col>
      </Row>
      <Row>
        <Col sm={10}><span className="align-middle text-muted">{likeState.length}</span></Col>
        <Col>
          <Button
            size="sm"
            color={likeState.includes(user.id) ? "danger" : "success"}
            onClick={async () => {
                try {
                  const { Attributes } = await toggleLike(uuid)
                  setLikes(Attributes.likes)
                } catch (error) {
                  console.error(error)
                }
              }
            }>
            {likeState.includes(user.id) ? "unlike" : "like"}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}


export default Post