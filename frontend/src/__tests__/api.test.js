import { fetchPosts, createPost, deletPost, toggleLike } from 'api'
import mockAxios from 'axios'
import amplify from 'aws-amplify'
// jest.mock('aws-amplify', () => {
//     Auth: {
//         currentSession: jest.fn()
//     }
// })

describe('api', () => {

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { results: "yup" } }))

    it('should fetch posts', () => {

    })

    it('should call the create api with the correct parameters and return the id', async () => {
        const [title, text] = ["title", "text"]
        
        const { data } = await createPost(title, text)

        // expect(data).toEqual(something)
        expect(mockAxios.put).toHaveBeenCalledTimes(1)
        // expect(mockAxios.put).toHaveBeenCalledWith(
        //     "url",
        //     { params: { ..."things" } }
        // )
    })


})
