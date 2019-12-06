import { Chip } from '@material-ui/core'
import {
  camelCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case'
import { lowerCase } from 'lower-case'
import { lowerCaseFirst } from 'lower-case-first'
import React, { FC } from 'react'
import styled from 'styled-components'
import { swapCase } from 'swap-case'
import { titleCase } from 'title-case'
import { upperCase } from 'upper-case'
import { upperCaseFirst } from 'upper-case-first'

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
  [camel, camelCase(`${camel} case`)],
  [constant, constantCase(`${constant} case`)],
  [dot, dotCase(`${dot} case`)],
  [header, headerCase(`${header} case`)],
  [lower, lowerCase(`${lower} case`)],
  [lowerFirst, lowerCaseFirst(`${lowerFirst} case`)],
  [no, noCase(`${no} case`)],
  [param, paramCase(`${param} case`)],
  [pascal, pascalCase(`${pascal} case`)],
  [path, pathCase(`${path} case`)],
  [sarcasmLowerFirst, sarcasmCase(`${sarcasmLowerFirst} case`, 0)],
  [sarcasmUpperFirst, sarcasmCase(`${sarcasmUpperFirst} case`, 1)],
  [sentence, sentenceCase(`${sentence} case`)],
  [snake, snakeCase(`${snake} case`)],
  [swap, swapCase(`${swap} case`)],
  [title, titleCase(`${title} case`)],
  [upper, upperCase(`${upper} case`)],
  [upperFirst, upperCaseFirst(`${upperFirst} case`)],
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
