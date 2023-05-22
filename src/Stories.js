import React from 'react'

const Stories = ({
  objectID,
  title,
  points,
  auther,
  num_comments,
  url,
  removeItem,
}) => {
  return (
    <article className='item'>
      <h3>{title}</h3>
      <p>
        {points} points by {auther} | {num_comments} comments
      </p>
      <div className='actions'>
        <a href={url} className='read-more'>
          Read More
        </a>
        <button className='remove-btn' onClick={() => removeItem(objectID)}>
          Remove
        </button>
      </div>
    </article>
  )
}

export default Stories
