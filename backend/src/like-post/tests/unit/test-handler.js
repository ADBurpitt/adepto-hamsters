'use strict'

const updateLikes = require('../../app').updateLikes
const chai = require('chai')
const expect = chai.expect


describe('Like Post', () => {
  describe('updateLikes', () => {
    let likes

    beforeEach(() => likes = ['one', 'two', 'five', 'nine'])

    it('Removes the given value if it is present in the list', () => {
      const result = updateLikes(likes, 'one')
      expect(result).to.have.members(['two', 'five', 'nine'])
    })

    it('Inserts the value into the list if it is not present', () => {
      const result = updateLikes(likes, 'three')
      expect(result).to.have.members(['one', 'two', 'three', 'five', 'nine'])
    })
  })

})


