import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SAMPLE_LAYOUT_IMAGE } from "../../config/urls";
import { useTranslation } from "react-i18next";

export default function BasicAccordion() {
  const { i18n, t } = useTranslation()
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            className="accordion-title"
            style={{
              color: "#4C4C4C",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            {t("unit01")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            style={{
              color: "#4C4C4C",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            {t("unit02")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            style={{
              color: "#4C4C4C",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            {t("unit03")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <img src={SAMPLE_LAYOUT_IMAGE} className="w-100" />
            <p className="view-details mt-2" style={{
                color:"#F8665D",
                fontFamily:"Inter",
                fontSize:"12px",
                fontStyle:"normal",
                fontWeight:400,
                lineHeight:"normal",
                textDecorationLine:"underline"
        }}>{t("viewDetails")}</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
