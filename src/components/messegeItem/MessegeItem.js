import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

import './messegeItem.css'

const MessegeItem = forwardRef(({ messege, MyUserName }, ref) => {
  const { userName, text } = messege;
  const isUser = MyUserName === userName;

  return (
    <div ref={ref} className={`messege ${isUser && ` messege__user`}`}>
      <Card className={isUser ? 'messege__userCard' : 'messege__guestCard'}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
          >
            { !isUser && `${userName}: ` } {text}
          </Typography>
        </CardContent>
      </Card>
    </div>  
  )
})

export default MessegeItem
