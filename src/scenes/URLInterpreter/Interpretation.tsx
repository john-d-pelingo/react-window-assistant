import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { parse } from 'query-string'
import React, { FC } from 'react'
import styled from 'styled-components'

import { QueryParameters } from './QueryParameters'

const StyledPaper = styled(Paper)`
  width: 100%;
  margin-top: 24px;
  overflow-x: auto;
`

interface IInterpretationProps {
  urlInstance: URL
}

export const Interpretation: FC<IInterpretationProps> = ({ urlInstance }) => {
  const parsedQuery = parse(urlInstance.search)

  return (
    <StyledPaper>
      <Table style={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Interpretation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Origin</TableCell>
            <TableCell>{urlInstance.origin}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pathname</TableCell>
            <TableCell>{urlInstance.pathname}</TableCell>
          </TableRow>
          {Boolean(urlInstance.hash) && (
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell>{urlInstance.hash}</TableCell>
            </TableRow>
          )}
          {Boolean(urlInstance.port) && (
            <TableRow>
              <TableCell>Port</TableCell>
              <TableCell>{urlInstance.port}</TableCell>
            </TableRow>
          )}
          {Boolean(urlInstance.search) && (
            <TableRow>
              <TableCell>Search</TableCell>
              <TableCell>{urlInstance.search}</TableCell>
            </TableRow>
          )}
          {Object.keys(parsedQuery).length > 0 && (
            <TableRow>
              <TableCell>Search Parameters</TableCell>
              <TableCell>
                <QueryParameters parsedQuery={parsedQuery} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledPaper>
  )
}
