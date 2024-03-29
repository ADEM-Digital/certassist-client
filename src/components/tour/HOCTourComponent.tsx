import { PopoverContentProps } from '@reactour/tour'
import React from 'react'
import DefaultContentComponent from './DefaultContentComponent';

const HOCTourComponent: React.FC<PopoverContentProps> = (props) => {
    // @ts-ignore
    if (props.steps[props.currentStep].contentComponent) {
        // @ts-ignore
        const Component = props.steps[props.currentStep].contentComponent;
        return Component ? <Component {...props}/> : undefined
    } else {
        return DefaultContentComponent ? <DefaultContentComponent {...props}/> : undefined
    }
}

export default HOCTourComponent