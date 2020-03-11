import React, { memo } from 'react'
import moment from 'moment'
import { object, number } from 'prop-types'

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Link,
  Avatar,
  IconButton,
  Badge,
} from '@material-ui/core'

import CommentIcon from '@material-ui/icons/Comment'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  primary: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  }
}))

const ListTextPrimary = ({ story }) => {
  return (
    <Link
      href={story.url}
      underline="hover"
      target="_blank"
      rel="noreferrer"
    >
      {story.title}
    </Link>
 )
}

const ListTextSecondary = ({ story }) => {
  return (
    <React.Fragment>
      <span><b>{story.score}</b> points by </span>
      <Link
        href={`https://news.ycombinator.com/user?id=${story.by}`}
        underline="hover"
        target="_blank"
        rel="noreferrer"
      > 
        {story.by}
      </Link>
      &nbsp;
      <Link
        href={`https://news.ycombinator.com/item?id=${story.id}`}
        underline="hover"
        target="_blank"
        rel="noreferrer"
        color="inherit"
      >
        {moment(story.time, 'X').fromNow()}
      </Link>
    </React.Fragment>
 )
}

const Story = memo(({ story, index, theme }) => {
  const classes = useStyles(theme)

  return (
    <ListItem key={story.id} button>
      <ListItemAvatar>
        <Avatar className={classes.primary}>{index + 1}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<ListTextPrimary story={story} />}
        secondary={<ListTextSecondary story={story} />}
      />
      <ListItemSecondaryAction>
        <Link
          href={`https://news.ycombinator.com/item?id=${story.id}`}
          underline="hover"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton edge="end" aria-label="comments">
            <Badge badgeContent={story.kids && story.kids.length} color="secondary">
              <CommentIcon />
            </Badge>           
          </IconButton>
        </Link>            
      </ListItemSecondaryAction>         
    </ListItem>
  )
})

Story.propTypes = {
  story: object.isRequired,
  index: number.isRequired,
}

export default Story