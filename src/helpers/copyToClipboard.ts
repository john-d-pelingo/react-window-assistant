// NOTE: courtesy of https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
export const copyToClipboard = (text: string): void => {
  const el = document.createElement('textarea') // Create a <textarea> element
  el.value = text // Set its value to the string that you want copied
  el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
  el.style.position = 'absolute'
  el.style.left = '-9999px' // Move outside the screen to make it invisible
  document.body.appendChild(el) // Append the <textarea> element to the HTML document

  let selected: Range | null = null // Mark as null to know no selection existed before
  const selection = document.getSelection()

  // Check if there is any content selected previously
  if (selection && selection.rangeCount > 0) {
    selected = selection.getRangeAt(0) // Store selection if found
  }

  el.select() // Select the <textarea> content
  document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el) // Remove the <textarea> element
  if (selected) {
    // If a selection existed before copying
    selection && selection.removeAllRanges() // Unselect everything on the HTML document
    selection && selection.addRange(selected) // Restore the original selection
  }
}
