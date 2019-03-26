import mockAxios from 'axios'
import mockAmplify from 'aws-amplify'
import { API_URL } from 'config'
import { database, auth } from '__fixtures__'

const { fetchPosts, createPost, deletePost, toggleLike } = jest.requireActual('../api')

describe('api', () => {
  const authToken = auth.user.signInUserSession.idToken.jwtToken

  describe('fetchPosts', async () => {
    let items;
    beforeAll(async () => {
      const { Items } = await fetchPosts()
      items = Items
    }) // Doesn't run test when fetchPosts is in describe body for soem reason
    
    it('fetches posts from the database', () => expect(items).toEqual(database.items))

    it('makes a single axios get request', () => expect(mockAxios.get).toHaveBeenCalledTimes(1))

    it('uses the correct parameters', () => expect(mockAxios.get).toHaveBeenCalledWith(
      `${API_URL}/posts`,
      { headers: { "Authorization": authToken } }
    ))
  })


  describe('createPost', async () => {
    const [title, text] = ["title", "text"]
    await createPost(title, text)

    it('makes a single axios put request', () => expect(mockAxios.put).toHaveBeenCalledTimes(1))

    it('uses the correct parameters', () => expect(mockAxios.put).toHaveBeenCalledWith(
      `${API_URL}/posts`,
      { title, text },
      { headers: { "Authorization": authToken } }
    ))
  })

  describe('toggleLike', async () => {  })

  describe('deletePost', async () => {  })


})
