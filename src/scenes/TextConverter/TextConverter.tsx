import { Container, OutlinedInput } from '@material-ui/core'
import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { Cases } from './Cases'
import { setCase, setText } from './useTextConverter/actions'
import { useTextConverter } from './useTextConverter/hook'

const StyledOutlinedInput = styled(OutlinedInput)`
  font-family: 'Courier New', mono, sans-serif;
  font-size: 16px;
`

// TODO: connect with query parameter to make sharable
// TODO: add tests
export const TextConverter: FC = () => {
  const inputNode = useRef<HTMLTextAreaElement>()
  const { dispatch, text } = useTextConverter({
    text: '',
  })

  useEffect(() => {
    if (inputNode.current) {
      inputNode.current.focus()
    }
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setText(event.target.value))
  }

  return (
    <>
      <Helmet>
        <title>Text Converter</title>
      </Helmet>
      <Container maxWidth="xl" style={{ margin: '100px 0' }}>
        <StyledOutlinedInput
          fullWidth
          inputProps={{
            'aria-label': 'JSON input',
          }}
          inputRef={inputNode}
          labelWidth={0}
          multiline
          onChange={handleInputChange}
          placeholder="Write your text here"
          rows={20}
          value={text}
        />
        <Cases
          disabled={text.trim().length === 0}
          onSetCase={textCase => {
            dispatch(setCase(text, textCase))
          }}
        />
        {/* TODO: add clear and copy text */}
      </Container>
    </>
  )
}
