// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Chip } from '@mui/material'

// ** Components
import Icon from 'src/components/Icon'
import NotificationItem from 'src/views/layouts/components/notification-dropdown/components/NotificationItem'

// ** Third party
import { useTranslation } from 'react-i18next'

export type NotificationsType = {
    meta: string
    title: string
    subtitle: string
}

interface Props {
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
    '& .MuiMenu-paper': {
        width: 380,
        overflow: 'hidden',
        marginTop: theme.spacing(4.25),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    '& .MuiMenu-list': {
        padding: 0,
        '& .MuiMenuItem-root': {
            margin: 0,
            borderRadius: 0,
            padding: theme.spacing(4, 6),
            '&:hover': {
                backgroundColor: theme.palette.action.hover
            }
        }
    }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))


const NotificationDropdown = (props: Props) => {
    // ** Props
    const { } = props

    // ** Hooks
    const theme = useTheme()
    const { t } = useTranslation()

    const notifications: NotificationsType[] = [
        {
            meta: 'Today',
            title: 'Congratulation Flora! 🎉',
            subtitle: 'Won the monthly best seller badge'
        },
        {
            meta: 'Yesterday',
            subtitle: '5 hours ago',
            title: 'New user registered.'
        },
        {
            meta: '11 Aug',
            title: 'New message received 👋🏻',
            subtitle: 'You have 10 unread messages'
        },
        {
            meta: '25 May',
            title: 'Paypal',
            subtitle: 'Received Payment',
        },
        {
            meta: '19 Mar',
            title: 'Received Order 📦',
            subtitle: 'New order received from John'
        },
        {
            meta: '27 Dec',
            subtitle: '25 hrs ago',
            title: 'Finance report has been generated'
        }
    ]

    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

    // ** Hook
    const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = () => {
        setAnchorEl(null)
    }


    return (
        <Fragment>
            <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
                <Badge
                    color='error'
                    badgeContent={4}
                    invisible={!notifications.length}
                    sx={{
                        '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
                    }}
                >
                    <Icon fontSize='1.625rem' icon='tabler:bell' />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography variant='h5' sx={{ cursor: 'text' }}>
                            Notifications
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <Chip
                                size='small'
                                color='primary'
                                label={`${notifications.length} New`}
                            />
                            <Icon icon="line-md:email-opened"></Icon>
                        </Box>
                    </Box>
                </MenuItem>
                <Box
                    sx={{
                        maxHeight: 349, overflowY: 'auto', overflowX: 'hidden'
                    }}
                >
                    {notifications.map((notification: NotificationsType, index: number) => (
                        <NotificationItem
                            key={index}
                            notification={notification}
                            handleDropdownClose={handleDropdownClose}
                        />
                    ))}
                </Box>
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{
                        borderBottom: 0,
                        cursor: 'default',
                        userSelect: 'auto',
                        backgroundColor: `${theme.palette.background.paper} !important`,
                        borderTop: theme => `1px solid ${theme.palette.divider}`
                    }}
                >
                    <Button fullWidth variant='contained' onClick={handleDropdownClose}>
                        {t("Mark read all notifications")}
                    </Button>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default NotificationDropdown
