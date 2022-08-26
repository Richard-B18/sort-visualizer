import  { DEFAULT_COLOR, CHECKING_COLOR, SORTED_COLOR, DEFAULT_SPEED } from '../visualizer/sortingVisualizer';

export function bubble(array) {
    const size = array.length;
    const animations = [] // array of objects, every object has an array to show and numbers being swapped

    for (let i = 0; i < size - 1; i++) {
        let sorted = true;
        for (let j = 0; j < size - i - 1; j++) {
            const animation1 = {
                'comparisons': [j, j+1],
                'swap': false,
                'index': 0
            }
            animations.push(animation1);
            if (array[j] > array[j+1]) {
                sorted = false;

                const temp = array[j+1];
                array[j+1] = array[j];
                array[j] = temp;

                const animation2 = {
                    'comparisons': [j, j+1],
                    'swap': true,
                    'index': 1
                }
                animations.push(animation2);
            } else {
                const animation2 = {
                    'comparisons': [j, j+1],
                    'swap': false,
                    'index': 1
                }
                animations.push(animation2);
            }
        }

        const special_animation = {
            'index': 2,
            'number': size - 1 - i,
        }

        animations.push(special_animation);


        if (sorted) {
            break;
        }
    }

    return animations;
}

export default function bubbleAnimation(animations, speed) {
    const toBeAnimated = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];

        let barOneIndex = null;
        let barTwoIndex = null;

        if (animation.index !== 2) {
            barOneIndex = animation.comparisons[0];
            barTwoIndex = animation.comparisons[1];
        }

        setTimeout(() => {
            if (animation.index === 0) {
                toBeAnimated[barOneIndex].style.backgroundColor = CHECKING_COLOR;
                toBeAnimated[barTwoIndex].style.backgroundColor = CHECKING_COLOR;
            } else if (animation.index === 1) {
                if (animation.swap) {
                    const barOneValue = toBeAnimated[barOneIndex].innerHTML;
                    const barOneHeight = toBeAnimated[barOneIndex].style.height;

                    const barTwoValue = toBeAnimated[barTwoIndex].innerHTML;
                    const barTwoHeight = toBeAnimated[barTwoIndex].style.height;

                    toBeAnimated[barOneIndex].style.height = barTwoHeight;
                    toBeAnimated[barOneIndex].innerHTML = barTwoValue;

                    toBeAnimated[barTwoIndex].style.height = barOneHeight;
                    toBeAnimated[barTwoIndex].innerHTML = barOneValue;
                }

                toBeAnimated[barOneIndex].style.backgroundColor = DEFAULT_COLOR;
                toBeAnimated[barTwoIndex].style.backgroundColor = DEFAULT_COLOR;
            }
        }, DEFAULT_SPEED * i / speed );
    }

    for (let i = 0; i < toBeAnimated.length; i++) {
        setTimeout(() => {
            toBeAnimated[i].style.backgroundColor = SORTED_COLOR;
        }, DEFAULT_SPEED * animations.length / speed + 3 * i);
    }
}

