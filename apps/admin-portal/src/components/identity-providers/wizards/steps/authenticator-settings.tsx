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

import React, { FunctionComponent, ReactElement } from "react";
import {
    FederatedAuthenticatorListItemInterface,
    FederatedAuthenticatorMetaInterface,
    IdentityProviderInterface
} from "../../../../models";
import { AuthenticatorFormFactory } from "../../forms";

/**
 * Proptypes for the authenticator settings wizard form component.
 */
interface AuthenticatorSettingsWizardFormPropsInterface {
    metadata: FederatedAuthenticatorMetaInterface;
    initialValues: IdentityProviderInterface;
    onSubmit: (values: IdentityProviderInterface) => void;
    triggerSubmit: boolean;
}

/**
 * Authenticator settings wizard form component.
 *
 * @param {AuthenticatorSettingsWizardFormPropsInterface} props - Props injected to the component.
 * @return {ReactElement}
 */
export const AuthenticatorSettings: FunctionComponent<AuthenticatorSettingsWizardFormPropsInterface> = (
    props
): ReactElement => {

    const {
        metadata,
        initialValues,
        onSubmit,
        triggerSubmit
    } = props;

    const handleSubmit = (authenticator: FederatedAuthenticatorListItemInterface) => {
        onSubmit({
            ...initialValues,
            federatedAuthenticators: {
                authenticators: [{
                    ...authenticator,
                    isDefault: true,
                    isEnabled: true
                }],
                defaultAuthenticatorId: initialValues?.federatedAuthenticators?.defaultAuthenticatorId
            }
        });
    };

    const authenticator = initialValues?.federatedAuthenticators?.authenticators.find(authenticator =>
        authenticator.authenticatorId === initialValues?.federatedAuthenticators?.defaultAuthenticatorId);

    return (
        <AuthenticatorFormFactory
            metadata={ metadata }
            initialValues={ authenticator }
            onSubmit={ handleSubmit }
            type={ authenticator.name }
            triggerSubmit={ triggerSubmit }
            enableSubmitButton={ false }
        />
    );
};
