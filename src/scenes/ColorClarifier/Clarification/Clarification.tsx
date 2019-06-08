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

import { useClarificationStyles } from './useClarificationStyles'

interface IClarificationProps {
  color: Color
}

export const Clarification: FC<IClarificationProps> = ({ color }) => {
  const classes = useClarificationStyles()

  // TODO: copy on click
  // TODO: CHECKPOINT style
  // NOTE: HSV and CMYK return rgb because it's not valid CSS3 color. See https://github.com/Qix-/color/issues/121#issuecomment-320106118
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Clarification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>RGB</TableCell>
            <TableCell>{color.rgb().toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hex</TableCell>
            <TableCell>{color.hex().toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HSV</TableCell>
            <TableCell>{color.hsv().toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HSL</TableCell>
            <TableCell>{color.hsl().toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HWB</TableCell>
            <TableCell>{color.hwb().toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>CMYK</TableCell>
            <TableCell>{color.cmyk().toString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}
