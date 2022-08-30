import {Flex, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import {useState} from "react";

export default function SpeedSelector(props) {
    const [sliderValue, setSliderValue] = useState(1);

    const labelStyles = {
        mt: '5',
        ml: '-2.5',
        fontSize: 'sm',
    };

    return (
        <Flex mt={5}>
            <Text ml={5} mt={3}>Sorting Speed</Text>
            <Slider
                disabled={props.disableSettings}
                ml={5}
                mt={2}
                w={`50%`}
                defaultValue={sliderValue}
                min={-8}
                max={10}
                onChange={(val) => {
                    setSliderValue(val);
                    props.onSpeedChange(val);
                }}
            >
                {sliderValue !== 1
                    ? <SliderMark value={sliderValue} {...labelStyles}>{
                    sliderValue >= 1
                        ? `${sliderValue}x faster`
                        : `${-1 * sliderValue + 2}x slower`}
                    </SliderMark>
                    : <SliderMark value={sliderValue} {...labelStyles}>normal speed</SliderMark>
                }

                <SliderTrack>
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb/>
            </Slider>
        </Flex>
    );

}

