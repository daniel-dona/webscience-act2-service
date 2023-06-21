import React from "react";
import { Navbar, Nav } from "rsuite";
const { Body } = Navbar;
const { Item } = Nav;
import { getPhrase } from "../../utils/Languages";

// Terms of use
// https://www.era.europa.eu/sites/default/files/registers/docs/rinf_terms_of_use_en.pdf
// Copyright notice
// https://www.era.europa.eu/content/disclaimer-and-copyright-notice
// Privacy statement
// https://www.era.europa.eu/content/data-protection
// Rinf api
// https://rinf.era.europa.eu/API/Help

export default function Footer({ language }) {
  return (
    <Nav justified style={{ backgroundColor: "#f7f7fa", padding: "15px 0" }}>
      <Item
        href="https://www.era.europa.eu/sites/default/files/registers/docs/rinf_terms_of_use_en.pdf"
        style={{ textAlign: "center" }}
      >
        {getPhrase("termsOfUse", language)}
      </Item>
      <Item
        href="https://www.era.europa.eu/content/disclaimer-and-copyright-notice"
        style={{ textAlign: "center" }}
      >
        {getPhrase("copyrightNotice", language)}
      </Item>
      <Item
        href="https://www.era.europa.eu/content/data-protection"
        style={{ textAlign: "center" }}
      >
        {getPhrase("privacyStatement", language)}
      </Item>
      <Item
        href="https://rinf.era.europa.eu/RINF/Home/DownloadUserManual?lang=en"
        style={{ textAlign: "center" }}
      >
        {getPhrase("userManual", language)}
      </Item>
      <Item
        href="/status"
        style={{ textAlign: "center" }}
      >
        {getPhrase("status", language)}
      </Item>
      <Item
        href="/api"
        style={{ textAlign: "center" }}
      >
        {getPhrase("rinfAPI", language)}
      </Item>
    </Nav>
  );
}
