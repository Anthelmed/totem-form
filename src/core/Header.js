/***
 * Header class
 */
class Header {
    /***
     * constructor method
     */
    constructor() {
        this.selector = document.querySelector('.header');
        this.pagingSelector = document.querySelector('.header-paging > span');
        this.formStepsSelector = document.querySelectorAll('.header-form-steps .step');
        this.bodySelector = document.querySelector('body');
        this.sectionsSelector = document.querySelectorAll('[data-section-is-form="true"]');

        this.generateFormSteps();
    }

    /***
     * generateFormSteps method
     */
    generateFormSteps() {
        const sections = this.sectionsSelector;

        for (let i = 0; i < sections.length - 1; i++) {
            const step = document.createElement('li');

            step.classList.add('step');
            document.querySelector('.header-form-steps').appendChild(step);
        }

        this.formStepsSelector = document.querySelectorAll('.header-form-steps .step');
    }

    /***
     * update method
     * @param index
     */
    update(index) {
        const paging = this.pagingSelector;
        const activeStep = document.querySelector('.header-form-steps .step.active');
        const formSteps = this.formStepsSelector;
        const body = this.bodySelector;

        body.setAttribute('data-active-section-form-index', index);

        if(index === -1) {
            return;
        }

        paging.innerHTML = (index < 10) ? '0' + index : index;
        activeStep.classList.remove('active');
        formSteps[index - 1].classList.add('active');
    }
}

export default Header;