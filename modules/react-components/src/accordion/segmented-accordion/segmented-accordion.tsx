/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import classNames from "classnames";
import React, { FunctionComponent, ReactElement } from "react";
import { Accordion, AccordionProps } from "semantic-ui-react";
import { SegmentedAccordionContent } from "./segmented-accordion-content";
import { SegmentedAccordionTitle } from "./segmented-accordion-title";

/**
 * Interface for the segmented accordion sub components.
 */
export interface SegmentedAccordionSubComponentsInterface {
    Content: typeof SegmentedAccordionContent;
    Title: typeof SegmentedAccordionTitle;
}

/**
 * Proptypes for the segmented accordion component.
 */
export type SegmentedAccordionPropsInterface = AccordionProps

/**
 * Segmented accordion component.
 *
 * @param {SegmentedAccordionPropsInterface} props - Props injected to the component.
 * @return {ReactElement}
 */
export const SegmentedAccordion: FunctionComponent<SegmentedAccordionPropsInterface>
    & SegmentedAccordionSubComponentsInterface = (
        props: SegmentedAccordionPropsInterface
): ReactElement => {

    const {
        className,
        children,
        ...rest
    } = props;

    const classes = classNames(
        "segmented-accordion",
        className
    );

    return (
        <Accordion
            className={ classes }
            { ...rest }
        >
            { children }
        </Accordion>
    );
};

SegmentedAccordion.Title = SegmentedAccordionTitle;
SegmentedAccordion.Content = SegmentedAccordionContent;
