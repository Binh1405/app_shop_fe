// ** React
import { useEffect, useState } from "react"

// ** Components
import Spinner from "src/components/spinner"

// ** Mui
import { Box, Grid } from "@mui/material"

// ** Services
import { getCountAllRecords, getCountProductStatus, getCountProductTypes, getCountRevenueYear } from "src/services/report"
import CardCountRecords from "src/views/pages/dashboard/components/CardCountRecords"
import CardProductType from "src/views/pages/dashboard/components/CardProductType"
import CardCountRevenue from "src/views/pages/dashboard/components/CardCountRevenue"

export interface TCountProductType {
  typeName: string,
  total: number
}

export interface TCountRevenue {
  year: string,
  month: string,
  total: number
}

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const [countRecords, setCountRecords] = useState<Record<string, number>>({})
    const [countProductTypes, setCountProductTypes] = useState<TCountProductType[]>([])
    const [countRevenues, setCountRevenues] = useState<TCountRevenue[]>([])

    
    // ** Fetch API
    const fetchAllCountRecords = async () => {
        setLoading(true)
        await getCountAllRecords().then((res) => {
          const data = res?.data
          setLoading(false)
          setCountRecords(data)
        }).catch(e => {
          setLoading(false)
        })
      }

      const fetchAllProductTypes = async () => {
        setLoading(true)
        await getCountProductTypes().then((res) => {
          const data = res?.data
          setLoading(false)
          setCountProductTypes(data)
        }).catch(e => {
          setLoading(false)
        })
      }

      const fetchAllTotalRevenues = async () => {
        setLoading(true)
        await getCountRevenueYear().then((res) => {
          const data = res?.data
          setLoading(false)
          setCountRevenues(data)
        }).catch(e => {
          setLoading(false)
        })
      }

      useEffect(() => {
        fetchAllCountRecords()
        fetchAllProductTypes()
        fetchAllTotalRevenues()
      }, [])

    return (
        <Box>
            {loading && <Spinner />}
            <CardCountRecords data={countRecords} />
            <Grid container spacing={6}>
              <Grid item md={6} xs={12}>
              <CardProductType data={countProductTypes} />
              </Grid>
              <Grid item md={6} xs={12}>
              <CardCountRevenue data={countRevenues} />
              </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard