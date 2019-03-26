import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import App from 'components/App'

describe('app', () => {
  const [middleware, state] = [[], { auth: { user: {}, loading: true } }]
  const store = configureStore(middleware)(state)
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
  })
})
