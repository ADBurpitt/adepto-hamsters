import React from 'react'
import { shallow } from 'enzyme'
import { database, auth} from '__fixtures__'
import mockApi from 'api'

import { Timeline } from 'components/pages/Timeline/Timeline'
import Post from 'components/pages/Timeline/Post'

describe('Timeline', () => {
  const items = database.Items
  const props = { auth }
  const wrapper = shallow(<Timeline {...props} />, { disableLifecycleMethods: true })

  test('renders a Post component for each item in the list', () => {
    const state = { items }
    wrapper.setState(state)

    expect(wrapper.find(Post)).toHaveLength(items.length)
  })

  describe('deletePost', () => {

    beforeAll(() => wrapper.instance().deletePost(items[0].uuid))

    it('deletes the post from the database', () => expect(mockApi.deletePost).toHaveBeenCalledTimes(1))

    it('deletes the post from the component state', () => expect(wrapper.state().items).toHaveLength(2))
  })

})

// Seems there are still issues when testing functional components containing hooks with enzyme:
// https://github.com/airbnb/enzyme/issues/1938
describe('Post', () => {
  it('renders without crashing', () => {
    const items = database.Items
    const props = { ...items[0] }
    shallow(<Post {...props} />)
  })
})