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
import { RouteComponentProps } from '@reach/router'
import { Container, OutlinedInput } from '@material-ui/core'
import sortKeys from 'sort-keys'

import { ErrorNotification } from 'components/ErrorNotification'

import { ButtonActions } from './ButtonActions'
import { useJsonSorterStyles } from './useJsonSorterStyles'

interface IJSONSorterProps extends RouteComponentProps {}

export const JSONSorter: FC<IJSONSorterProps> = () => {
  const classes = useJsonSorterStyles()
  const inputNode = useRef<HTMLTextAreaElement>()
  const formNode = createRef<HTMLFormElement>()
  const [text, setText] = useState('')
  const [canCopyJson, setCanCopyJson] = useState(false)
  const [isErrorNotificationOpen, setIsErrorNotificationOpen] = useState(false)

  useEffect(() => {
    if (inputNode.current) {
      inputNode.current.focus()
    }
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target

    setText(value)

    try {
      //  TODO: debounce this
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
    event && event.preventDefault()

    try {
      const parsedText = JSON.parse(text)
      const sortedKeys = sortKeys(parsedText)

      setText(JSON.stringify(sortedKeys, undefined, 2) + '\n')
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
    <Container className={classes.container}>
      <ErrorNotification
        autoHideDuration={5000}
        isSnackBarOpen={isErrorNotificationOpen}
        message="Invalid JSON"
        onClose={() => setIsErrorNotificationOpen(false)}
        variant="error"
      />
      <form onSubmit={handleSubmit} ref={formNode}>
        <OutlinedInput
          className={classes.inputText}
          fullWidth
          inputRef={inputNode}
          labelWidth={0}
          multiline
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Paste your JSON object here"
          rows={20}
          value={text}
        />
        <ButtonActions
          canCopyJson={canCopyJson}
          canSort={text.trim().length !== 0}
          textToCopy={text}
        />
      </form>
    </Container>
  )
}
