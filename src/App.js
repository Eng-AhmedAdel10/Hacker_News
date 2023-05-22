import React, { useState, useEffect } from 'react'
import Search from './Search'
import Stories from './Stories'

const API = 'https://hn.algolia.com/api/v1/search?'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [query, setQuery] = useState('react')
  const [page, setPage] = useState(0)

  const fetchData = async () => {
    setIsLoading(true)
    const url = `${API}query=${query}&page=${page}`
    const res = await fetch(url)
    const data = await res.json()
    setData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [state.page, state.query])

  const computePage = (page) => {
    if (page >= data.nbPages) {
      return 0
    }
    if (page < 0) {
      return data.nbPages - 1
    }
    return page
  }

  const handlePrev = () => {
    if (isLoading) {
      return false
    }
    setPage((oldPage) => {
      return computePage(oldPage - 1)
    })
  }

  const handleNext = () => {
    if (isLoading) {
      return false
    }
    setPage((oldPage) => {
      return computePage(oldPage + 1)
    })
  }

  const handleQuery = (query) => {
    setQuery(query)
  }

  useEffect(() => {
    fetchData()
  }, [page, query])

  const removeItem = (id) => {
    const newData = data.hits.filter((item) => item.objectID !== id)
    setData({ ...data, hits: newData })
  }

  return (
    <main className='main'>
      <div className='container'>
        <h2 className='title'>search hacker news</h2>

        <Search handleQuery={handleQuery} query={query} />

        <div className='btns-container'>
          <button
            className={`btn ${isLoading ? 'block' : false}`}
            onClick={handlePrev}
          >
            prev
          </button>
          <span className='num-of-page'>
            {page + 1} of {data.nbPages}
          </span>
          <button
            className={`btn ${isLoading ? 'block' : false}`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        <div className='result'>
          {isLoading ? (
            <div class='loading'></div>
          ) : (
            data.hits.map((item) => (
              <Stories key={item.objectID} {...item} removeItem={removeItem} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default App
