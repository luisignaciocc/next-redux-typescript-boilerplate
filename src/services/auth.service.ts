import axios from 'axios'
import { Credentials } from 'src/utils'

export const signIn = async (
  body: Credentials
): Promise<{ token: string; name: string; email: string }> => {
  return axios
    .post('/api/sign-in', body)
    .then((response) => {
      // console.log(response)
      return response.data
    })
    .catch((err) => {
      console.error(err)
    })
}
