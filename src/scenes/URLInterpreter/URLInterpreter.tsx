import { Container, TextField } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

import { InvalidInput } from 'components/InvalidInput'
import { urlInterpreterQueryParameter } from 'consants/strings'
import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { extractQueryParameter } from 'helpers/extractQueryParameter'

import { Interpretation } from './Interpretation'

export const URLInterpreter: FC<RouteComponentProps> = () => {
  const urlInputElement = useRef<HTMLInputElement>()
  const [urlText, setUrlText] = useState('')
  const [urlInstance, setUrlInstance] = useState<URL | null>()

  useEffect(() => {
    if (urlInputElement.current) {
      urlInputElement.current.focus()
    }

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    if (queryParameter) {
      setUrlText(queryParameter)

      try {
        const newUrlInstance = new URL(queryParameter)
        setUrlInstance(newUrlInstance)
      } catch (error) {
        return
      }
    }
  }, [])

  const handleUrlInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setUrlText(value)

    try {
      const newUrlInstance = new URL(value)
      setUrlInstance(newUrlInstance)
      appendQueryParameter(urlInterpreterQueryParameter, newUrlInstance.href)
    } catch (error) {
      appendQueryParameter(urlInterpreterQueryParameter, value)
      setUrlInstance(null)
    }
  }

  // TODO: add ability to add/remove keys
  // TODO: use textarea instead of input
  return (
    <>
      <Helmet>
        <title>URL Interpreter</title>
      </Helmet>
      <Container maxWidth="xl" style={{ margin: '100px 0' }}>
        <TextField
          fullWidth
          inputProps={{
            'aria-label': 'URL input',
          }}
          inputRef={urlInputElement}
          margin="normal"
          onChange={handleUrlInputChange}
          placeholder="URI to interpret"
          value={urlText}
        />
        {urlInstance ? (
          <Interpretation urlInstance={urlInstance} />
        ) : (
          urlText.trim().length !== 0 && (
            <InvalidInput>Invalid URL value!</InvalidInput>
          )
        )}
      </Container>
    </>
  )
}
