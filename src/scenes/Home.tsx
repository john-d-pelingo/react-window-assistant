import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { Hello } from '../components/Hello'

interface IHomeProps extends RouteComponentProps {}

export const Home: FC<IHomeProps> = () => <Hello />
