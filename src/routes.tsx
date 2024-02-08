// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ForumIcon from '@material-ui/icons/Forum'
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import SettingsIcon from '@material-ui/icons/Settings'
import ShareIcon from '@material-ui/icons/Share'

// core components/views for Admin layout
import { Dashboard } from './pages/Dashboard/Dashboard'
import Users from './pages/User/Users'
import ICOUsers from './pages/User/ICOUsers'
// import { Permissions } from './pages/User/Permissions'
// import { SignInLog } from './pages/User/SignInLog'
import { TradeHistory } from './pages/Trade/TradeHistory'
import { OrderHistory } from './pages/Trade/OrderHistory'
// import { DepositWithdrawHistory } from './pages/Trade/DepositWithdrawHistory'
import ChatHistory from './pages/Chat/ChatHistory'
import SupportChat from './pages/Chat/SupportChat'
import UserLog from './pages/Log/UserLog'
import Notification from './pages/Notification'
import Setting from './pages/Setting'
import Pair from './pages/Pair'
import CryptoDeposit from './pages/Finance/CryptoDeposit'
import CryptoWithdraw from './pages/Finance/CryptoWithdraw'
import FiatDeposit from './pages/Finance/FiatDeposit'
import FiatWithdraw from './pages/Finance/FiatWithdraw'
import ICOHistory from './pages/Finance/ICOHistory'

const dashboardRoutes = [
  {
    path: '/dashboard',
    tabIndex: 0,
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/user/users',
    tabIndex: 1,
    name: 'Users',
    icon: PersonIcon,
    component: Users,
    layout: '/admin',
  },
  {
    path: '/user/icousers',
    tabIndex: 1,
    name: 'ICO Users',
    icon: PersonIcon,
    component: ICOUsers,
    layout: '/admin',
  },
  // {
  //   path: '/user/permissions',
  //   tabIndex: 1,
  //   name: 'Permissions',
  //   icon: PersonIcon,
  //   component: Permissions,
  //   layout: '/admin',
  // },
  // {
  //   path: '/user/signinlog',
  //   tabIndex: 1,
  //   name: 'SignIn Log',
  //   icon: PersonIcon,
  //   component: SignInLog,
  //   layout: '/admin',
  // },
  {
    path: '/trade/tradehistory',
    tabIndex: 2,
    name: 'Trade History',
    icon: EqualizerIcon,
    component: TradeHistory,
    layout: '/admin',
  },
  {
    path: '/trade/orderhistory',
    tabIndex: 2,
    name: 'Order History',
    icon: EqualizerIcon,
    component: OrderHistory,
    layout: '/admin',
  },
  {
    path: '/finance/fiatdeposit',
    tabIndex: 3,
    name: 'Fiat Deposit',
    icon: EqualizerIcon,
    component: FiatDeposit,
    layout: '/admin',
  },
  {
    path: '/finance/fiatwithdraw',
    tabIndex: 3,
    name: 'Fiat Withdraw',
    icon: EqualizerIcon,
    component: FiatWithdraw,
    layout: '/admin',
  },
  {
    path: '/finance/crypytodeposit',
    tabIndex: 3,
    name: 'Crypto Deposit',
    icon: EqualizerIcon,
    component: CryptoDeposit,
    layout: '/admin',
  },
  {
    path: '/finance/cryptowithdraw',
    tabIndex: 3,
    name: 'Crypto Withdraw',
    icon: EqualizerIcon,
    component: CryptoWithdraw,
    layout: '/admin',
  },
  {
    path: '/finance/icohistory',
    tabIndex: 3,
    name: 'ICO History',
    icon: EqualizerIcon,
    component: ICOHistory,
    layout: '/admin',
  },
  {
    path: '/log/user',
    tabIndex: 4,
    name: 'UserLog',
    icon: EqualizerIcon,
    component: UserLog,
    layout: '/admin',
  },
  {
    path: '/chat/live_chat_history',
    tabIndex: 5,
    name: 'Public Chat History',
    icon: ForumIcon,
    component: ChatHistory,
    layout: '/admin',
  },
  {
    path: '/chat/support_chat',
    tabIndex: 5,
    name: 'Support Chat',
    icon: PermPhoneMsgIcon,
    component: SupportChat,
    layout: '/admin',
  },
  {
    path: '/notification',
    tabIndex: 6,
    name: 'Notification',
    icon: NotificationsActiveIcon,
    component: Notification,
    layout: '/admin',
  },
  {
    path: '/setting',
    tabIndex: 7,
    name: 'Setting',
    icon: SettingsIcon,
    component: Setting,
    layout: '/admin',
  },
  {
    path: '/pair',
    tabIndex: 7,
    name: 'Pair',
    icon: ShareIcon,
    component: Pair,
    layout: '/admin',
  },
  // {
  //   layout: '/login',
  // },
]

export default dashboardRoutes
