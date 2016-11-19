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
        this.delayOfTransition = 800;
        this.durationOfStepsTransition = this.delayOfTransition / paths.length;

        this.sections = document.querySelectorAll('[id^="section-"]');
        this.paths = paths;

        this.update = update;

        this.addEventListeners();
    }

    /**
     * previous method
     */
    previous() {
        const selector = this.selector;
        const index = this.index;
        const duration = this.durationOfStepsTransition;
        const paths = this.paths;

        const section = this.sections;
        const previousIndex = index - 1;
        const previousFormIndex = sections[previousIndex].formIndex;

        this.animateTransition(index, 'in');

        for(let i in paths) {
            const x = paths.length - i;
            const path = paths[x];

            setTimeout(() => {
                this.morphTransition(path);
            }, duration * x);
        }

        this.update(previousFormIndex);

        setTimeout(() => {
            this.animateTransition(previousIndex, 'out');
        }, duration / 2 * paths.length);

        setTimeout(() => {
            selector.style.zIndex = section.length - index;
        }, duration * paths.length);

    }

    /**
     * next method
     */
    next() {
        const selector = this.selector;
        const index = this.index;
        const duration = this.durationOfStepsTransition;
        const paths = this.paths;

        const nextIndex = index + 1;
        const nextFormIndex = sections[nextIndex].formIndex;

        this.animateTransition(index, 'out');

        for(let i in paths) {
            const path = paths[i];

            setTimeout(() => {
                this.morphTransition(path);
            }, duration * i);
        }

        this.update(nextFormIndex);

        setTimeout(() => {
            this.animateTransition(nextIndex, 'in');
        }, duration / 2 * paths.length);

        setTimeout(() => {
            selector.style.zIndex = -1;
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