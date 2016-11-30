import { NEXT_SECTION } from '../config/eventListener';

import EventEmitter from '../events/Emitter';

import tinycolor from 'tinycolor2';

/**
 * Section class
 */
class Section {
    /**
     * constructor method
     * @param index
     * @param color
     * @param path
     */
    constructor(index, color, path) {
        this.index = index;
        this.primaryColor = color;
        this.secondaryColor = tinycolor(color).darken(30).toHexString();
        this.path = path;

        this.init();
        this.addEventListeners();
    }

    /**
     * init method
     */
    init() {
        const index = this.index;
        const primaryColor = this.primaryColor;
        const secondaryColor = this.secondaryColor;
        const path = document.querySelector('#section-' + index + ' .transition-wave path');
        const line = document.querySelector('#section-' + index + ' .section-line');
        const paging = document.querySelector('#section-' + index + ' .section-paging span');

        if (path) {
            path.style.fill = primaryColor;
        }

        if (line) {
            line.style.backgroundColor = secondaryColor;
        }

        if (paging) {
            paging.style.color = secondaryColor;
        }
    }

    /**
     * updateProperties method
     */
    updateProperties() {
        const primaryColor = this.primaryColor;
        this.secondaryColor = tinycolor(primaryColor).darken(30).toHexString();

        setTimeout(() => {
            this.init();
        }, 10);
    }

    /**
     * addEventListeners method
     */
    addEventListeners() {
        EventEmitter.on(NEXT_SECTION, ::this.updateProperties);
    }
}

export default Section;