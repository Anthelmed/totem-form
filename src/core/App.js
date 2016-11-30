import Router from './Router';
import Transition from './Transition';
import Header from './Header';
import Section from './Section';

import DragAndDrop from './DragAndDrop';
import ColorWheel from './ColorWheel';
import ScratchCard from './ScratchCard';

import { sections, sectionsColor } from '../config/globalVariables';

import { positionedDragTarget } from '../helpers/positioning';

/**
 * App class
 */
class App {

    /**
     * begin method
     */
    static begin() {

        // Sections
        const sectionsSelector = document.querySelectorAll('[id^="section-"]');
        const path = 'data/waveAnimation.json';

        for (let i = 0; i < sectionsSelector.length; i++) {
            const sectionSelector = sectionsSelector[i];

            sections[i] = new Section(i, sectionsColor[i], path);
            sectionSelector.style.zIndex = sectionsSelector.length - i;
        }

        // Router
        const router = new Router();
        window.router = router;

        // Transition
        const transition = new Transition();

        // Header
        const header = new Header();

        new DragAndDrop(4);
        new DragAndDrop(6);
        new ColorWheel(8);
        new ScratchCard(10);

        positionedDragTarget();

        // Waiting time for introduction (totaly random)
        setTimeout(() => {
            router.next();

            setTimeout(() => {
                router.next();

                setTimeout(() => {
                    router.next();

                    setTimeout(() => {
                        router.next();
                        // You are..
                    }, 7000);
                    // Fuse is..
                }, 7000);
                // Embark in..
            }, 5000);
            // Logo
        }, 6000);
    }
}

export default App;