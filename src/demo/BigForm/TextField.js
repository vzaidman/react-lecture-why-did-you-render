import React from 'react'

export default React.memo(({name, label, value, onChange}) => {
  console.log(`TextField ${name} render`)

  return (
    <div>
      <label>
        {label}:
        <input
          type="text"
          name={name}
          value={value}
          onChange={e => {
            onChange(e.target.value)
          }}
        />
      </label>
    </div>
  )
})
