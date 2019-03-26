const items = [
  {
    email: "nice@one.com",
    likes: [],
    text: "Sem viverra aliquet eget sit amet tellus cras adipiscing enim. Auctor eu augue ut lectus. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Quis vel eros donec ac. Feugiat in ante metus dictum at tempor. Sagittis orci a scelerisque purus. Consequat interdum varius sit amet.",
    timestamp: 1553544157432,
    title: "I Like Nice Things",
    user_id: "784910e4-c1bb-42ae-9031-c47e25d57b9f",
    uuid: "jsXxQeqzfWL6FgBPFhS0F"
  },
  {
    email: "hey@hey.com",
    likes: [],
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    timestamp: 1553474353485,
    title: "Good Post",
    user_id: "51ea0ee6-20eb-467a-8cfa-4b0184a923ee",
    uuid: "9rlGR_QiZpoSzpMpqpby4"
  },
  {
    email: "hey@hey.com",
    likes: (2) ["51ea0ee6-20eb-467a-8cfa-4b0184a923ee", "784910e4-c1bb-42ae-9031-c47e25d57b9f"],
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    timestamp: 1553474870525,
    title: "Hello Friends",
    user_id: "51ea0ee6-20eb-467a-8cfa-4b0184a923ee",
    uuid: "U4SBwRZMSWfvbst3ctmLz"
  }
]

export default {
  get: jest.fn(() => Promise.resolve({ data: { items } })),
  put: jest.fn(() => Promise.resolve({  data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} }))
}