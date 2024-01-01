// ** Import Next
import { NextPage } from 'next'
import LoginPage from 'src/views/pages/login'

type TProps = {}

const Login: NextPage<TProps> = () => {
  return <LoginPage />
}

export default Login
<<<<<<< Updated upstream
=======

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true
>>>>>>> Stashed changes
