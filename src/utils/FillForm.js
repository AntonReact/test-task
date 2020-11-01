import { setInputValue } from "./setInputValue";

export default class FillForm {
  constructor(form) {
    this.data = form;
    this.fill = this.fill.bind(this);
  }
  /**
   *
   * @param {string} key
   * @returns {string}
   */
  _getValueForInput(key) {
    return key === 'desc' ? data[key]?.slice(0, 20) : data[key];
  }

  /**
   *
   * @returns {void}
   */
  fill() {
    const [name, email, firstPhone, secondaryPhone, desc] = document.getElementsByClassName('MuiInput-input');
    const inputs = { name, email, firstPhone, secondaryPhone, desc };
    Object.keys(this.data).forEach((key) => {
        const value = this._getValueForInput(key);
        const input = inputs[key];
        setInputValue(input, value);
    })
  }
}