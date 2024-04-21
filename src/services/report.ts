import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'

export const getCountUserType = async () => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.REPORT.INDEX}/user-type/count`)

    return res.data
  } catch (error) {
    return error
  }
}


export const getCountProductStatus = async () => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.REPORT.INDEX}/product-status/count`)

    return res.data
  } catch (error) {
    return error
  }
}

export const getCountAllRecords = async () => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.REPORT.INDEX}/all-records/count`)

    return res.data
  } catch (error) {
    return error
  }
}