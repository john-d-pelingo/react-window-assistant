import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Box, Button, Container, OutlinedInput } from '@material-ui/core'
import sortKeys from 'sort-keys'

import { useJsonSorterStyles } from './useJsonSorterStyles'

interface IJSONSorterProps extends RouteComponentProps {}

export const JSONSorter: FC<IJSONSorterProps> = () => {
  const classes = useJsonSorterStyles()
  const [text, setText] = useState('')

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    try {
      const parsedText = JSON.parse(text)
      const sortedKeys = sortKeys(parsedText)
      console.log('>> sortedKeys', sortedKeys)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container className={classes.container}>
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          className={classes.text}
          fullWidth
          labelWidth={0}
          multiline
          onChange={handleTextChange}
          placeholder="Paste your JSON object here"
          rows={15}
          value={text}
        />
        <Box className={classes.submitBox}>
          <Button className={classes.submit} type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  )
}
