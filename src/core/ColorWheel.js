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
        this.sectionSelector = document.querySelector('#section-' + sectionIndex);
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
        const section = this.sectionSelector;
        const hue = Math.floor(Math.abs(this.wheel.rotation % 360));
        let saturation = 50;

        if(hue >= 270 && hue <= 4) {
            saturation = map(hue, 270, 4, 50, 70);
        } else if (hue >= 6 && hue <= 9) {
           saturation = map(hue, 6, 9, 70, 50);
        } else if (hue === 5) {
            saturation = 70;
        } else if (hue === 218) {
            saturation = 90;
        }

        let color = tinycolor({ h: hue, s: saturation, l: 100 });

        TweenLite.to(section, 0.2, {
            backgroundColor: color.toRgbString(),
            ease: Ease.Power2.easeOut
        });
    }
}

export default ColorWheel;