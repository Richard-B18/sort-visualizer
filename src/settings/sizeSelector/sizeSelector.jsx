import {Flex, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import {useState} from "react";

export default function SizeSelector(props) {
    const [sliderValue, setSliderValue] = useState(200);

    const labelStyles = {
        mt: '5',
        ml: '-2.5',
        fontSize: 'sm',
    };

    return (
        <Flex>
            <Text ml={5} mt={3}>Array Size</Text>
            <Slider
                disabled={props.disableSettings}
                ml={5}
                mt={2}
                w={`50%`}
                defaultValue={sliderValue}
                min={10}
                max={500}
                onChange={(val) => {
                    setSliderValue(val);
                    props.onSizeChange(val);
                }}
            >
                <SliderMark value={sliderValue} {...labelStyles}>{sliderValue}</SliderMark>
                <SliderTrack>
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb/>
            </Slider>
        </Flex>
    );

}

