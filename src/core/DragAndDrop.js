import TweenLite from 'gsap/src/uncompressed/TweenLite';
import Draggable from 'gsap/src/uncompressed/utils/Draggable';
import Ease from 'gsap/src/uncompressed/easing/EasePack';

import { DRAG_SUCCESS } from '../config/eventListener';

import EventEmitter from '../events/Emitter';

/**
 * DragAndDrop class
 */
class DragAndDrop {
    /**
     * constructor method
     * @param sectionIndex
     */
    constructor(sectionIndex) {
        this.draggableElementSelector = document.querySelector('#section-' + sectionIndex + ' .draggable');
        this.boundsSelector = document.querySelector('#section-' + sectionIndex + ' .drag-wrapper');
        this.targetsSelector = document.querySelectorAll('#section-' + sectionIndex + ' [class^="drag-target"');

        this.overlapThreshold = 5;

        this.draggable = null;

        this.init();
        this.addEventsListener();
    }

    /**
     * init method
     */
    init() {
        this.setDraggableElementOrigin();
        const draggableElement = this.draggableElementSelector;
        const bounds = this.boundsSelector;

        this.draggable = Draggable.create(draggableElement, {
            type: "x,y",
            edgeResistance: 0.65,
            bounds: bounds,
            onClick: ::this.onClick,
            onDrag: ::this.onDrag,
            onRelease: ::this.onDragEnd
        })[0];
    }

    /**
     * onClick method
     * @param e
     */
    onClick(e) {
        console.log('click');
    }

    /**
     * onDrag method
     * @param e
     */
    onDrag(e) {
        const selector = this.draggableElementSelector;
        const targets = this.targetsSelector;
        const overlap = this.overlapThreshold;
        const draggable = this.draggable;

        for (var i = 0; i < targets.length; i++) {
            const target = targets[i];

            if (draggable.hitTest(target, overlap)) {
                selector.classList.add("show-over");
                target.classList.add("show-over");
            } else {
                selector.classList.remove("show-over");
                target.classList.remove("show-over");
            }
        }
    }

    /**
     * onDragEnd method
     * @param e
     */
    onDragEnd(e) {
        const draggableElement = this.draggableElementSelector;
        const targets = this.targetsSelector;
        let snapMade = false;

        for(var i = 0; i < targets.length; i++){
            if(this.draggable.hitTest(targets[i], this.overlapThreshold)) {
                const target = targets[i];

                // tween onto target
                TweenLite.to(e.target, 0.2, {
                    x: target.offsetLeft + (target.offsetWidth / 2 - draggableElement.offsetWidth / 2),
                    y: target.offsetTop + (target.offsetHeight / 2 - draggableElement.offsetHeight / 2),
                    ease: Ease.Power2.easeOut
                });

                // is a property called targetAttachedTo directly on the dragged item.
                // this stores the target we have snapped to.  Allows us to free up
                // the target if we drag it off it

                // before we update that property first checks that we haven't dragged
                // from one target straight to another as this would balls it up
                if(e.target.targetAttachedTo != target && e.target.targetAttachedTo != undefined){
                    e.target.targetAttachedTo = undefined;
                }

                // now store new target in targetAttachedTo property
                e.target.targetAttachedTo = target;
                snapMade = true;

                const data = target.getAttribute('data-drag-success');
                this.onDragSuccess(data);
            }
        }

        // if the dragged item isn't over a target send it back to its
        // start position
        if(!snapMade){
            TweenLite.to(draggableElement, 0.7, {
                x: draggableElement.originalX,
                y: draggableElement.originalY,
                ease: Ease.Elastic.easeOut.config(1, 0.3)
            });
        }
    }

    /**
     * onDragSuccess method
     * @param data
     */
    onDragSuccess(data) {
        EventEmitter.emit(DRAG_SUCCESS, data);
    }

    /**
     * setDraggableElementOrigin method
     */
    setDraggableElementOrigin() {
        const draggableElement = this.draggableElementSelector;
        const bounds = this.boundsSelector;

        draggableElement.originalX = bounds.offsetWidth / 2 - draggableElement.offsetWidth / 2;
        draggableElement.originalY = bounds.offsetHeight / 2 - draggableElement.offsetHeight / 2;

        TweenLite.set(draggableElement,{
            x: draggableElement.originalX,
            y: draggableElement.originalY
        });
    }

    /**
     * addEventsListener method
     */
    addEventsListener() {
        window.addEventListener("resize", () => {
            this.setDraggableElementOrigin();
        });
    }
}

export default DragAndDrop;
