import { sections } from '../config/globalVariables';

/**
 * Section class
 */
class Section {
    /**
     * constructor method
     * @param index
     * @param formIndex
     * @param paths
     * @param update
     */
    constructor(index, formIndex, paths, update) {
        this.index = index;
        this.formIndex = formIndex;

        this.selector = document.querySelector('#section-' + index);
        this.firstPathSelector = '#path-1-'+ index;
        this.bodySelector = document.querySelector('body');

        this.easingOfTransition = 'easingLinearInOut';
        this.delayOfTransition = 170;
        this.durationOfStepsTransition = this.delayOfTransition / paths.length;

        this.sections = document.querySelectorAll('[id^="section-"]');
        this.paths = paths;

        this.update = update;

        //this.addEventListeners();
    }

    /**
     * previous method
     */
    previous() {
        const sections = this.sections;
        const index = this.index;

        const duration = this.durationOfStepsTransition;
        const paths = this.paths;

        const previousIndex = index - 1;
        const previousFormIndex = sections[previousIndex].formIndex;

        for(let i in sections) {
            const sectionSelector = document.querySelector('#section-' + sections[i].index);

            sectionSelector.style.zIndex = parseInt(sectionSelector.style.zIndex) - 1;
        }

        sections[sections.length - 1].style.zIndex = sections.length;

        this.animateTransition(index, 'in');
        this.animateTransition(previousIndex, 'out');
        this.update(previousFormIndex);

        for(let i in paths) {
            const x = paths.length - i;
            const path = paths[x];

            setTimeout(() => {
                this.morphTransition(path);
            }, duration * x);
        }
    }

    /**
     * next method
     */
    next() {
        const sections = this.sections;
        const selector = this.selector;
        const index = this.index;

        const duration = this.durationOfStepsTransition;
        const paths = this.paths;

        const nextIndex = index + 1;
        const nextFormIndex = sections[nextIndex].formIndex;

        for(let i in sections) {
            const sectionSelector = document.querySelector('#section-' + sections[i].index);

            sectionSelector.style.zIndex = parseInt(sectionSelector.style.zIndex) + 1;
        }

        selector.style.zIndex = parseInt(selector.style.zIndex) - 1;

        this.animateTransition(index, 'out');
        this.animateTransition(nextIndex, 'in');
        this.update(nextFormIndex);

        for(let i in paths) {
            const path = paths[i];

            setTimeout(() => {
                this.morphTransition(path);
            }, duration * i);
        }

        setTimeout(() => {
            selector.style.zIndex = 0;
        }, duration * paths.length);

    }

    /**
     * animateTransition method
     * @param index
     * @param direction
     */
    animateTransition(index, direction) {
        const selector = document.querySelector('#section-' + index);
        const body = this.bodySelector;
        const oppositeDirection = (direction === 'in') ? 'out' : 'in';

        body.classList.remove('transition-' + oppositeDirection);
        body.classList.add('transition-' + direction);
        selector.classList.remove('transition-' + oppositeDirection);
        selector.classList.add('transition-' + direction);
    };

    /**
     * morphTransition method
     * @param path
     */
    morphTransition(path) {
        const easing = this.easingOfTransition;
        const duration = this.durationOfStepsTransition;
        const firstPathSelector = this.firstPathSelector;

        KUTE.to(firstPathSelector, {
            path: path
        }, {
            easing: easing,
            duration: duration
        }).start();
    }

    addEventListeners() {
        const selector = this.selector;
        const delay = this.delayOfTransition;

        selector.addEventListener('click', () => {
            setTimeout(() => {
                this.next();
            }, delay);
        });
    }
}

export default Section;