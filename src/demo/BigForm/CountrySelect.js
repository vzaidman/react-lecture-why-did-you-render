import React from 'react'

import countryList from './countryList'
import {uniqBy} from "lodash"

export default React.memo(({countryCode, onChange}) => {
  console.log('CountrySelect render')

  const countryListArray = uniqBy([
    [countryCode, countryList[countryCode]],
    ...Object.entries(countryList)
  ], '0')

  return (
    <div>
      <label>
        Country:
        <select
          value={countryCode}
          onChange={e => onChange(e.target.value)}
        >
          {countryListArray.map(([countryCode, countryName]) => (
            <option key={countryCode} value={countryCode}>
              {countryName}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
})
