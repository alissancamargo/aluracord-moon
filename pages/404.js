import Link from 'next/link'
import { useState } from 'react'

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#D8A7CA',
        width: '100vw',
        height: '100%',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        fontFamily: 'Open Sanserif',
        color: '#52667A'
      }}
    >
      <h1>Oooooops...</h1>
      <h2 style={{ paddingBottom: '30px' }}>That page cannot found</h2>
      <div
        style={{
          borderTopColor: '#D8A7CA',
          borderTopWidth: 4,
          width: 498,
          display: 'flex',
          borderTopStyle: 'solid',
          marginBottom: -3,
          zIndex: 99
        }}
      ></div>
      <img
        src="https://i.pinimg.com/originals/a9/aa/c0/a9aac03f515231281e4fa7ec4af3c9dd.gif"
        alt="gifcat"
      />

      <p style={{ marginTop: '20px' }}>
        Go back{' '}
        <Link href="/">
          <a style={{ textDecoration: 'none', color: '#E4E7EB' }}>Homepage</a>
        </Link>
      </p>
    </div>
  )
}
export default NotFound
