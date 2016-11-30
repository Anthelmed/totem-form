import { nbQuestions } from '../config/globalVariables';
import { NEXT_SECTION } from '../config/eventListener';

import EventEmitter from '../events/Emitter';

/***
 * Header class
 */
class Header {
    /***
     * constructor method
     */
    constructor() {
        this.bodySelector = document.querySelector('body');
        this.formStepsSelector = document.querySelectorAll('.header-form-steps .step');

        this.addEventListeners();
    }

    /***
     * update method
     */
    update() {
        const bodySelector = this.bodySelector;
        const activeSection = parseInt(bodySelector.getAttribute('data-active-section'));
        const activeStep = document.querySelector('.header-form-steps .step.active');
        const formSteps = this.formStepsSelector;

        if(activeSection < (nbQuestions + 1)) {
            return;
        }

        activeStep.classList.remove('active');
        formSteps[activeSection - nbQuestions].classList.add('active');
    }

    /**
     * addEventListeners method
     */
    addEventListeners() {
        EventEmitter.on(NEXT_SECTION, ::this.update);
    }
}

export default Header;