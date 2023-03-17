import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Test from "../Components/Test";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Test">
                <Test/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;