// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** React
import { useContext, useEffect, useRef, useState } from 'react'

// ** Mui
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'

// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Config
import { EMAIL_REG } from 'src/configs/regex'

// ** Images
import ForgotPasswordDark from '/public/images/forgot-password-dark.png'
import ForgotPasswordLight from '/public/images/forgot-password-light.png'

// ** Hooks
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { ROUTE_CONFIG } from 'src/configs/route'
import { useRouter } from 'next/router'

type TProps = {}

type TDefaultValue = {
  email: string
}

const ForgotPasswordPage: NextPage<TProps> = () => {

  // ** Translate
  const { t } = useTranslation()

  // ** Router
  const router = useRouter()

  // ** theme
  const theme = useTheme()


  const schema = yup.object().shape({
    email: yup.string().required(t('Required_field')).matches(EMAIL_REG, t("Rules_email")),
  })

  const defaultValues: TDefaultValue = {
    email: 'admin@gmail.com',
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string }) => {
    if (!Object.keys(errors)?.length) {
      
    }
  }

  return (
    <>
      {/* {status === "loading" && <FallbackSpinner />} */}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <Box
          display={{
            xs: 'none',
            sm: 'flex'
          }}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.customColors.bodyBg,
            height: '100%',
            minWidth: '50vw'
          }}
        >
          <Image
            src={theme.palette.mode === 'light' ? ForgotPasswordLight : ForgotPasswordDark}
            alt='login image'
            style={{
              height: 'auto',
              width: 'auto'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              {t("Forgot_password")}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Email')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_email')}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                                <Icon icon='arcticons:fairemail' />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='email'
                />
              </Box>
           
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
               {(t("Send_request"))}
              </Button>
              <Button startIcon={<Icon icon="uiw:left"></Icon>} onClick={() => router.push(ROUTE_CONFIG.LOGIN)} fullWidth variant='outlined' sx={{ mt: 3, mb: 2 }}>
               {(t("Back_login"))}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ForgotPasswordPage
