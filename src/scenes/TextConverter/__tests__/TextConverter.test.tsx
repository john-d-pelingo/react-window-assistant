import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from 'react-router'

import { TextConverter } from '../TextConverter'

let memoryHistory = createMemoryHistory()

describe('scenes - TextConverter', () => {
  beforeEach(() => {
    memoryHistory = createMemoryHistory()
  })

  it('mounts', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { container } = render(
      <Router history={memoryHistory}>
        <TextConverter />
      </Router>,
    )

    expect(Helmet.peek().title).toBe('Text Converter')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('converts a written text to lower first, pascal, sarcasm lower first, upper and finally path case', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText, getByText } = render(
      <Router history={memoryHistory}>
        <TextConverter />
      </Router>,
    )

    const buttonLabels: string[] = [
      'camelCase',
      'CONSTANT_CASE',
      'dot.case',
      'Header-Case',
      'lower case',
      'lowerFirst case',
      'no case',
      'param-case',
      'PascalCase',
      'path/case',
      'sArCaSmLoWeRfIrSt CaSe',
      'SaRcAsMuPpErFiRsT cAsE',
      'Sentence case',
      'snake_case',
      'SWAP CASE',
      'Title Case',
      'UPPER CASE',
      'UpperFirst case',
    ]

    const textInputElement = getByLabelText('Text input') as HTMLTextAreaElement

    expect(document.activeElement).toEqual(textInputElement)

    buttonLabels.forEach((buttonLabel) => {
      const textCaseButtonElement = getByText(buttonLabel) as HTMLDivElement
      expect(textCaseButtonElement.parentNode).toHaveClass('Mui-disabled')
    })

    fireEvent.change(textInputElement, {
      target: {
        value:
          'Doggo ipsum you are doing me the shock floofs fluffer what a nice floof, snoot borkdrive he made many woofs pupper, doggo blep. Woofer extremely cuuuuuute woofer such treat vvv long water shoob floofs, shoober dat tungg tho lotsa pats blep.',
      },
    })

    expect(textInputElement).toHaveTextContent(
      'Doggo ipsum you are doing me the shock floofs fluffer what a nice floof, snoot borkdrive he made many woofs pupper, doggo blep. Woofer extremely cuuuuuute woofer such treat vvv long water shoob floofs, shoober dat tungg tho lotsa pats blep.',
    )
    expect(memoryHistory.location.search).toBe(
      '?text=Doggo%20ipsum%20you%20are%20doing%20me%20the%20shock%20floofs%20fluffer%20what%20a%20nice%20floof%2C%20snoot%20borkdrive%20he%20made%20many%20woofs%20pupper%2C%20doggo%20blep.%20Woofer%20extremely%20cuuuuuute%20woofer%20such%20treat%20vvv%20long%20water%20shoob%20floofs%2C%20shoober%20dat%20tungg%20tho%20lotsa%20pats%20blep.',
    )

    const lowerFirstCaseButtonElement = getByText(
      'lowerFirst case',
    ) as HTMLDivElement
    fireEvent.click(lowerFirstCaseButtonElement)

    expect(textInputElement).toHaveTextContent(
      'doggo ipsum you are doing me the shock floofs fluffer what a nice floof, snoot borkdrive he made many woofs pupper, doggo blep. Woofer extremely cuuuuuute woofer such treat vvv long water shoob floofs, shoober dat tungg tho lotsa pats blep.',
    )
    expect(memoryHistory.location.search).toBe(
      '?text=doggo%20ipsum%20you%20are%20doing%20me%20the%20shock%20floofs%20fluffer%20what%20a%20nice%20floof%2C%20snoot%20borkdrive%20he%20made%20many%20woofs%20pupper%2C%20doggo%20blep.%20Woofer%20extremely%20cuuuuuute%20woofer%20such%20treat%20vvv%20long%20water%20shoob%20floofs%2C%20shoober%20dat%20tungg%20tho%20lotsa%20pats%20blep.',
    )

    const sarcasmLowerFirstCaseButtonElement = getByText(
      'sArCaSmLoWeRfIrSt CaSe',
    ) as HTMLDivElement
    fireEvent.click(sarcasmLowerFirstCaseButtonElement)

    expect(textInputElement).toHaveTextContent(
      'dOgGo IpSuM yOu ArE dOiNg Me ThE sHoCk FlOoFs FlUfFeR wHaT a NiCe FlOoF, sNoOt BoRkDrIvE hE mAdE mAnY wOoFs PuPpEr, DoGgO bLeP. wOoFeR eXtReMeLy CuUuUuUtE wOoFeR sUcH tReAt VvV lOnG wAtEr ShOoB fLoOfS, sHoObEr DaT tUnGg ThO lOtSa PaTs BlEp.',
    )
    expect(memoryHistory.location.search).toBe(
      '?text=dOgGo%20IpSuM%20yOu%20ArE%20dOiNg%20Me%20ThE%20sHoCk%20FlOoFs%20FlUfFeR%20wHaT%20a%20NiCe%20FlOoF%2C%20sNoOt%20BoRkDrIvE%20hE%20mAdE%20mAnY%20wOoFs%20PuPpEr%2C%20DoGgO%20bLeP.%20wOoFeR%20eXtReMeLy%20CuUuUuUtE%20wOoFeR%20sUcH%20tReAt%20VvV%20lOnG%20wAtEr%20ShOoB%20fLoOfS%2C%20sHoObEr%20DaT%20tUnGg%20ThO%20lOtSa%20PaTs%20BlEp.',
    )

    const upperCaseButtonElement = getByText('UPPER CASE') as HTMLDivElement
    fireEvent.click(upperCaseButtonElement)

    expect(textInputElement).toHaveTextContent(
      'DOGGO IPSUM YOU ARE DOING ME THE SHOCK FLOOFS FLUFFER WHAT A NICE FLOOF, SNOOT BORKDRIVE HE MADE MANY WOOFS PUPPER, DOGGO BLEP. WOOFER EXTREMELY CUUUUUUTE WOOFER SUCH TREAT VVV LONG WATER SHOOB FLOOFS, SHOOBER DAT TUNGG THO LOTSA PATS BLEP.',
    )
    expect(memoryHistory.location.search).toBe(
      '?text=DOGGO%20IPSUM%20YOU%20ARE%20DOING%20ME%20THE%20SHOCK%20FLOOFS%20FLUFFER%20WHAT%20A%20NICE%20FLOOF%2C%20SNOOT%20BORKDRIVE%20HE%20MADE%20MANY%20WOOFS%20PUPPER%2C%20DOGGO%20BLEP.%20WOOFER%20EXTREMELY%20CUUUUUUTE%20WOOFER%20SUCH%20TREAT%20VVV%20LONG%20WATER%20SHOOB%20FLOOFS%2C%20SHOOBER%20DAT%20TUNGG%20THO%20LOTSA%20PATS%20BLEP.',
    )

    const pathCaseButtonElement = getByText('path/case') as HTMLDivElement
    fireEvent.click(pathCaseButtonElement)

    expect(textInputElement).toHaveTextContent(
      'doggo/ipsum/you/are/doing/me/the/shock/floofs/fluffer/what/a/nice/floof/snoot/borkdrive/he/made/many/woofs/pupper/doggo/blep/woofer/extremely/cuuuuuute/woofer/such/treat/vvv/long/water/shoob/floofs/shoober/dat/tungg/tho/lotsa/pats/blep',
    )
    expect(memoryHistory.location.search).toBe(
      '?text=doggo%2Fipsum%2Fyou%2Fare%2Fdoing%2Fme%2Fthe%2Fshock%2Ffloofs%2Ffluffer%2Fwhat%2Fa%2Fnice%2Ffloof%2Fsnoot%2Fborkdrive%2Fhe%2Fmade%2Fmany%2Fwoofs%2Fpupper%2Fdoggo%2Fblep%2Fwoofer%2Fextremely%2Fcuuuuuute%2Fwoofer%2Fsuch%2Ftreat%2Fvvv%2Flong%2Fwater%2Fshoob%2Ffloofs%2Fshoober%2Fdat%2Ftungg%2Ftho%2Flotsa%2Fpats%2Fblep',
    )
  })

  it(`removes the text query parameter when the text input is empty/whitespace`, () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <TextConverter />
      </Router>,
    )

    const textInputElement = getByLabelText('Text input') as HTMLTextAreaElement

    fireEvent.change(textInputElement, {
      target: {
        value: 'Text, is it?',
      },
    })

    expect(textInputElement).toHaveTextContent('Text, is it?')
    expect(memoryHistory.location.search).toBe('?text=Text%2C%20is%20it%3F')

    fireEvent.change(textInputElement, {
      target: {
        value: ' \t\t\t\r',
      },
    })

    expect(textInputElement).toHaveTextContent('')
    expect(memoryHistory.location.search).toBe('')
  })
})
