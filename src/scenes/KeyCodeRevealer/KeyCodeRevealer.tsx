import React, { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

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

const documentTitle = 'Key Code Revealer'

const initialState: KeyCodeState = {
  isBlurred: true,
  newKey: '',
  newKeyCode: null,
}

// TODO: connect with query parameter to make sharable
export const KeyCodeRevealer: FC = () => {
  const {
    appElement,
    handleBlur,
    handleClick: handleKeyCodeClick,
    handleFocus,
    handleKeyDown: handleKeyCodeKeyDown,
    newKey,
    newKeyCode,
  } = useKeyCode<HTMLDivElement>(initialState)

  useEffect(() => {
    if (newKey && newKeyCode) {
      document.title = `${newKeyCode} : ${newKey}`
    }
  }, [newKey, newKeyCode])

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    handleKeyCodeClick()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Keep the original synthetic event around.
    // See https://fb.me/react-event-pooling for more information.
    event.persist()

    if (!event.metaKey) {
      event.preventDefault()
    }

    handleKeyCodeKeyDown({
      key: event.key,
      which: event.which,
    })
  }

  return (
    <>
      <Helmet>
        <title>{documentTitle}</title>
      </Helmet>
      <KeyCodeRevealerContainer
        aria-label="key-code-app"
        tabIndex={0}
        onBlur={handleBlur}
        onFocus={handleFocus}
        // TODO: maybe attach to window
        onKeyDown={handleKeyDown}
        ref={appElement}
      >
        {newKeyCode ? (
          <KeyCode
            keyCode={Number(newKeyCode)}
            keyText={newKey}
            handleClick={event => {
              handleClick(event)
              document.title = documentTitle
            }}
          />
        ) : (
          <DefaultText>Press a key in your keyboard</DefaultText>
        )}
      </KeyCodeRevealerContainer>
    </>
  )
}
