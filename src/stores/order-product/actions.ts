import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Services
import { createOrderProduct, getAllOrderProductsByMe } from 'src/services/order-product'

// ** Types
import { TParamsCreateOrderProduct, TParamsGetOrderProducts } from 'src/types/order-product'

export const serviceName = 'orderProduct'

export const createOrderProductAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreateOrderProduct) => {
    const response = await createOrderProduct(data)

    return response
  }
)

export const getAllOrderProductsByMeAsync = createAsyncThunk(
  `${serviceName}/get-all-by-me`,
  async (data: { params: TParamsGetOrderProducts }) => {
    const response = await getAllOrderProductsByMe(data)

    return response
  }
)
