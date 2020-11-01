/**
 *
 * @param {Element} input
 * @returns {(e: Event) => void | () => void}
 */
const _getInputChange = (input) => {
  const [, REACT_READ_ONLY] = Object.values(input) || [];
  const handleChange = REACT_READ_ONLY?.onChange || (() => {});
  return handleChange
}

/**
 *
 * @param {Element} input
 * @param {string} value
 * @param {boolean} isRadio
 * @returns {void}
 */
export const setInputValue = (input, value, isRadio) => {
  if (input && value) {
    const key = isRadio ? 'checked' : 'value';
    input[key] = value;
    const READ_ONLY_REACT_HANDLE_CHANGE = _getInputChange(input);
    const change = new Event('change');
    input.dispatchEvent(change);
    READ_ONLY_REACT_HANDLE_CHANGE({ target: input });
  }
}