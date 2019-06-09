import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Color from 'color'
import React, { FC, MouseEvent } from 'react'

import { copyToClipboard } from 'helpers/copyToClipboard'

import { useClarificationStyles } from './useClarificationStyles'

interface IClarificationProps {
  color: Color
}

export const Clarification: FC<IClarificationProps> = ({ color }) => {
  const classes = useClarificationStyles()

  const handleValueClick = (event: MouseEvent<HTMLTableCellElement>) => {
    // @ts-ignore
    const colorText = event.target.innerText

    copyToClipboard(colorText)
  }

  // TODO: display label that the color clicked has been copied
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
            <TableCell onClick={handleValueClick}>
              {color.rgb().toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hex</TableCell>
            <TableCell onClick={handleValueClick}>
              {color.hex().toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HSV</TableCell>
            <TableCell onClick={handleValueClick}>
              {color.hsv().toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HSL</TableCell>
            <TableCell onClick={handleValueClick}>
              {color.hsl().toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>HWB</TableCell>
            <TableCell onClick={handleValueClick}>
              {color.hwb().toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>CMYK</TableCell>
            <TableCell onClick={handleValueClick}>
              {color.cmyk().toString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}
