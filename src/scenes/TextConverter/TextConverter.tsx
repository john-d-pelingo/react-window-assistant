import { OutlinedInput } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import React, { ChangeEvent, FC } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { setCase } from './useTextConverter/actions'
import { useTextConverter } from './useTextConverter/hook'

const StyledOutlinedInput = styled(OutlinedInput)`
  font-family: 'Courier New', mono, sans-serif;
  font-size: 16px;
`

// TODO: connect with query parameter to make sharable
export const TextConverter: FC<RouteComponentProps> = () => {
  const { dispatch, text } = useTextConverter({
    text: 'Fff gogms lgekdpp',
  })

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    // TODO: add change text action
    console.log(event.target.value)
  }

  return (
    <>
      <Helmet>
        <title>Text Converter</title>
      </Helmet>
      <StyledOutlinedInput
        fullWidth
        inputProps={{
          'aria-label': 'JSON input',
        }}
        labelWidth={0}
        multiline
        onChange={handleInputChange}
        placeholder="Write your text here"
        rows={20}
        value={text}
      />
      <button
        onClick={() => {
          dispatch(setCase(text, 'camel'))
        }}
      >
        Camel Case
      </button>
    </>
  )
}
