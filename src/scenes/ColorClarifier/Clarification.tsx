import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Color from 'color'
import React, { FC } from 'react'
import styled from 'styled-components'

import { CopyColorButton } from './CopyColorButton'

const StyledPaper = styled(Paper)`
  width: 100%;
  margin-top: 24px;
  overflow-x: auto;
`

const ColorTableCell = styled(TableCell)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

interface IClarificationProps {
  colorInstance: Color
}

export const Clarification: FC<IClarificationProps> = ({ colorInstance }) => {
  const colors: Array<{ colorString: string; name: string }> = [
    { colorString: colorInstance.rgb().toString(), name: 'RGB' },
    {
      colorString: colorInstance
        .hex()
        .toString()
        .toLowerCase(),
      name: 'Hex',
    },
    { colorString: colorInstance.hsl().toString(), name: 'HSL' },
    { colorString: colorInstance.hwb().toString(), name: 'HWB' },
  ]

  return (
    <StyledPaper>
      <Table
        style={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Clarification</TableCell>
            <TableCell
              style={{
                backgroundColor: colorInstance.hex(),
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {colors.map(({ colorString, name }, ii) => (
            <TableRow key={ii}>
              <TableCell>{name}</TableCell>
              <ColorTableCell aria-label={`${name} color`}>
                {colorString}
                <CopyColorButton
                  color={{
                    colorString,
                    name,
                  }}
                />
              </ColorTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  )
}
