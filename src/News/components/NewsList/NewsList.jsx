import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller' 

import {
  List,
  CircularProgress,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import Story from './components/Story'

const useStyles = makeStyles(theme => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));

const NewsList = ( { theme }) => {
  const classes = useStyles();
  const [ latestNews, setLatestNews ] = useState([])
  const [ stories, setStories ] = useState([])
  const [ page, setPage ] = useState()
  const [ hasMore, setHasMore ] = useState(false)
  const limit = 20

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(res => setLatestNews(res))
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    // return early if no news
    if (latestNews.length === 0) return
    setPage(0)
  }, [latestNews])

  useEffect(() => {
    // return early if no news
    if (!Number.isInteger(page)) return

    // get current page of items
    const newsItems = latestNews.slice(page * limit, ( page * limit ) + limit)

    if (newsItems.length === 0) {
      setHasMore(false)
      return
    }

    const newItemReqs = newsItems.map(n => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${n}.json`)
        .then(r => r.json())
        .catch(e => console.log(e))
    })

    Promise.all(newItemReqs)
      .then(res => {
        setStories([...stories, ...res])
        setHasMore(true)
      })
      .catch(e => console.log(e))
  }, [page])

  const loadMore = () => {
    setHasMore(false)
    setPage(page + 1)
  }

  return (
    <List disablePadding>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<div className={classes.loader}><CircularProgress key="loader" color="secondary" /></div>}
      >
        {stories.map((story, i) => (                  
          <Story key={story.id} story={story} page={page} index={i} />
        ))}
      </InfiniteScroll>      
    </List>
  )
}

export default NewsList