import React from 'react';
import './sortingVisualizer.css';
import Settings from "../settings/settings";
import {Button, Flex} from "@chakra-ui/react";

import { bubble } from '../algorithms/bubblesort';
import bubbleAnimation from '../algorithms/bubblesort';

import { insertion } from '../algorithms/insertionsort'
import insertionAnimation from '../algorithms/insertionsort';

import { selection } from '../algorithms/selectionsort'
import selectionAnimation from '../algorithms/selectionsort';

export const DEFAULT_COLOR = `rgb(188, 233, 255)`

export const CHECKING_COLOR = `rgb(166, 235, 153)`

export const SORTED_COLOR = `rgb(214, 171, 224)`

export const DEFAULT_SPEED = 5;



export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sorting: false,
            sorted: false,
            width: 1000, // width of whole array display
            size: 50,
            speed: 1,
            algo: 'bubble',
            array: [],
        };

        this.onSizeChange = this.onSizeChange.bind(this);
        this.onSpeedChange = this.onSpeedChange.bind(this);
        this.onAlgorithmChange = this.onAlgorithmChange.bind(this);
        this.sort = this.sort.bind(this);
        this.resetArray = this.resetArray.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        for (const e of document.getElementsByClassName('array-bar')) {
            e.style.backgroundColor = DEFAULT_COLOR;
        }

        const array = [];
        const {size} = this.state;
        for (let i = 0; i < size; i++) {
            array.push(randomInt(20, 500));
        }
        this.setState({array: array, sorted: false});
    }

    onSizeChange(size) {
        this.setState({size: size});
        this.resetArray();

        this.setState({
            size: size,
        }, () => {
            this.resetArray();
        });

    }

    onSpeedChange(speed) {
        this.setState({speed: speed});
    }

    onAlgorithmChange(algo) {
        this.setState({algo: algo});

        if (this.state.sorted) {
            this.resetArray();
        }
    }

    sort() {
        const {algo, array, speed} = this.state;

        let animationSpeed = speed;

        if (speed < 1) {
            animationSpeed = 1 / (-1 * speed + 2);
        }

        let animations = null;

        this.setState({sorting: true});

        switch (algo) {
            case 'bubble':
                animations = bubble(array);
                bubbleAnimation(animations, animationSpeed);
                break;
            case 'insertion':
                animations = insertion(array);
                insertionAnimation(animations, animationSpeed);
                break;
            case 'selection':
                animations = selection(array);
                selectionAnimation(animations, animationSpeed);
                break;
            case 'merge':
                break;
            default:
                return;
        }

        const totalAnimationTime = animations.length * DEFAULT_SPEED / animationSpeed + 3 * array.length;

        // animations stuff
        setTimeout(()=> {
            this.setState({sorting: false, sorted: true});
        }, totalAnimationTime);
    }

    render() {
        const {array, sorted, sorting, size} = this.state;
        return (
            <div className="main">
                <div>
                    <Settings
                        onSizeChange={this.onSizeChange}
                        onSpeedChange={this.onSpeedChange}
                        onAlgorithmChange={this.onAlgorithmChange}
                        disableSettings={sorting}
                    ></Settings>
                    <Flex ml={5}>
                        <Button disabled={sorting || sorted} onClick={this.sort} mt={5} size="sm">Sort!</Button>
                        { sorted
                            ? <Button ml={5} onClick={this.resetArray} mt={5} size="sm">Generate array with same size</Button>
                            : <></>
                        }
                    </Flex>
                </div>
                <div className="array">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{height: `${value}px`, width: `${100 / size}%`, background: DEFAULT_COLOR}}>
                            {size <= 20
                                ? value
                                : ''
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}