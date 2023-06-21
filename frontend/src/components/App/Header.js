import React, {useEffect} from "react";
import { Nav, Navbar, Dropdown } from "rsuite";
import eraLogoPath from "../../img/era-logo-new.png";
import { ERALogo } from "../../styles/Styles";
import { availableLanguages, getPhrase } from "../../utils/Languages";
import {EraIcon} from "../../styles/Icon";
import {AuthenticatedTemplate} from "@azure/msal-react";
import {UserMenu} from "../Authentication/UserMenu.jsx";
const { Header, Body } = Navbar;
const { Item } = Nav;
import {appRoleMap} from "../../azure/authConfig.js";
import {getActiveRole} from "../Authentication/CookieManager.js";


const AllowedTabsByRole = ({language}) => {
    const activeRole = getActiveRole()
    const roleList = Array.from(appRoleMap.values())

    useEffect(() => {
    }, [getActiveRole()])

    switch (appRoleMap.get(activeRole)) {
        case roleList[0]:   //Admin
            return(
                <Item href="/dataset-manager" icon={<EraIcon faName="book" margin="5px"/>}>{getPhrase("datasetManagement", language)}</Item>
            )
        case roleList[1]:   //IM
            return(
                <Item href="/dataset-manager" icon={<EraIcon faName="book" margin="5px"/>}>{getPhrase("datasetManagement", language)}</Item>
            )
        case roleList[2]:   //NRE
            return(
                <Item href="/dataset-manager" icon={<EraIcon faName="book" margin="5px"/>}>{getPhrase("datasetManagement", language)}</Item>
            )
        case roleList[4]:   //RU
            return null
        default:            //User
            return null
    }

}

export default function NavHeader({ language, saveLanguage }) {

    return (
        <Navbar>
            <Header style={{height: "100px"}}>
                <a href="/"><ERALogo src={eraLogoPath} className="logo" /></a>
            </Header>

            <br></br>

            <Body>
                <Nav pullRight>

                    <Item href="/route-compatibility" icon={<EraIcon faName="route" margin="5px"/>}>{getPhrase("routeCompatibilityCheck", language)}</Item>
                    <Item href="/search" icon={<EraIcon faName="search" margin="5px"/>}>{getPhrase("search", language)}</Item>
                    <Item href="/data-stories" icon={<EraIcon faName="book" margin="5px"/>}>{getPhrase("dataStories", language)}</Item>
                    <AuthenticatedTemplate>
                        <AllowedTabsByRole language={language}/>
                    </AuthenticatedTemplate>
                    <Item href="/endpoint" icon={<EraIcon faName="plug" margin="5px"/>}>{getPhrase("Endpoint", language)}</Item>

                    <UserMenu/>

                    <Dropdown icon={<EraIcon faName="language" />}>
                        {Object.keys(availableLanguages).map((l) => (
                            <Dropdown.Item key={l} onSelect={() => saveLanguage(l)}>
                                {availableLanguages[l]}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>

                </Nav>
            </Body>
        </Navbar>
    );
}
