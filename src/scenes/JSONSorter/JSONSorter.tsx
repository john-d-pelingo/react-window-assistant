import { Container, OutlinedInput } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import React, {
  ChangeEvent,
  createRef,
  FC,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import sortKeys from 'sort-keys'

import { ButtonActions } from './ButtonActions'
import { ErrorNotification } from './ErrorNotification'
import { useJsonSorterStyles } from './useJsonSorterStyles'

export const JSONSorter: FC<RouteComponentProps> = () => {
  const classes = useJsonSorterStyles()
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

  return (
    <Container className={classes.container} maxWidth="xl">
      <ErrorNotification
        autoHideDuration={5000}
        isSnackBarOpen={isErrorNotificationOpen}
        message="Invalid JSON!"
        onClose={() => {
          setIsErrorNotificationOpen(false)
        }}
        variant="error"
      />
      <form onSubmit={handleSubmit} ref={formNode}>
        <OutlinedInput
          className={classes.inputText}
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
  )
}
