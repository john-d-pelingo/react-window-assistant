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

import { CopyColorButton } from '../CopyColorButton'
import { useClarificationStyles } from './useClarificationStyles'

interface IClarificationProps {
  colorInstance: Color
}

export const Clarification: FC<IClarificationProps> = ({ colorInstance }) => {
  const classes = useClarificationStyles()

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
    <Paper className={classes.root}>
      <Table className={classes.table}>
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
              <TableCell
                aria-label={`${name} color`}
                className={classes.tableCell}
              >
                {colorString}
                <CopyColorButton
                  color={{
                    colorString,
                    name,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
