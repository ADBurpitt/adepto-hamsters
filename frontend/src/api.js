import axios from 'axios'
import { Auth } from 'aws-amplify'

import { API_URL } from 'config'

export const fetchPosts = async () => {
  try {
    const { idToken } = await Auth.currentSession();
    const { data } = await axios.get(`${API_URL}/posts`, { headers: { 'Authorization': idToken.jwtToken } })
    return data.data;
  } catch (error) {
    console.error(error)
  }
}

export const createPost = async (title, text) => {
  try {
    const { idToken } = await Auth.currentSession();
    const { data } = await axios.put(
      `${API_URL}/posts`,
      { title, text },
      { headers: { 'Authorization': idToken.jwtToken }
    })
    return data;
  } catch (error) {
    console.error(error)
  }
}

export const toggleLike = async postId => {
  try {
    const { idToken } = await Auth.currentSession();
    const { data } = await axios.post(
      `${API_URL}/posts/likes`,
      { postId },
      { headers: { 'Authorization': idToken.jwtToken }
    })
    return data;
  } catch (error) {
    console.error(error)
  }
}

export const deletePost = async postId => {
  try {
    const { idToken } = await Auth.currentSession();
    const { data } = await axios.delete(
      `${API_URL}/posts/${postId}`,
      { headers: { 'Authorization': idToken.jwtToken, data: { postId } }
    })
    return data;
  } catch (error) {
    throw(error)
  }
}