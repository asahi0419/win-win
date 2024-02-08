import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { Avatar, Typography, Button, Badge } from '@material-ui/core'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import { useStyles } from './Style'
import Icon from '@material-ui/core/Icon'
import { REQUEST_API_URL, wsClient } from '../../../config/config'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { supportChat } from '../../../store/chat/selectors'
import { getSupportChatHistory } from '../../../store/chat'
import { Code } from '../../../constants'
import { chatDateConvert, dateConvert } from '../../../common/utils'
import Backimage from '../../../assets/img/selectchat.svg'
import SearchIcon from '@material-ui/icons/Search'
import MailIcon from '@material-ui/icons/Mail'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      marginRight: '5px',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        // animation: '$ripple 1.2s infinite ease-in-out',
        // border: '1px solid currentColor',
        content: '""',
      },
    },
  }),
)(Badge)

function SupportChat() {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const [userId, setUserId] = React.useState(0)
  const [userEmail, setUserEmail] = React.useState('')
  const [users, setUsers] = React.useState<any>([])
  const [message, setMessage] = React.useState('')
  const [searchUsers, setSearchUsers] = React.useState<any>([])
  const [searchText, setSearchText] = React.useState('')
  const [lastTime, setLastTime] = React.useState(0)

  const handleMessage = (e: string) => {
    setMessage(e)
  }

  var sendSupportMessageData = {
    code: Code.CODE_SUPPORT_MESSAGE,
    data: {
      userid: userId,
      msg: message,
    },
  }

  var chatReadState = {
    code: Code.CODE_CHAT_SEEN,
    data: {
      userid: userId,
      timestamp: Date.now(),
    },
  }

  const sendMessageSubmit = (e: any) => {
    e.preventDefault()
    wsClient.send(JSON.stringify(sendSupportMessageData))
    wsClient.send(JSON.stringify(chatReadState))
    setMessage('')
  }

  const getUsers = async () => {
    var jwtToken = localStorage.getItem('jwtToken')
    await axios
      .post(
        `${REQUEST_API_URL}/admin/chat/user-list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      .then((res: any) => {
        if (!res.data.Success) return

        const getUsers = res.data.Data
        getUsers.sort((a: any, b: any) => b.LastMsgTime.toString().localeCompare(a.LastMsgTime.toString()))
        setUsers(getUsers)
      })

    // let tempArray: any = []
  }
  const chatHistory = useAppSelector(supportChat)

  React.useEffect(() => {
    var element: any = document.getElementById('chatContent')
    element?.scrollTo(0, element.scrollHeight)
    getUsers()
  }, [chatHistory])

  const getChatHistory = async (e: any) => {
    setUserId(e.UserId)
    setUserEmail(e.Email)
    setLastTime(e.LastMsgTime)
    wsClient.send(JSON.stringify(chatReadState))

    const readFormData = new FormData()
    readFormData.append('user_id', e?.UserId?.toString())
    readFormData.append('timestamp', Date.now().toString())

    var jwtToken = localStorage.getItem('jwtToken')
    await axios.post(`${REQUEST_API_URL}/supportchat/status/update`, readFormData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    const formData = new FormData()
    formData.append('user_id', e?.UserId?.toString())
    dispatch(getSupportChatHistory(formData))
  }

  const handleSearch = (e: string) => {
    setSearchText(e)
    let result = []
    for (let i = 0; i < users.length - 1; i++) {
      if (users[i]?.Email?.toLowerCase().indexOf(e.toLowerCase()) !== -1) {
        result.push(users[i])
      }
    }
    setSearchUsers(result)
  }

  return (
    <div className={classes.container}>
      <div className={classes.leftDiv}>
        <div className={classes.searchBar}>
          <div className={classes.searchSide}>
            <input onChange={(e) => handleSearch(e.target.value)} className={classes.input} />
            <SearchIcon className={classes.searchIcon} />
          </div>
        </div>
        {searchText.length !== 0
          ? searchUsers?.map((user: any, key: any) => (
              <div
                key={key}
                onClick={(e) => getChatHistory(user)}
                className={user.UserId === userId ? classes.activeDiv : classes.userDiv}
              >
                <button className={classes.userlink}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt={user.Email} src="/static/images/avatar/1.jpg" className={classes.avatar} />
                  </StyledBadge>
                  <div className={classes.showInfo}>
                    <Typography className={classes.lastMessage2}>
                      {user.Email === '' ? user.PhoneNumber : user.Email}
                    </Typography>
                    <Typography className={classes.lastMessage}>{user.LastMsg}</Typography>
                  </div>
                  <div style={{ marginRight: '5px' }}>
                    <Typography className={classes.lastMessage1}>
                      {user.LastMsgTime === 0 ? '' : dateConvert(user.LastMsgTime)}
                    </Typography>
                  </div>
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.emailAlarm}
                    invisible={user.UnreadMsgCnt > 0 ? false : true}
                  >
                    <MailIcon className={user.UnreadMsgCnt > 0 ? classes.mailIcon : classes.mailIconHide} />
                  </Badge>
                </button>
              </div>
            ))
          : users?.map((user: any, key: any) => (
              <div
                key={key}
                onClick={(e) => getChatHistory(user)}
                className={user.UserId === userId ? classes.activeDiv : classes.userDiv}
              >
                <button className={classes.userlink}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt={user.Email} src="/static/images/avatar/1.jpg" className={classes.avatar} />
                  </StyledBadge>
                  <div className={classes.showInfo}>
                    <Typography className={classes.lastMessage2}>
                      {user.Email === '' ? user.PhoneNumber : user.Email}
                    </Typography>
                    <Typography className={classes.lastMessage}>{user.LastMsg}</Typography>
                  </div>
                  <div style={{ marginRight: '5px' }}>
                    <Typography className={classes.lastMessage1}>
                      {user.LastMsgTime === 0 ? '' : dateConvert(user.LastMsgTime)}
                    </Typography>
                  </div>
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.emailAlarm}
                    invisible={user.UnreadMsgCnt > 0 && user.UserId !== userId ? false : true}
                  >
                    <MailIcon className={user.UnreadMsgCnt > 0 ? classes.mailIcon : classes.mailIconHide} />
                  </Badge>
                </button>
              </div>
            ))}
      </div>
      <div className={classes.rightDiv}>
        {userId > 0 ? (
          <>
            <div className={classes.chatHeader}>
              <Avatar alt={userEmail} src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <div>
                <Typography className={classes.headerText}>{userEmail}</Typography>
                <Typography className={classes.headerTime}>{lastTime === 0 ? '' : dateConvert(lastTime)}</Typography>
              </div>
            </div>

            <div className={classes.textDiv} id="chatContent">
              {chatHistory.map((text: any, key: any) => (
                <div key={key}>
                  {text.Type === 'Client' && text.UserId === userId ? (
                    <>
                      <div className={classes.chatShowDiv}>
                        <Avatar alt={userEmail} src="/static/images/avatar/1.jpg" className={classes.avatar} />
                        <div>
                          <Typography style={{ fontSize: '12px' }}>{chatDateConvert(text.CreatedAt)}</Typography>
                          <div className={classes.text1}>{text.Message}</div>
                        </div>
                      </div>
                    </>
                  ) : text.Type === 'Support' && text.UserId === userId ? (
                    <>
                      <div className={classes.chatShowDiv}>
                        <div className={classes.right}>
                          <div className={classes.time}> {chatDateConvert(text.CreatedAt)}</div>
                          <div className={classes.text2}>{text.Message}</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
            <div className={classes.inputDiv}>
              <form onSubmit={sendMessageSubmit}>
                <div style={{ display: 'flex' }}>
                  <div className={classes.inputSide}>
                    <input
                      placeholder="Type a message"
                      className={classes.input}
                      value={message}
                      onChange={(e) => handleMessage(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<Icon>send</Icon>}
                    className={classes.sendBtn}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className={classes.backDiv}>
            <img alt="logo" src={Backimage} className={classes.backImg} />
            <Typography className={classes.backText}>Select a chat to read messages</Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export default SupportChat
