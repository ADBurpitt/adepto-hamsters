import { database } from '__fixtures__'

export default {
  get: jest.fn(async () => ({ data: { Items: database.items } })),
  put: jest.fn(async (url, data, config) => ({  data: { uuid: "jsXxQeqzfWL6FgBPFhS0F" } })),
  post: jest.fn(async (url, data, config) => ({ data: {} })),
  delete: jest.fn(async (url, config) => ({ data: {} }))
}