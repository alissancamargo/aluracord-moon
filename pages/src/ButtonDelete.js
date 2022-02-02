import React from 'react'
import { Button } from '@skynexui/components'

export default function ButtonDelete(props) {
  return (
    <div
      style={{
        position: 'absolute',
        right: '20px',
        top: '15px',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        variant="tertiary"
        colorVariant="light"
        styleSheet={{
          borderRadius: '50%',
          width: '25px',
          height: '25px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          hover: {
            filter: 'grayscale(0)'
          }
        }}
        label="🗑️"
        onClick={props.onClick}
      />
    </div>
  )
}
