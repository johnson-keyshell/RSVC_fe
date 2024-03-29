import React, { useState } from "react";
import CustomFileInput from "../CustomFileInput";
import { SAMPLE_IMAGE } from "../../config/urls";
import Table from "../Table";
import "./AddNewListing.css";
import Paper from "@mui/material/Paper";

import {
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";


const { i18n, t } = useTranslation();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AddNewListing() {
  const [images, setImages] = useState([
    {
      text: "Image 1",
      src: "https://s3-alpha-sig.figma.com/img/d238/fd00/a1d980e1f9d497784bfa621cdcb6a5c2?Expires=1697414400&Signature=X7V9NaQdytCYL4ObSf2gcyXmqW3FwCZg7SUxeg0fP1YkXtFPB4qrAxLGv0hsfw-rJke1GR3hpFFxoG7~TzdSbsZFmrDaeJENIlTQnbjUYexi9Rcxr1J3cVqOPyLxy-l5Kb0PeYSZZ0lQ2Vb5ITl-dk7sgIuOa09g4woo6uDD~7u2bXdQ3cKYrN6hmlx9TnD0Ga118MY50HLFfp72lNcMmLm1c2lJ056pZmPrXe9Y0PSHqZxgiaa2UJyzGajrKm-32wsfudb~yv0TZfyaAOSxN~NCsfbwQVZ6RsrCSlFXHdeOQflJKfS60hwcz9VJhd4Tdp7ceGMBL0rZHkr5MJ790g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      text: "Image 2",
      src: "https://s3-alpha-sig.figma.com/img/d238/fd00/a1d980e1f9d497784bfa621cdcb6a5c2?Expires=1697414400&Signature=X7V9NaQdytCYL4ObSf2gcyXmqW3FwCZg7SUxeg0fP1YkXtFPB4qrAxLGv0hsfw-rJke1GR3hpFFxoG7~TzdSbsZFmrDaeJENIlTQnbjUYexi9Rcxr1J3cVqOPyLxy-l5Kb0PeYSZZ0lQ2Vb5ITl-dk7sgIuOa09g4woo6uDD~7u2bXdQ3cKYrN6hmlx9TnD0Ga118MY50HLFfp72lNcMmLm1c2lJ056pZmPrXe9Y0PSHqZxgiaa2UJyzGajrKm-32wsfudb~yv0TZfyaAOSxN~NCsfbwQVZ6RsrCSlFXHdeOQflJKfS60hwcz9VJhd4Tdp7ceGMBL0rZHkr5MJ790g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
  ]);
  return (
    <>
      <div className="wrapper-add-new-listing">
        <div className="floor">
          <div className="mt-1">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                {/* Column 1 */}
                <div>
                  <p>
                    {t("nameOfTheProperty")}
                    <span>*</span>
                  </p>
                  <input type="text" placeholder={t("enterNameHere")} />
                </div>

                <br />
                <div>
                  <p>
                    {t("area/Locality")} 
                    <span>*</span>
                  </p>
                  <select>
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                  </select>
                </div>

                <br />
                <div>
                  <p>
                    {t("addressLine01")} <span>*</span>
                  </p>
                  <input type="text" placeholder={t("enterNameHere")} />
                </div>

                <br />
                <div>
                  <p>{t("AddressLne02")} </p>
                  <input type="text" placeholder={t("enterNameHere")} />
                </div>

                <br />
                <div>
                  <p>
                    {t("googleMapLink")} <span>*</span>
                  </p>
                  <input type="text" placeholder={t("EnterNameHere")} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Column 2 */}
                <p>{t("thumbnailImage")} (330px230px)</p>
                <div className="more-image-list">
                  <div className="darkBox mt-2">
                    <CustomFileInput />
                  </div>
                  <div style={{ left: "95px", position: "relative" }}>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                      >
                        <path
                          d="M5.5 2H7.5C7.5 1.73478 7.39464 1.48043 7.20711 1.29289C7.01957 1.10536 6.76522 1 6.5 1C6.23478 1 5.98043 1.10536 5.79289 1.29289C5.60536 1.48043 5.5 1.73478 5.5 2ZM4.5 2C4.5 1.46957 4.71071 0.960859 5.08579 0.585786C5.46086 0.210714 5.96957 0 6.5 0C7.03043 0 7.53914 0.210714 7.91421 0.585786C8.28929 0.960859 8.5 1.46957 8.5 2H12.5C12.6326 2 12.7598 2.05268 12.8536 2.14645C12.9473 2.24021 13 2.36739 13 2.5C13 2.63261 12.9473 2.75979 12.8536 2.85355C12.7598 2.94732 12.6326 3 12.5 3H11.936L10.731 11.838C10.6493 12.4369 10.3533 12.986 9.8979 13.3835C9.44249 13.781 8.85848 14 8.254 14H4.746C4.14152 14 3.55751 13.781 3.1021 13.3835C2.64669 12.986 2.35073 12.4369 2.269 11.838L1.064 3H0.5C0.367392 3 0.240215 2.94732 0.146447 2.85355C0.0526784 2.75979 0 2.63261 0 2.5C0 2.36739 0.0526784 2.24021 0.146447 2.14645C0.240215 2.05268 0.367392 2 0.5 2H4.5ZM5.5 5.5C5.5 5.36739 5.44732 5.24021 5.35355 5.14645C5.25979 5.05268 5.13261 5 5 5C4.86739 5 4.74021 5.05268 4.64645 5.14645C4.55268 5.24021 4.5 5.36739 4.5 5.5V10.5C4.5 10.6326 4.55268 10.7598 4.64645 10.8536C4.74021 10.9473 4.86739 11 5 11C5.13261 11 5.25979 10.9473 5.35355 10.8536C5.44732 10.7598 5.5 10.6326 5.5 10.5V5.5ZM8 5C8.13261 5 8.25979 5.05268 8.35355 5.14645C8.44732 5.24021 8.5 5.36739 8.5 5.5V10.5C8.5 10.6326 8.44732 10.7598 8.35355 10.8536C8.25979 10.9473 8.13261 11 8 11C7.86739 11 7.74021 10.9473 7.64645 10.8536C7.55268 10.7598 7.5 10.6326 7.5 10.5V5.5C7.5 5.36739 7.55268 5.24021 7.64645 5.14645C7.74021 5.05268 7.86739 5 8 5ZM3.26 11.703C3.30908 12.0623 3.48664 12.3916 3.75984 12.6301C4.03304 12.8685 4.38337 13 4.746 13H8.254C8.6168 13.0002 8.96737 12.8689 9.24078 12.6304C9.51419 12.3919 9.6919 12.0625 9.741 11.703L10.927 3H2.073L3.26 11.703Z"
                          fill="#F8665D"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <p>{t("mainImage")} (1380px650px)</p>
                  <div className="main-image-box">
                    <img src={SAMPLE_IMAGE} className="medium-image mt-0" />
                    <button style={{ left: "10px", position: "relative" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                      >
                        <path
                          d="M5.5 2H7.5C7.5 1.73478 7.39464 1.48043 7.20711 1.29289C7.01957 1.10536 6.76522 1 6.5 1C6.23478 1 5.98043 1.10536 5.79289 1.29289C5.60536 1.48043 5.5 1.73478 5.5 2ZM4.5 2C4.5 1.46957 4.71071 0.960859 5.08579 0.585786C5.46086 0.210714 5.96957 0 6.5 0C7.03043 0 7.53914 0.210714 7.91421 0.585786C8.28929 0.960859 8.5 1.46957 8.5 2H12.5C12.6326 2 12.7598 2.05268 12.8536 2.14645C12.9473 2.24021 13 2.36739 13 2.5C13 2.63261 12.9473 2.75979 12.8536 2.85355C12.7598 2.94732 12.6326 3 12.5 3H11.936L10.731 11.838C10.6493 12.4369 10.3533 12.986 9.8979 13.3835C9.44249 13.781 8.85848 14 8.254 14H4.746C4.14152 14 3.55751 13.781 3.1021 13.3835C2.64669 12.986 2.35073 12.4369 2.269 11.838L1.064 3H0.5C0.367392 3 0.240215 2.94732 0.146447 2.85355C0.0526784 2.75979 0 2.63261 0 2.5C0 2.36739 0.0526784 2.24021 0.146447 2.14645C0.240215 2.05268 0.367392 2 0.5 2H4.5ZM5.5 5.5C5.5 5.36739 5.44732 5.24021 5.35355 5.14645C5.25979 5.05268 5.13261 5 5 5C4.86739 5 4.74021 5.05268 4.64645 5.14645C4.55268 5.24021 4.5 5.36739 4.5 5.5V10.5C4.5 10.6326 4.55268 10.7598 4.64645 10.8536C4.74021 10.9473 4.86739 11 5 11C5.13261 11 5.25979 10.9473 5.35355 10.8536C5.44732 10.7598 5.5 10.6326 5.5 10.5V5.5ZM8 5C8.13261 5 8.25979 5.05268 8.35355 5.14645C8.44732 5.24021 8.5 5.36739 8.5 5.5V10.5C8.5 10.6326 8.44732 10.7598 8.35355 10.8536C8.25979 10.9473 8.13261 11 8 11C7.86739 11 7.74021 10.9473 7.64645 10.8536C7.55268 10.7598 7.5 10.6326 7.5 10.5V5.5C7.5 5.36739 7.55268 5.24021 7.64645 5.14645C7.74021 5.05268 7.86739 5 8 5ZM3.26 11.703C3.30908 12.0623 3.48664 12.3916 3.75984 12.6301C4.03304 12.8685 4.38337 13 4.746 13H8.254C8.6168 13.0002 8.96737 12.8689 9.24078 12.6304C9.51419 12.3919 9.6919 12.0625 9.741 11.703L10.927 3H2.073L3.26 11.703Z"
                          fill="#F8665D"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <p>{t("addMoreImages")} (1380px650px)</p>
                  {images.length > 0 ? (
                    images.map((image) => (
                      <div className="more-image-list mt-3" key={image.text}>
                        <img src={image?.src} alt={image?.text} />
                        <p className="image-name">{image?.text}</p>
                        <p>
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="10"
                              viewBox="0 0 14 10"
                              fill="none"
                            >
                              <path
                                d="M13.9598 4.47767C13.9393 4.43159 13.4453 3.3355 12.3468 2.23708C10.8833 0.773501 9.03467 0 7 0C4.96533 0 3.11675 0.773501 1.65316 2.23708C0.554745 3.3355 0.0583278 4.43334 0.0402444 4.47767C0.0137104 4.53735 0 4.60194 0 4.66725C0 4.73257 0.0137104 4.79715 0.0402444 4.85684C0.0606611 4.90292 0.554745 5.99842 1.65316 7.09684C3.11675 8.55984 4.96533 9.33334 7 9.33334C9.03467 9.33334 10.8833 8.55984 12.3468 7.09684C13.4453 5.99842 13.9393 4.90292 13.9598 4.85684C13.9863 4.79715 14 4.73257 14 4.66725C14 4.60194 13.9863 4.53735 13.9598 4.47767ZM7 8.40001C5.2045 8.40001 3.63591 7.74726 2.33741 6.46042C1.80462 5.93058 1.35134 5.32639 0.991662 4.66667C1.35124 4.00688 1.80454 3.40269 2.33741 2.87292C3.63591 1.58608 5.2045 0.933334 7 0.933334C8.7955 0.933334 10.3641 1.58608 11.6626 2.87292C12.1964 3.40256 12.6507 4.00676 13.0113 4.66667C12.5907 5.45184 10.7584 8.40001 7 8.40001ZM7 1.86667C6.44621 1.86667 5.90486 2.03089 5.4444 2.33855C4.98394 2.64622 4.62506 3.08352 4.41314 3.59516C4.20121 4.10679 4.14576 4.66978 4.2538 5.21292C4.36184 5.75607 4.62851 6.25498 5.0201 6.64657C5.41169 7.03816 5.9106 7.30483 6.45375 7.41287C6.99689 7.52091 7.55988 7.46546 8.07151 7.25354C8.58315 7.04161 9.02045 6.68273 9.32812 6.22227C9.63579 5.76181 9.8 5.22046 9.8 4.66667C9.79923 3.9243 9.50398 3.21256 8.97905 2.68762C8.45411 2.16269 7.74237 1.86744 7 1.86667ZM7 6.53334C6.63081 6.53334 6.26991 6.42386 5.96293 6.21875C5.65596 6.01364 5.41671 5.7221 5.27542 5.38101C5.13414 5.03992 5.09717 4.6646 5.1692 4.3025C5.24123 3.9404 5.41901 3.60779 5.68007 3.34674C5.94112 3.08568 6.27373 2.9079 6.63583 2.83587C6.99793 2.76384 7.37325 2.80081 7.71434 2.94209C8.05543 3.08338 8.34697 3.32263 8.55208 3.62961C8.75719 3.93658 8.86667 4.29748 8.86667 4.66667C8.86667 5.16174 8.67 5.63654 8.31993 5.9866C7.96987 6.33667 7.49507 6.53334 7 6.53334Z"
                                fill="#54C7E9"
                              />
                            </svg>
                          </button>
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="14"
                              viewBox="0 0 13 14"
                              fill="none"
                            >
                              <path
                                d="M5.5 2H7.5C7.5 1.73478 7.39464 1.48043 7.20711 1.29289C7.01957 1.10536 6.76522 1 6.5 1C6.23478 1 5.98043 1.10536 5.79289 1.29289C5.60536 1.48043 5.5 1.73478 5.5 2ZM4.5 2C4.5 1.46957 4.71071 0.960859 5.08579 0.585786C5.46086 0.210714 5.96957 0 6.5 0C7.03043 0 7.53914 0.210714 7.91421 0.585786C8.28929 0.960859 8.5 1.46957 8.5 2H12.5C12.6326 2 12.7598 2.05268 12.8536 2.14645C12.9473 2.24021 13 2.36739 13 2.5C13 2.63261 12.9473 2.75979 12.8536 2.85355C12.7598 2.94732 12.6326 3 12.5 3H11.936L10.731 11.838C10.6493 12.4369 10.3533 12.986 9.8979 13.3835C9.44249 13.781 8.85848 14 8.254 14H4.746C4.14152 14 3.55751 13.781 3.1021 13.3835C2.64669 12.986 2.35073 12.4369 2.269 11.838L1.064 3H0.5C0.367392 3 0.240215 2.94732 0.146447 2.85355C0.0526784 2.75979 0 2.63261 0 2.5C0 2.36739 0.0526784 2.24021 0.146447 2.14645C0.240215 2.05268 0.367392 2 0.5 2H4.5ZM5.5 5.5C5.5 5.36739 5.44732 5.24021 5.35355 5.14645C5.25979 5.05268 5.13261 5 5 5C4.86739 5 4.74021 5.05268 4.64645 5.14645C4.55268 5.24021 4.5 5.36739 4.5 5.5V10.5C4.5 10.6326 4.55268 10.7598 4.64645 10.8536C4.74021 10.9473 4.86739 11 5 11C5.13261 11 5.25979 10.9473 5.35355 10.8536C5.44732 10.7598 5.5 10.6326 5.5 10.5V5.5ZM8 5C8.13261 5 8.25979 5.05268 8.35355 5.14645C8.44732 5.24021 8.5 5.36739 8.5 5.5V10.5C8.5 10.6326 8.44732 10.7598 8.35355 10.8536C8.25979 10.9473 8.13261 11 8 11C7.86739 11 7.74021 10.9473 7.64645 10.8536C7.55268 10.7598 7.5 10.6326 7.5 10.5V5.5C7.5 5.36739 7.55268 5.24021 7.64645 5.14645C7.74021 5.05268 7.86739 5 8 5ZM3.26 11.703C3.30908 12.0623 3.48664 12.3916 3.75984 12.6301C4.03304 12.8685 4.38337 13 4.746 13H8.254C8.6168 13.0002 8.96737 12.8689 9.24078 12.6304C9.51419 12.3919 9.6919 12.0625 9.741 11.703L10.927 3H2.073L3.26 11.703Z"
                                fill="#F8665D"
                              />
                            </svg>
                          </button>
                        </p>
                      </div>
                    ))
                  ) : (
                    <>{t("noImageable")}</>
                  )}
                  <div className="mt-2">
                    <CustomFileInput />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Column 3 */}
                <p style={{ marginLeft: "10px" }}>{t("NumberOfFloors")}</p>
                <Table />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewListing;
