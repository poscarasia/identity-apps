/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import {
    AccountSecurityPage,
    AccountsPage,
    ConsentManagementPage,
    HomePage,
    PageNotFound,
    PersonalInfoPage,
    SessionsPage
} from "../pages";

/**
 * Interface to handle route types.
 */
interface Route {
    component: any;
    icon?: string;
    name: string;
    path: string;
    protected: boolean;
    showOnSidePanel: boolean;
}

/**
 * Routes array.
 */
const ROUTES: Route[] = [
    {
        component: HomePage,
        icon: "overview",
        name: "Overview",
        path: "/overview",
        protected: true,
        showOnSidePanel: true,
    },
    {
        component: PersonalInfoPage,
        icon: "personal",
        name: "Personal Info",
        path: "/personal-info",
        protected: true,
        showOnSidePanel: true,
    },
    {
        component: AccountSecurityPage,
        icon: "security",
        name: "Security",
        path: "/security",
        protected: true,
        showOnSidePanel: true,
    },
    {
        component: AccountsPage,
        icon: "account",
        name: "Accounts",
        path: "/accounts",
        protected: true,
        showOnSidePanel: false,
    },
    {
        component: SessionsPage,
        icon: "session",
        name: "Sessions",
        path: "/sessions",
        protected: true,
        showOnSidePanel: false,
    },
    {
        component: ConsentManagementPage,
        icon: "consent",
        name: "Consent Management",
        path: "/consent-management",
        protected: true,
        showOnSidePanel: false,
    },
    {
        component: PageNotFound,
        name: "404",
        path: null,
        protected: true,
        showOnSidePanel: false,
    },
];

export const routes = ROUTES;