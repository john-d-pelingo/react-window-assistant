import { Container, OutlinedInput } from '@material-ui/core'
import {
  ChangeEvent,
  createRef,
  FC,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Helmet } from 'react-helmet'
import sortKeys from 'sort-keys'
import styled from 'styled-components'

import { ButtonActions } from './ButtonActions'
import { Notification } from './Notification'

const StyledOutlinedInput = styled(OutlinedInput)`
  font-family: 'Courier New', mono, sans-serif;
  font-size: 16px;
`

const JSONSorter: FC = () => {
  const inputNode = useRef<HTMLTextAreaElement>()
  const formNode = createRef<HTMLFormElement>()
  const [jsonText, setJsonText] = useState('')
  const [canCopyJson, setCanCopyJson] = useState(false)
  const [isErrorNotificationOpen, setIsErrorNotificationOpen] = useState(false)

  useEffect(() => {
    if (inputNode.current) {
      inputNode.current.focus()
    }
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target

    setJsonText(value)

    try {
      const parsedText = JSON.parse(value)
      sortKeys(parsedText)

      setCanCopyJson(true)
    } catch (error) {
      setCanCopyJson(false)
    }
  }

  const handleSubmit = (event?: FormEvent<HTMLFormElement>): void => {
    if (event) {
      event.preventDefault()
    }

    try {
      const parsedText = JSON.parse(jsonText)
      const sortedKeys = sortKeys(parsedText)

      setJsonText(JSON.stringify(sortedKeys, undefined, 2) + '\n')
      setCanCopyJson(true)

      if (inputNode.current) {
        inputNode.current.focus()
      }
    } catch (error) {
      setCanCopyJson(false)
      setIsErrorNotificationOpen(true)

      if (inputNode.current) {
        inputNode.current.focus()
      }
    }
  }

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (isErrorNotificationOpen) {
      setIsErrorNotificationOpen(false)
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      (event.keyCode === 13 || event.keyCode === 10) &&
      formNode.current
    ) {
      handleSubmit()
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON Sorter</title>
      </Helmet>
      <Container maxWidth="xl" style={{ margin: '100px 0' }}>
        <Notification
          autoHideDuration={5000}
          category="error"
          isSnackBarOpen={isErrorNotificationOpen}
          message="Invalid JSON!"
          onClose={() => {
            setIsErrorNotificationOpen(false)
          }}
        />
        <form onSubmit={handleSubmit} ref={formNode}>
          <StyledOutlinedInput
            fullWidth
            inputProps={{
              'aria-label': 'JSON input',
            }}
            inputRef={inputNode}
            labelWidth={0}
            multiline
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Paste your JSON object here"
            rows={20}
            value={jsonText}
          />
          <ButtonActions
            canCopyJson={canCopyJson}
            canSort={jsonText.trim().length !== 0}
            textToCopy={jsonText}
          />
        </form>
      </Container>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default JSONSorter
