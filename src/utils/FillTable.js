import { renderOverlay, getOverlayEl } from './overlay';
import FillTableRow from './FillTableRow';

import '../index.css';

export default class FillTable {
    constructor(workers) {
        this.workers = workers;
        this.fill = this.fill.bind(this);
        this._createWorker = this._createWorker.bind(this);
        this.pauseIdx = 0;
        this.isPaused = false;
    }

    /**
     *
     * @param {number} [workerIDX]
     * @returns {Promise}
     */
    _createWorker(workerIDX = 0) {
        if (this.isPaused) return;
        if (workerIDX >= this.workers.length) {
            const overlay = getOverlayEl();
            overlay.style.visibility = 'hidden';
            return;
        }
        this.pauseIdx = workerIDX + 1;
        const worker = this.workers[workerIDX];
        const fillWorkerPromise = new Promise((resolve) => {
            const { fill: fillRow } = new FillTableRow({ worker, resolve });
            fillRow();
        });
        fillWorkerPromise.then(() => this._createWorker(workerIDX + 1));
    }

    /**
     * @returns {void}
     */
    fill() {
        const tbody = document.querySelector('tbody');
        const rowCount = tbody.childElementCount;
        const workersCount = this.workers.length;
        const onButtonClick = () => this.isPaused = true;
        if (workersCount && workersCount !== rowCount) {
            renderOverlay(onButtonClick);
            this.isPaused = false;
            this._createWorker(this.pauseIdx);
        }
    }
}