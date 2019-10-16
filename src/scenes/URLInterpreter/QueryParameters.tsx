import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { ParsedQuery } from 'query-string'
import React, { FC } from 'react'

interface IQueryParametersProps {
  parsedQuery: ParsedQuery
}

export const QueryParameters: FC<IQueryParametersProps> = ({ parsedQuery }) => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Key</TableCell>
        <TableCell>Value</TableCell>
      </TableRow>
      {Object.entries(parsedQuery).map(([key, value], ii) => (
        <TableRow key={`${key}-${ii}`}>
          <TableCell>{key}</TableCell>
          <TableCell>
            {Array.isArray(value) ? value.join(',') : value}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
