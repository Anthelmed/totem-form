import { sections } from '../config/globalVariables';

import TweenLite from 'gsap/src/uncompressed/TweenLite';
import Draggable from 'gsap/src/uncompressed/utils/Draggable';
import Ease from 'gsap/src/uncompressed/easing/EasePack';

import tinycolor from 'tinycolor2';

import map from '../utils/math/map';

/**
 * ColorWheel class
 */
class ColorWheel {
    /**
     * constructor method
     * @param sectionIndex
     */
    constructor(sectionIndex) {
        this.sectionIndex = sectionIndex;
        this.knobSelector = document.querySelector('#section-' + sectionIndex + ' .knob');
        this.draggableElementSelector = document.querySelector('#section-' + sectionIndex + ' .draggable');

        this.wheel = null;

        this.init();
    }

    init() {
        this.wheel = Draggable.create(this.knobSelector, {
            type: "rotation",
            edgeResistance: 0.65,
            onDrag: ::this.onDrag
        })[0];
    }

    onDrag() {
        const sectionIndex = this.sectionIndex;
        const section = sections[sectionIndex];
        const hue = Math.floor(Math.abs(this.wheel.rotation % 360));
        let saturation;
        let lightness;

        if (hue <= 180) {
            saturation = map(hue, 0, 180, 80, 50);
            lightness = map(hue, 0, 180, 75, 60);
        } else {
            saturation = map(hue, 181, 360, 50, 80);
            lightness = map(hue, 181, 360, 60, 75);
        }

        const color = tinycolor('hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)');

        TweenLite.to(section, 0.2, {
            primaryColor: color.toHexString(),
            onUpdate: section.updateProperties(),
            ease: Ease.Power2.easeOut
        });
    }
}

export default ColorWheel;