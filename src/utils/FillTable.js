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
     * @returns {Promise}
     */
    _createWorker() {
        if (this.isPaused) return;
        if (this.pauseIdx >= this.workers.length) {
            const overlay = getOverlayEl();
            overlay.style.visibility = 'hidden';
            this.pauseIdx = 0;
            return;
        }
        const worker = this.workers[this.pauseIdx];
        if (!worker) return;
        const fillWorkerPromise = new Promise((resolve) => {
            const { fill: fillRow } = new FillTableRow({ worker, resolve });
            fillRow();
        });
        fillWorkerPromise.then(() => {
            this.pauseIdx++;
            this._createWorker()
        });
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