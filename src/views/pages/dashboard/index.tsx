// ** React
import { useEffect, useState } from "react"

// ** Components
import Spinner from "src/components/spinner"

// ** Mui
import { Box, Grid } from "@mui/material"

// ** Services
import { getCountAllRecords, getCountProductStatus, getCountProductTypes } from "src/services/report"
import CardCountRecords from "src/views/pages/dashboard/components/CardCountRecords"
import CardProductType from "src/views/pages/dashboard/components/CardProductType"

export interface TCountProductType {
  typeName: string,
  total: number
}

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const [countRecords, setCountRecords] = useState<Record<string, number>>({})
    const [countProductTypes, setCountProductTypes] = useState<TCountProductType[]>([])
    
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

      useEffect(() => {
        fetchAllCountRecords()
        fetchAllProductTypes()
      }, [])

    return (
        <Box>
            {loading && <Spinner />}
            <CardCountRecords data={countRecords} />
            <Grid container>
              <Grid item md={6} xs={12}>
              <CardProductType data={countProductTypes} />
              </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard