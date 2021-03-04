/**
 * Imports
 */
import axios from 'axios';
import { IncomingHttpHeaders } from 'http2';

/**
 * Common Utility Functions
 */
export const parseToken = (headers: IncomingHttpHeaders): string => {
  const authHeader = headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/)
  if (match) {
    const token = match[1];  
    return token;
  }
  return '';
}

export const getAuth0Sub = async (token: string): Promise<string> => {
  const config = { headers: { Authorization: `Bearer ${token}` }};  
  const userinfo = `https://${process.env.AUTH0_DOMAIN}/userinfo`
  let user: string = '';
  try {
    user = await axios.post(userinfo, {}, config)
    .then(async (resp) => {
      return resp.data.sub;
    })
  }
  catch (e) {
    console.log('Unable to get user info:', e.stack)
  }
  return user;
}

export const getAuth0UserInfo = async (token: string): Promise<object> => {
  const config = { headers: { Authorization: `Bearer ${token}` }};  
  const userinfo = `https://${process.env.AUTH0_DOMAIN}/userinfo`
  let user: object = {};
  try {
    user = await axios.post(userinfo, {}, config)
    .then(async (resp) => {
      return resp.data;
    })
  }
  catch (e) {
    console.log('Unable to get user info:', e.stack)
  }
  return user;
}
