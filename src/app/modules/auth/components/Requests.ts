import axios from 'axios'

const FIRST_API_URL = 'https://jsonplaceholder.typicode.com'

export const getPosts = async () => {
  try {
    const res = await axios({
      url: `${FIRST_API_URL}/posts`,
      method: 'GET',
      params: {offset: 0, limit: 10},
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: 'Country=Brasil&City=Belo Horizonte',
      timeout: 1000,
      onDownloadProgress: function (pprogressEvent) {
        console.log(pprogressEvent, `first`)
      },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.errText)
    } else if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
