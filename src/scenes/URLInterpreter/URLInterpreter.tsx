import { Container, TextField } from '@material-ui/core'
import { InvalidInput } from 'components/InvalidInput'
import { urlInterpreterQueryParameter } from 'consants/strings'
import { extractQueryParameter } from 'helpers/extractQueryParameter'
import { useQueryParameterComputation } from 'hooks/useQueryParameterComputation'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

import { Interpretation } from './Interpretation'

const URLInterpreter: FC = () => {
  const urlInputElement = useRef<HTMLInputElement>()
  const [urlText, setUrlText] = useState<string | undefined>(undefined)
  const [urlInstance, setUrlInstance] = useState<URL | null>()

  const history = useHistory()
  useQueryParameterComputation({
    history,
    key: urlInterpreterQueryParameter,
    value: urlText,
  })

  useEffect(() => {
    if (urlInputElement.current) {
      urlInputElement.current.focus()
    }

    const queryParameter = extractQueryParameter({
      history,
      key: urlInterpreterQueryParameter,
    })

    if (queryParameter) {
      setUrlText(queryParameter)

      try {
        const newUrlInstance = new URL(queryParameter)
        setUrlInstance(newUrlInstance)
      } catch (error) {
        return
      }
    }
  }, [history])

  const handleUrlInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setUrlText(value)

    try {
      const newUrlInstance = new URL(value)
      setUrlInstance(newUrlInstance)
    } catch (error) {
      setUrlInstance(null)
    }
  }

  // TODO: add ability to add/remove keys
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
          value={urlText ? urlText : ''}
        />
        {urlInstance ? (
          <Interpretation urlInstance={urlInstance} />
        ) : (
          urlText &&
          urlText.trim().length !== 0 && (
            <InvalidInput>Invalid URL value!</InvalidInput>
          )
        )}
      </Container>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default URLInterpreter
