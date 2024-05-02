import React from 'react'

const Card = (props: { children: JSX.Element }) => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded lg-shadow hover:bg-gray-100 dark:bg-gray800 dark:border-gray-700 dark:hover:bg-gray-700">{props.children}</div>
  )
}

export default Card