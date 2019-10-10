import React, { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { keyCodeQueryParameter } from 'consants/strings'
import { extractQueryParameter } from 'helpers/extractQueryParameter'
import { useQueryParameterComputation } from 'hooks/useQueryParameterComputation'

import { KeyCode } from './KeyCode'
import { KeyCodeState, useKeyCode } from './useKeyCode'

const KeyCodeRevealerContainer = styled.div`
  display: table;
  height: 60vh;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  outline: none;
`

const DefaultText = styled.span`
  display: table-cell;
  font-size: 50px;
  line-height: 55px;
  vertical-align: middle;
`

const initialState: KeyCodeState = {
  isBlurred: true,
  newKey: '',
}

export const KeyCodeRevealer: FC = () => {
  const {
    appElement,
    blurElement,
    focusElement,
    newKey,
    newKeyCode,
    resetKeyCode,
    setNewKeyCode,
  } = useKeyCode<HTMLDivElement>(initialState)

  const history = useHistory()
  useQueryParameterComputation({
    history,
    key: keyCodeQueryParameter,
    value: newKeyCode,
  })

  useEffect(() => {
    const potentialKey = extractQueryParameter({
      history,
      key: keyCodeQueryParameter,
    })

    if (potentialKey) {
      setNewKeyCode({
        key: '',
        which: Number(potentialKey),
      })
    }
    // eslint-disable-next-line
  }, [history])

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    resetKeyCode()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Keep the original synthetic event around.
    // See https://fb.me/react-event-pooling for more information.
    event.persist()

    if (!event.metaKey) {
      event.preventDefault()
    }

    setNewKeyCode({
      key: event.key,
      which: event.which,
    })
  }

  return (
    <>
      <Helmet>
        <title>
          {newKeyCode === undefined || newKeyCode === ''
            ? 'Key Code Revealer'
            : `${newKeyCode} : ${newKey}`}
        </title>
      </Helmet>
      <KeyCodeRevealerContainer
        aria-label="key-code-app"
        tabIndex={0}
        onBlur={blurElement}
        onFocus={focusElement}
        // TODO: maybe attach to window and reuse the hook I have in my blog
        onKeyDown={handleKeyDown}
        ref={appElement}
      >
        {newKeyCode ? (
          <KeyCode
            keyCode={Number(newKeyCode)}
            keyText={newKey}
            handleClick={event => {
              handleClick(event)
            }}
          />
        ) : (
          <DefaultText>Press a key in your keyboard</DefaultText>
        )}
      </KeyCodeRevealerContainer>
    </>
  )
}
