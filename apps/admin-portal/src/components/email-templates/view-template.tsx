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

import React, { FunctionComponent, ReactElement, useState, useEffect } from "react";
import { Modal, Grid } from "semantic-ui-react";
import { Heading, LinkButton, PrimaryButton } from "@wso2is/react-components";
import { ApplicationWizardStepIcons } from "../../configs";
import { EmailTemplateEditor } from "./email-code-editor";
import { getTemplateDetails } from "../../api";
import { AxiosResponse } from "axios";
import { EmailTemplate } from "../../models";

interface ViewLocaleTemplatePropsInterface {
    onCloseHandler: () => void;
    onEditHandler: () => void;
    templateTypeId: string;
    templateId: string;
}

/**
 * Component will render an output of the selected email template.
 * 
 * @param props - props required to render html email template
 */
export const ViewLocaleTemplate: FunctionComponent<ViewLocaleTemplatePropsInterface> = (
    props: ViewLocaleTemplatePropsInterface
): ReactElement => {

    const [ templateData, setTemplateData ] = useState<EmailTemplate>(undefined);

    const {
        onCloseHandler,
        onEditHandler,
        templateTypeId,
        templateId
    } = props;

    useEffect(() => {
        getTemplateDetails(templateTypeId, templateId)
            .then((response: AxiosResponse<EmailTemplate>) => {
                if (response.status === 200) {
                    setTemplateData(response.data);
                }
            })
    },[templateData !== undefined])

    const WIZARD_STEPS = [{
        content: (
            <EmailTemplateEditor 
                htmlContent={ templateData?.body }
                isPreviewOnly
                isReadOnly
            />
        ),
        icon: ApplicationWizardStepIcons.general
    }]
    return (
        <Modal
            open={ true }
            className="wizard create-template-type-wizard"
            dimmer="blurring"
            size="small"
            onClose={ onCloseHandler }
            closeOnDimmerClick={ false }
            closeOnEscape={ false }
        >
            <Modal.Header className="wizard-header template-type-wizard">
                { templateData?.subject }
                <Heading as="h6">Preview Email Template</Heading>
            </Modal.Header>
            <Modal.Content className="content-container" scrolling>
                {WIZARD_STEPS[0].content}
            </Modal.Content>
            <Modal.Actions>
                <Grid>
                    <Grid.Row column={ 1 }>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <LinkButton floated="left" onClick={ () => { onCloseHandler() } }>Cancel</LinkButton>
                        </Grid.Column>
                        <Grid.Column mobile={ 8 } tablet={ 8 } computer={ 8 }>
                            <PrimaryButton floated="right" onClick={ () => { onEditHandler() } }>
                                Edit Template
                            </PrimaryButton>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal.Actions>
        </Modal>
    )
}
