import  { DEFAULT_COLOR, CHECKING_COLOR, SORTED_COLOR, DEFAULT_SPEED } from '../sortingVisualizer/sortingVisualizer';

export function selection(array) {
    const n = array.length;
    const animations = [] // array of objects, every object has an array to show and numbers being swapped

    let i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            const animation1 = {
                'animate': [i, j],
                'mode': 'compare',
            }

            const animation2 = {
                'animate': [i, j],
                'mode': 'uncompare',
            }

            animations.push(animation1);
            animations.push(animation2);

            if (array[j] < array[min_idx])
                min_idx = j;
        }

        // swap

        const animation3 = {
            'animate': [i, min_idx],
            'mode': 'swap',
        }

        animations.push(animation3);

        const temp = array[i];
        array[i] = array[min_idx];
        array[min_idx] = temp;
    }
    return animations;
}

export default function selectionAnimation(animations, speed) {
    const toBeAnimated = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];

        const barOneIndex = animation.animate[0];
        const barTwoIndex = animation.animate[1];

        setTimeout(() => {
            switch (animation.mode) {
                case 'compare':
                    toBeAnimated[barOneIndex].style.backgroundColor = CHECKING_COLOR;
                    toBeAnimated[barTwoIndex].style.backgroundColor = CHECKING_COLOR;
                    break;
                case 'uncompare':
                    toBeAnimated[barOneIndex].style.backgroundColor = DEFAULT_COLOR;
                    toBeAnimated[barTwoIndex].style.backgroundColor = DEFAULT_COLOR;
                    break;
                case 'swap':
                    const barOneValue = toBeAnimated[barOneIndex].innerHTML;
                    const barOneHeight = toBeAnimated[barOneIndex].style.height;

                    toBeAnimated[barOneIndex].style.height = toBeAnimated[barTwoIndex].style.height;
                    toBeAnimated[barOneIndex].innerHTML = toBeAnimated[barTwoIndex].innerHTML;

                    toBeAnimated[barTwoIndex].style.height = barOneHeight;
                    toBeAnimated[barTwoIndex].innerHTML = barOneValue;
                    break;
                default:
                    return;
            }
        }, DEFAULT_SPEED * i / speed);
    }

    for (let i = 0; i < toBeAnimated.length; i++) {
        setTimeout(() => {
            toBeAnimated[i].style.backgroundColor = SORTED_COLOR;
        }, DEFAULT_SPEED * animations.length / speed + 3 * i);
    }
}