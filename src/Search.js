import React from 'react'

const Search = ({ handleQuery, query }) => {
  return (
    <form className='search-form'>
      <input
        type='search'
        className='search-input'
        placeholder='Search'
        value={query}
        onChange={(e) => {
          handleQuery(e.target.value)
        }}
      />
    </form>
  )
}

export default Search
