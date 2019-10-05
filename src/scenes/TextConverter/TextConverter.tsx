import { Container, OutlinedInput } from '@material-ui/core'
import debounce from 'debounce'
import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { textConverterQueryParameter } from 'consants/strings'
import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { removeQueryParameter } from 'helpers/removeQueryParameter'

import { Cases } from './Cases'
import { setCase, setText } from './useTextConverter/actions'
import { useTextConverter } from './useTextConverter/hook'

const StyledOutlinedInput = styled(OutlinedInput)`
  font-family: 'Courier New', mono, sans-serif;
  font-size: 16px;
`

const debouncedAppendQueryParameter = debounce(appendQueryParameter, 200)
const debouncedRemoveQueryParameter = debounce(removeQueryParameter, 200)

// TODO: add tests
export const TextConverter: FC = () => {
  const inputNode = useRef<HTMLTextAreaElement>()
  const { dispatch, text } = useTextConverter({
    text: '',
  })

  const history = useHistory()

  useEffect(() => {
    if (inputNode.current) {
      inputNode.current.focus()
    }
  }, [])

  useEffect(() => {
    if (text.trim().length === 0) {
      debouncedRemoveQueryParameter({
        history,
        key: textConverterQueryParameter,
      })
      return
    }
    debouncedAppendQueryParameter({
      history,
      key: textConverterQueryParameter,
      value: text,
    })
  }, [history, text])

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target
    dispatch(setText(value))
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
