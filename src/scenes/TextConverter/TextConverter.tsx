import { Container, OutlinedInput } from '@material-ui/core'
import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { textConverterQueryParameter } from 'consants/strings'
import { extractQueryParameter } from 'helpers/extractQueryParameter'
import { useQueryParameterComputation } from 'hooks/useQueryParameterComputation'

import { Cases } from './Cases'
import { setCase, setText } from './useTextConverter/actions'
import { useTextConverter } from './useTextConverter/hook'

const StyledOutlinedInput = styled(OutlinedInput)`
  font-family: 'Courier New', mono, sans-serif;
  font-size: 16px;
`

// TODO: add tests
export const TextConverter: FC = () => {
  const inputNode = useRef<HTMLTextAreaElement>()
  const { dispatch, text } = useTextConverter({
    text: '',
  })

  const history = useHistory()
  useQueryParameterComputation({
    history,
    key: textConverterQueryParameter,
    value: text,
  })

  useEffect(() => {
    if (inputNode.current) {
      inputNode.current.focus()
    }

    const queryParameter = extractQueryParameter({
      history,
      key: textConverterQueryParameter,
    })

    if (queryParameter) {
      dispatch(setText(queryParameter))
    }
  }, [dispatch, history])

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
