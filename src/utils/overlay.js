

const OVERLAY_CLASSNAME = 'fill-overlay';

/**
 * @returns {Element | null}
 */
export const getOverlayEl = () => document.querySelector(`.${OVERLAY_CLASSNAME}`);

/**
 * @param {() => void} [onButtonClick]
 * @returns {void}
 */
export const renderOverlay = (onButtonClick) => {
  let overlay = getOverlayEl();
  if (overlay) {
      overlay.style.visibility = 'visible';
  } else {
      const btn = document.createElement('button');
      btn.className = 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary fill-overlay__switch';
      btn.onclick = () => {
        overlay.style.visibility = 'hidden';
        onButtonClick?.();
      }
      btn.innerText = 'pause filling';

      const msgContainer = document.createElement('div');
      msgContainer.className = 'fill-overlay__message-container';
      msgContainer.innerText = 'Please wait until forms become filled';
      msgContainer.insertAdjacentElement('beforeend', btn);

      overlay = document.createElement('div');
      overlay.className = OVERLAY_CLASSNAME;
      overlay.insertAdjacentElement('afterbegin', msgContainer);
      document.body.appendChild(overlay);
  }
}