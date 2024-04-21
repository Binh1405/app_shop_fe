// ** React
import { useEffect, useState } from "react"

// ** Components
import Spinner from "src/components/spinner"

// ** Mui
import { Box } from "@mui/material"

// ** Services
import { getCountAllRecords, getCountProductStatus } from "src/services/report"
import CardCountRecords from "src/views/pages/dashboard/components/CardCountRecords"

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const [countRecords, setCountRecords] = useState<Record<string, number>>({})

    // ** Fetch API
    const fetchAllCountProductStatus = async () => {
        setLoading(true)
        await getCountAllRecords().then((res) => {
          const data = res?.data
          setLoading(false)
          setCountRecords(data)
        }).catch(e => {
          setLoading(false)
        })
      }

      useEffect(() => {
        fetchAllCountProductStatus()
      }, [])

      console.log("countRecords", {countRecords})

    return (
        <Box>
            {loading && <Spinner />}
            <CardCountRecords data={countRecords} />
        </Box>
    )
}

export default Dashboard