import TweenLite from 'gsap/src/uncompressed/TweenLite';
import Draggable from 'gsap/src/uncompressed/utils/Draggable';
import Ease from 'gsap/src/uncompressed/easing/EasePack';


/**
 * ColorWheel class
 */
class ColorWheel {
    /**
     * constructor method
     * @param knobElement
     * @param draggableElement
     */
    constructor(knobElement, draggableElement) {

        this.knobElement = knobElement;
        this.draggableElement = draggableElement;

        this.wheel = null;

        this.init();
    }

    init() {
        this.wheel = Draggable.create(this.knobElement, {
            type: "rotation",
            edgeResistance: 0.65,
            onDrag: ::this.onDrag
        })[0];

        this.draggableElement.style.backgroundColor = 'hsl(0, 100%, 50%)'
    }

    onDrag() {
        const angle = Math.abs(this.wheel.rotation % 360);

        TweenLite.to(this.draggableElement, 0.2, {
            backgroundColor: 'hsl(' + angle + ', 100%, 50%)',
            ease: Ease.Power2.easeOut
        });
    }
}

export default ColorWheel;