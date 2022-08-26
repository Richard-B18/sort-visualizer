import {
    Box, Select, Text,

} from "@chakra-ui/react";

import SizeSelector from "./sizeSelector/sizeSelector";
import SpeedSelector from "./speedSelector/speedSelector";


export default function Settings(props) {
    return (
        <Box>
            <SizeSelector onSizeChange={props.onSizeChange} disableSettings={props.disableSettings}></SizeSelector>
            <SpeedSelector onSpeedChange={props.onSpeedChange} disableSettings={props.disableSettings}></SpeedSelector>
            <Select disabled={props.disableSettings} w={`50%`} ml={5} mt={10} defaultValue={'bubble'} onChange={(e) => {
                props.onAlgorithmChange(e.target.value);
            }}>
                <option value='bubble'>Bubble Sort</option>
                <option value='insertion'>Insertion Sort</option>
                <option value='selection'>Selection Sort</option>
                <option value='merge'>Merge Sort</option>
            </Select>
        </Box>
    );
}