import React from 'react'
import styled from 'styled-components'

const KeyCodeContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const KeyCodeNumber = styled.span`
  display: block;
  font-size: 300px;
  line-height: 320px;
  padding-bottom: 40px;
`

const KeyCodeButton = styled.button`
  background: #eff0f2;
  border-radius: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9,
    0 2px 3px #333;
  color: #aaa;
  cursor: pointer;
  display: inline-block;
  font: 38px/40px 'Helvetica Neue';
  font-weight: bold;
  margin: 0;
  padding: 15px 30px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
`

interface IKeyCodeProps {
  handleClick?: (event: React.MouseEvent<HTMLSpanElement>) => void
  keyCode: number
  keyText?: string
}

export const KeyCode: React.FC<IKeyCodeProps> = ({
  keyCode,
  keyText,
  handleClick = () => undefined,
}) => (
  <KeyCodeContainer>
    <KeyCodeNumber aria-label="key-code-number">
      {isNaN(keyCode) ? '!=Num' : keyCode}
    </KeyCodeNumber>
    <KeyCodeButton aria-label="key-code-button" onClick={handleClick}>
      {keyText || 'What key code is that?'}
    </KeyCodeButton>
  </KeyCodeContainer>
)
