import React from "react";
import Header from "../../Components/Header/Header";
import "./Buyer.css";
import { SAMPLE_LAYOUT_IMAGE } from "../../config/urls";
import { useNavigate } from "react-router-dom";
import Filtermenu from "../../Components/FilterMenu/Filtermenu";
import { useTranslation } from "react-i18next";
function LayoutScreen({
  
  nextStep
}) 

{
  const { i18n, t } = useTranslation();
  return (
    <div>
      <Filtermenu/>
      <main className="layout-screen">
        <div className="container-fluid">
          <div className="row ml-5">
            <div className="card-left m-2">
              <div className="container-fluid p-4">
                <p>Taylorweg 102, Veghel</p>
                <h2 style={{ top: "-16px", position: "relative" }}>
                  RSVC Overleg Hofmanweg 1 Haarlem
                </h2>
                <div className="row">
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <p>{t("totalNoFloors")}</p>
                    <h2>03</h2>
                    <div className="button-same-row">
                      <button>{t("floor1")}</button>
                      <button>{t("floor2")}</button>
                      <button>{t("floor3")}</button>
                    </div>
                    <div>
                      <img
                        src={SAMPLE_LAYOUT_IMAGE}
                        className="w-100 image-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-right m-2">
              <div className="container-fluid">
                <div className="grey-box mt-3">
                  <div className="container-fluid m-1">
                    <div style={{ top: "15px", position: "relative" }}>
                      <h2>{t("selected")}</h2>
                      <p>{t("floors")}</p>
                      <h2 style={{ top: "-16px", position: "relative" }}>
                        02,03
                      </h2>
                      <div
                        className="mt-4"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          left: "-40px",
                          position: "relative",
                        }}
                      >
                        <div>
                          <p>{t("totalUnits")}</p>
                          <h2 style={{ top: "-15px", position: "relative" }}>
                            04
                          </h2>
                        </div>
                        <div>
                          <p>{t("selectedUnits")} </p>
                          <h2 style={{ top: "-15px", position: "relative" }}>
                            K01,K02
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="same-line mt-4">
                  <p>{t("layoutDocumentPDF")}</p>
                  <p>
                    <u>{t("download")}</u>
                  </p>
                </div>
                <div className="bottom_btn">
                  <button className=""  onClick={() => nextStep("ChatScreen")}>
                    {t("chatWithTheAgent")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LayoutScreen;
