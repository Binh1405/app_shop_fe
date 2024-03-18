// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'

// ** Mui
import { Avatar, Box, Button, Divider, Typography, useTheme } from '@mui/material'

// ** Components
import ConfirmationDialog from 'src/components/confirmation-dialog'

// ** Translate
import { t } from 'i18next'

// ** Utils
import { formatNumberToLocal } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Redux
import { cancelOrderProductOfMeAsync } from 'src/stores/order-product/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

// ** Other
import { TItemOrderProduct, TItemOrderProductMe } from 'src/types/order-product'

type TProps = {
  dataOrder: TItemOrderProductMe
}

const CardOrder: NextPage<TProps> = props => {
  // ** Props
  const { dataOrder } = props

  // State
  const [openCancel, setOpenCancel] = useState(false)

  // ** Redux
  const { isSuccessCancelMe } = useSelector((state: RootState) => state.orderProduct)

  // ** theme
  const theme = useTheme()

  // ** redux
  const dispatch: AppDispatch = useDispatch()

  const handleConfirmCancel = () => {
    dispatch(cancelOrderProductOfMeAsync(dataOrder._id))
  }

  // ** handle
  const handleCloseDialog = () => {
    setOpenCancel(false)
  }

  useEffect(() => {
    if (isSuccessCancelMe) {
      handleCloseDialog()
    }
  }, [isSuccessCancelMe])

  return (
    <>
      {/* {loading || (isLoading && <Spinner />)} */}
      <ConfirmationDialog
        open={openCancel}
        handleClose={handleCloseDialog}
        handleCancel={handleCloseDialog}
        handleConfirm={handleConfirmCancel}
        title={t('Title_cancel_order')}
        description={t('Confirm_cancel_order')}
      />
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: '40px',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Divider />
        <Box mt={2} mb={2} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {dataOrder?.orderItems?.map((item: TItemOrderProduct) => {
            return (
              <Box key={item.product} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Box
                  sx={{
                    border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`
                  }}
                >
                  <Avatar
                    sx={{
                      width: '80px',
                      height: '80px'
                    }}
                    src={item.image}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: 'block'
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant='h6'
                      sx={{
                        color: item.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                        textDecoration: item.discount > 0 ? 'line-through' : 'normal',
                        fontSize: '14px'
                      }}
                    >
                      {formatNumberToLocal(item.price)} VND
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.discount > 0 && (
                        <Typography
                          variant='h4'
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: '14px'
                          }}
                        >
                          {formatNumberToLocal((item.price * (100 - item.discount)) / 100)}
                        </Typography>
                      )}
                      {item.discount > 0 && (
                        <Box
                          sx={{
                            backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
                            width: '36px',
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '2px'
                          }}
                        >
                          <Typography
                            variant='h6'
                            sx={{
                              color: theme.palette.error.main,
                              fontSize: '10px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            - {item.discount} %
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    x {item.amount}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Sum_money')}:</Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
            {formatNumberToLocal(dataOrder.totalPrice)} VND
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 6, justifyContent: 'flex-end' }}>
          {[0, 1].includes(dataOrder.status) && (
            <Button
              variant='outlined'
              onClick={() => setOpenCancel(true)}
              sx={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                color: '#da251d !important',
                backgroundColor: 'transparent !important',
                border: '1px solid #da251d !important'
              }}
            >
              {t('Cancel_order')}
            </Button>
          )}
          <Button
            variant='contained'
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 'bold'
            }}
          >
            {t('Buy_again')}
          </Button>
          <Button
            variant='outlined'
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 'bold'
            }}
          >
            {t('View_details')}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CardOrder
