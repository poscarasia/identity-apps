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

import React, { ReactElement, useEffect, useState } from "react";
import { Icon, PaginationProps, DropdownProps } from "semantic-ui-react";
import { AxiosResponse, AxiosError } from "axios";
import { PrimaryButton } from "@wso2is/react-components";
import { PageLayout, ListLayout } from "../layouts";
import { EmailTemplateTypeList, EmailTemplateTypeWizard } from "../components/email-templates";
import { getEmailTemplateTypes, deleteEmailTemplateType } from "../api";
import { UserConstants } from "../constants";
import { EmailTemplateType, AlertInterface } from "../models";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addAlert } from "@wso2is/core/dist/src/store";
import { AlertLevels } from "@wso2is/core/dist/src/models";

/**
 * Component to list available email template types.
 */
export const EmailTemplateTypes = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [ listItemLimit, setListItemLimit ] = useState<number>(0);
    const [ listOffset, setListOffset ] = useState<number>(0);
    const [ showNewTypeWizard, setShowNewTypeWizard ] = useState<boolean>(false);
    
    const [ emailTemplateTypes, setEmailTemplateTypes ] = useState<EmailTemplateType[]>([]);
    const [ paginatedEmailTemplateTypes, setPaginatedEmailTemplateTypes ] = useState<EmailTemplateType[]>([]);

    useEffect(() => {
        setListItemLimit(UserConstants.DEFAULT_EMAIL_TEMPLATE_TYPE_ITEM_LIMIT);
    }, []);

    useEffect(() => {
        getTemplateTypes()
    }, [emailTemplateTypes.length]);

    const getTemplateTypes = (): void => {
        getEmailTemplateTypes().then((response: AxiosResponse<EmailTemplateType[]>) => {
            if (response.status === 200) {
                setEmailTemplateTypes(response.data);
                setEmailTemplateTypePage(listOffset, listItemLimit);
            }
        });
    }

    /**
     * Handler for pagination page change.
     * 
     * @param event pagination page change event
     * @param data pagination page change data
     */
    const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        const offsetValue = (data.activePage as number - 1) * listItemLimit;
        setListOffset(offsetValue);
        setEmailTemplateTypePage(offsetValue, listItemLimit);
    };

    /**
     * Handler for Items per page dropdown change.
     * 
     * @param event drop down event
     * @param data drop down data
     */
    const handleItemsPerPageDropdownChange = (event: React.MouseEvent<HTMLAnchorElement>, data: DropdownProps) => {
        setListItemLimit(data.value as number);
        setEmailTemplateTypePage(listOffset, data.value as number);
    };

    /**
     * Util method to paginate retrieved email template type list.
     * 
     * @param offsetValue pagination offset value
     * @param itemLimit pagination item limit
     */
    const setEmailTemplateTypePage = (offsetValue: number, itemLimit: number) => {
        setPaginatedEmailTemplateTypes(emailTemplateTypes?.slice(offsetValue, itemLimit + offsetValue));
    }

    /**
     * Dispatches the alert object to the redux store.
     *
     * @param {AlertInterface} alert - Alert object.
     */
    const handleAlerts = (alert: AlertInterface) => {
        dispatch(addAlert(alert));
    };

    const deleteTemplateType = (templateTypeId: string) => {
        deleteEmailTemplateType(templateTypeId).then((response: AxiosResponse) => {
            if (response.status === 204) {
                handleAlerts({
                    description: t(
                        "devPortal:components.emailTemplateTypes.notifications.deleteTemplateType.success.description"
                    ),
                    level: AlertLevels.SUCCESS,
                    message: t(
                        "devPortal:components.emailTemplateTypes.notifications.deleteTemplateType.success.message"
                    )
                });
            }
            getTemplateTypes();
        }).catch((error: AxiosError) => {
            handleAlerts({
                description: error.response.data.description,
                level: AlertLevels.ERROR,
                message: t(
                    "devPortal:components.emailTemplateTypes.notifications.deleteTemplateType.genericError.message"
                )
            });
        })
    }

    return (
        <PageLayout
            title="Email Templates Types"
            description="Create and manage templates types."
            showBottomDivider={ true } 
        >
            <ListLayout
                currentListSize={ listItemLimit }
                listItemLimit={ listItemLimit }
                onItemsPerPageDropdownChange={ handleItemsPerPageDropdownChange }
                onPageChange={ handlePaginationChange }
                showPagination={ true }
                totalPages={ Math.ceil(emailTemplateTypes?.length / listItemLimit) }
                totalListSize={ emailTemplateTypes?.length }
                rightActionPanel={
                    (
                        <PrimaryButton onClick={ () => setShowNewTypeWizard(true) }>
                            <Icon name="add"/>
                            New Template Type
                        </PrimaryButton>
                    )
                }
            >
                <EmailTemplateTypeList 
                    onDelete={ deleteTemplateType } 
                    templateTypeList={ paginatedEmailTemplateTypes } 
                />
                {
                    showNewTypeWizard && (
                        <EmailTemplateTypeWizard
                            onCloseHandler={ () => {
                                getTemplateTypes();
                                setShowNewTypeWizard(false);
                            } }
                        />
                    ) 
                }
            </ListLayout>
        </PageLayout>
    )
}
