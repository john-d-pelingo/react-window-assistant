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
  [camel, changeCase.camel(camel)],
  [constant, changeCase.constant(constant)],
  [dot, changeCase.dot(dot)],
  [header, changeCase.header(header)],
  [lower, changeCase.lower(lower)],
  [lowerFirst, changeCase.lcFirst(lowerFirst)],
  [no, changeCase.no(no)],
  [param, changeCase.param(param)],
  [pascal, changeCase.pascal(pascal)],
  [path, changeCase.path(path)],
  [sarcasmLowerFirst, sarcasmCase(sarcasmLowerFirst, 0)],
  [sarcasmUpperFirst, sarcasmCase(sarcasmUpperFirst, 1)],
  [sentence, changeCase.sentence(sentence)],
  [snake, changeCase.snake(snake)],
  [swap, changeCase.swap(swap)],
  [title, changeCase.title(title)],
  [upper, changeCase.upper(upper)],
  [upperFirst, changeCase.ucFirst(upperFirst)],
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
