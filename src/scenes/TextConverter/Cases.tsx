import { Chip } from '@material-ui/core'
import changeCase from 'change-case'
import React, { FC } from 'react'
import styled from 'styled-components'

import { sarcasmCase } from './sarcasmCase'
import {
  camel,
  Case,
  constant,
  dot,
  header,
  lower,
  lowerFirst,
  no,
  param,
  pascal,
  path,
  sarcasmLowerFirst,
  sarcasmUpperFirst,
  sentence,
  snake,
  swap,
  title,
  upper,
  upperFirst,
} from './useTextConverter/actions'

const Wrapper = styled.div`
  width: 80%;
  text-align: center;
  margin: 0 auto;
  margin-top: 24px;
`

const StyledChip = styled(Chip)`
  margin: 0 5px 5px;
`

const textCases: Array<[Case, string]> = [
  [camel, changeCase.camel(`${camel} case`)],
  [constant, changeCase.constant(`${constant} case`)],
  [dot, changeCase.dot(`${dot} case`)],
  [header, changeCase.header(`${header} case`)],
  [lower, changeCase.lower(`${lower} case`)],
  [lowerFirst, changeCase.lcFirst(`${lowerFirst} case`)],
  [no, changeCase.no(`${no} case`)],
  [param, changeCase.param(`${param} case`)],
  [pascal, changeCase.pascal(`${pascal} case`)],
  [path, changeCase.path(`${path} case`)],
  [sarcasmLowerFirst, sarcasmCase(`${sarcasmLowerFirst} case`, 0)],
  [sarcasmUpperFirst, sarcasmCase(`${sarcasmUpperFirst} case`, 1)],
  [sentence, changeCase.sentence(`${sentence} case`)],
  [snake, changeCase.snake(`${snake} case`)],
  [swap, changeCase.swap(`${swap} case`)],
  [title, changeCase.title(`${title} case`)],
  [upper, changeCase.upper(`${upper} case`)],
  [upperFirst, changeCase.ucFirst(`${upperFirst} case`)],
]

interface CasesProps {
  disabled?: boolean
  onSetCase: (textCase: Case) => void
}

export const Cases: FC<CasesProps> = ({ disabled = false, onSetCase }) => {
  return (
    <Wrapper>
      {textCases.map(([textCase, text]) => (
        <StyledChip
          key={textCase}
          aria-label={text}
          disabled={disabled}
          label={text}
          onClick={() => {
            onSetCase(textCase)
          }}
          variant="outlined"
        />
      ))}
    </Wrapper>
  )
}
