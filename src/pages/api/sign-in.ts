import type { NextApiHandler } from 'next'

const signIn: NextApiHandler = async (request, response) => {
  // const credentials = request.body

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  response.json({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    name: 'Luis Cabezas',
    email: 'luisignacioccp@gmail.com',
  })
}

export default signIn
