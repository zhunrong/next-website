import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  validateStatus: status => {
    return status >= 200 && status < 500
  }
})
export default async function (options: AxiosRequestConfig) {
  try {
    const { data } = await axiosInstance(options)
    return data
  } catch (error) {
    return {
      status: error.message
    }
  }
}