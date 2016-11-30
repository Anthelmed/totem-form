import { sections } from '../config/globalVariables';
import { NEXT_SECTION, DRAG_SUCCESS } from '../config/eventListener';

import EventEmitter from '../events/Emitter';

/***
 * Router class
 */
class Router {
    /**
     * constructor method
     */
    constructor() {
        this.bodySelector = document.querySelector('body');

        this.addEventListeners();
    }

    /**
     * next method
     */
    next() {
        const bodySelector = this.bodySelector;
        const activeSection = parseInt(bodySelector.getAttribute('data-active-section'));
        const nextActiveSection = activeSection + 1;
        const activeSectionSelector = document.querySelector('#section-' + activeSection);

        for(let i in sections) {
            const sectionSelector = document.querySelector('#section-' + i);

            sectionSelector.style.zIndex = parseInt(sectionSelector.style.zIndex) + 1;
        }

        activeSectionSelector.style.zIndex = parseInt(activeSectionSelector.style.zIndex) - 1;

        EventEmitter.emit(NEXT_SECTION);

        bodySelector.setAttribute('data-active-section', nextActiveSection + '');
    }

    /**
     * whatNext method
     * @param data
     */
    whatNext(data) {
        switch (data) {
            case 'next' :
                this.next();
                break;
            case 'create' :
                this.next();
                setTimeout(() => {
                    this.next();
                }, 5000);
                break;
            default :
                this.next();
                break;
        }
    }

    /**
     * addEventListeners method
     */
    addEventListeners() {
        EventEmitter.on(DRAG_SUCCESS, ::this.whatNext);
    }
}

export default Router;