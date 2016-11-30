import { sections, durationTransition } from '../config/globalVariables';
import { NEXT_SECTION } from '../config/eventListener';

import EventEmitter from '../events/Emitter';
import bodymovin from 'bodymovin';

/**
 * Transition class
 */
class Transition {
    /**
     * constructor method
     */
    constructor() {
        this.bodySelector = document.querySelector('body');

        this.addEventListeners();
    }

    /**
     * play method
     */
    play() {
        const bodySelector = this.bodySelector;
        const activeSection = parseInt(bodySelector.getAttribute('data-active-section'));
        const activeSectionSelector = document.querySelector('#section-' + activeSection);
        const nextActiveSection = activeSection + 1;
        const path = sections[nextActiveSection].path;
        const duration = durationTransition;

        this.transitionClass(activeSection, 'out');
        this.transitionWave(nextActiveSection, path);

        setTimeout(() => {
        }, duration * 0.5);

        setTimeout(() => {
            this.transitionClass(nextActiveSection, 'in');
        }, duration * 0.75);

        setTimeout(() => {
            activeSectionSelector.style.zIndex = 0;
        }, duration);
    }

    /**
     * transitionClass method
     * @param index
     * @param direction
     */
    transitionClass(index, direction) {
        const sectionSelector = document.querySelector('#section-' + index);
        const bodySelector = document.querySelector('body');
        const oppositeDirection = (direction === 'in') ? 'out' : 'in';

        bodySelector.classList.remove('transition-' + oppositeDirection);
        bodySelector.classList.add('transition-' + direction);
        sectionSelector.classList.remove('transition-' + oppositeDirection);
        sectionSelector.classList.add('transition-' + direction);
    };

    /**
     * transitionWave method
     * @param index
     * @param path
     */
    transitionWave(index, path) {
        const animData = {
            wrapper: document.querySelector('#section-' + index + ' .transition-wave'),
            animType: 'svg',
            loop: false,
            prerender: true,
            path: path,
            rendererSettings: { preserveAspectRatio:'none' }
        };

        const anim = bodymovin.loadAnimation(animData);
        window.addEventListener('resize', () => {
            anim.resize.bind(anim);
        });
    }

    /**
     * addEventListeners method
     */
    addEventListeners() {
        EventEmitter.on(NEXT_SECTION, ::this.play);
    }
}

export default Transition;