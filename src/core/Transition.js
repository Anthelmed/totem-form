import { sections, durationTransition } from '../config/globalVariables';
import { NEXT_SECTION } from '../config/eventListener';

import TweenLite from 'gsap/src/uncompressed/TweenLite';
import Ease from 'gsap/src/uncompressed/easing/EasePack';

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

        this.init();
        this.addEventListeners();
    }

    /**
     * init method
     */
    init() {
        for (let i in sections) {
            this.transitionText(i, 'out');
        }
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
        this.transitionText(activeSection, 'out');
        this.transitionWave(nextActiveSection, path);

        setTimeout(() => {
        }, duration * 0.5);

        setTimeout(() => {
            this.transitionClass(nextActiveSection, 'in');
            this.transitionText(nextActiveSection, 'in');
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
     * transitionText method
     * @param index
     * @param direction
     */
    transitionText(index, direction) {
        const sectionSelector = document.querySelector('#section-' + index);
        const texts = sectionSelector.querySelectorAll('.transition-text');

        if(!texts.length) {
            return;
        }

        texts.forEach((text, i) => {
            const style = text.getAttribute("style");
            text.removeAttribute("style");

            const parentComputedStyle = window.getComputedStyle(text.parentNode, null);
            text.parentNode.style.height = parentComputedStyle.getPropertyValue("height");

            const computedStyle = window.getComputedStyle(text, null);
            const defaultProperties = {
                top: parseInt(computedStyle.getPropertyValue("top").slice(0, -2)),
                height: parseInt(parentComputedStyle.getPropertyValue("height").slice(0, -2)),
                opacity: parseFloat(computedStyle.getPropertyValue("opacity")),
            };

            text.style = style;

            if (direction === 'in') {
                setTimeout(() => {
                    TweenLite.to(text, 0.9, {
                        top: 0,
                        height: defaultProperties.height,
                        opacity: defaultProperties.opacity,
                        ease: Ease.Power2.easeOut
                    });
                }, i * 100);
            } else {
                setTimeout(() => {
                    TweenLite.to(text, 1, {
                        top: defaultProperties.height / 2,
                        height: defaultProperties.height / 2,
                        opacity: 0,
                        ease: Ease.Power2.easeOut
                    });
                }, i * 100);
            }
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