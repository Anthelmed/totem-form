import TweenLite from 'gsap/src/uncompressed/TweenLite';
import Draggable from 'gsap/src/uncompressed/utils/Draggable';
import Ease from 'gsap/src/uncompressed/easing/EasePack';

/**
 * DragAndDrop class
 */
class DragAndDrop {
    /**
     * constructor method
     * @param draggableElement
     * @param bounds
     * @param targets
     */
    constructor(draggableElement, bounds, targets) {
        this.draggableElement = draggableElement;
        this.bounds = bounds;
        this.targets = targets;

        this.overlapThreshold = 25;

        this.draggable = null;

        this.init();
        this.addEventsListener();
    }

    /**
     * init method
     */
    init() {
        this.setDraggableElementOrigin();

        this.draggable = Draggable.create(this.draggableElement, {
            type: "x,y",
            edgeResistance: 0.65,
            bounds: this.bounds,
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
        for (var i = 0; i < this.targets.length; i++) {
            if (this.draggable.hitTest(this.targets[i], this.overlapThreshold)) {
                this.targets[i].classList.add("showOver");
            } else {
                this.targets[i].classList.remove("showOver");
            }
        }
    }

    /**
     * onDragEnd method
     * @param e
     */
    onDragEnd(e) {
        let snapMade = false;

        for(var i = 0; i < this.targets.length; i++){
            if(this.draggable.hitTest(this.targets[i], this.overlapThreshold)) {

                // get the position of the target so can move
                // dragging item exactly on it when released
                const target = this.targets[i];

                // tween onto target
                TweenLite.to(e.target, 0.2, {
                    x: target.offsetLeft + (target.offsetWidth / 2 - this.draggableElement.offsetWidth / 2),
                    y: target.offsetTop + (target.offsetHeight / 2 - this.draggableElement.offsetHeight / 2),
                    ease: Ease.Power2.easeOut
                });

                // is a property called targetAttachedTo directly on the dragged item.
                // this stores the target we have snapped to.  Allows us to free up
                // the target if we drag it off it

                // before we update that property first checks that we haven't dragged
                // from one target straight to another as this would balls it up
                if(e.target.targetAttachedTo != this.targets[i] && e.target.targetAttachedTo != undefined){
                    e.target.targetAttachedTo = undefined;
                }

                // now store new target in targetAttachedTo property
                e.target.targetAttachedTo = this.targets[i];
                snapMade = true;

                const data = target.getAttribute('data-drag-success');
                this.onDragSuccess(data);
            }
        }

        // if the dragged item isn't over a target send it back to its
        // start position
        if(!snapMade){
            TweenLite.to(this.draggableElement, 0.7, {
                x: this.draggableElement.originalX,
                y: this.draggableElement.originalY,
                ease: Ease.Elastic.easeOut.config(1, 0.3)
            });
        }
    }

    /**
     * onDragSuccess method
     * @param data
     */
    onDragSuccess(data) {
        console.log(data);
    }

    /**
     * setDraggableElementOrigin method
     */
    setDraggableElementOrigin() {
        this.draggableElement.originalX = this.bounds.offsetWidth / 2 - this.draggableElement.offsetWidth / 2;
        this.draggableElement.originalY = this.bounds.offsetHeight / 2 - this.draggableElement.offsetHeight / 2;

        TweenLite.set(this.draggableElement,{
            x: this.draggableElement.originalX,
            y: this.draggableElement.originalY
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
