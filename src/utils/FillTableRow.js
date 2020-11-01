import { setInputValue } from './setInputValue';

export default class FillTableRow {
  constructor({ worker, resolve }) {
    this.worker = worker;
    this.resolve = resolve
    this.initValues = {
      dob: '0',
      experience: '0',
      firstName: ' ',
      gender: 'other',
      job: 'Engineer',
      lastName: ' ',
    }
    this._setExperienceValue = this._setExperienceValue.bind(this)
    this._setSimpleInputValues = this._setSimpleInputValues.bind(this)
    this.fill = this.fill.bind(this)
  }

  /**
  * @returns {void}
  */
  _openDialog() {
    const btn = $('.MuiButton-root:contains(Add)');
    btn.trigger('click')
  }

  /**
  *
  * @param {Element[]} inputs
  * @returns {void}
  */
  _setRadioValue(inputs) {
    const { gender } = this.worker;
    inputs.forEach((input) => {
      const { className, value } = input;
      if (className.includes('jss')) {
        const newValue = value === gender || (gender === null && this.initValues.gender);
        const isRadio = true;
        setInputValue(input, newValue, isRadio);
      }
    })
  }

  /**
   * @returns {void}
   */
  _setExperienceValue() {
    this.inputs.dob.onchange = () => {
      setTimeout(() => {
          const { parentElement } = $("label:contains('Experience')").get(0) || {};
          const [expInput] = parentElement?.getElementsByTagName('input') || [];
          setInputValue(expInput, this.worker.experience || this.initValues.experience);
      }, 500);
    };
  }

/**
 *
 * @param {[]Element} inputs
 * @returns {[]Element}
 */
  _getSimpleInputs(inputs) {
    return inputs.filter(({ className }) => !className.includes('jss'));
  }

  /**
   *
   * @returns {void}
   */
  _setSimpleInputValues() {
    Object.keys(this.worker).forEach((key) => {
      const input = this.inputs?.[key];
      let value = this.worker[key] || this.initValues[key];

      if (key === 'dob') {
        const [year, month, day] = this.worker[key]?.split('-') || [];
        const parsedDate = `${month}/${day}/${year}`;
        value = year ? parsedDate : this.initValues[key];
      }
      setInputValue(input, value);
    })
  }

  /**
  *
  * @returns {void}
  */
  fill() {
    this._openDialog();
    const nodeInputs = document.querySelectorAll(`.MuiDialogContent-root input`)

    if (!nodeInputs.length) {
        setTimeout(() => this.fill(), 1000);
        return;
    }

    const inputElements = Object.values(nodeInputs);
    const [firstName, lastName, job, dob] = this._getSimpleInputs(inputElements);
    const inputs = { firstName, lastName, job, dob };
    this.inputs = inputs;

    this._setRadioValue(inputElements)
    this._setExperienceValue();
    this._setSimpleInputValues()

    setTimeout(() => {
        const submitBtn = document.querySelector(`.MuiDialog-container .MuiButton-containedPrimary`)
        submitBtn?.click();
        this.resolve();
    }, 1000);
  }
}
