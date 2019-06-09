import { createHistory, createMemorySource } from '@reach/router'

const source = createMemorySource('/')

export const customHistory = createHistory(source)
