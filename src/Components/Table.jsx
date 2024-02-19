import React from "react";
import { useTranslation } from "react-i18next";

function Table() {
  const { i18n, t } = useTranslation();

  return (
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">{t("floorNumber")}/{t("name")}</th>
            <th scope="col">{t("units")}</th>
            <th scope="col">{t("floorPlanImage")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="shade">{t("groundfloor")}</td>
            <td className="shade">3</td>
            <td>
              <u>Layout.jpeg</u>
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <g filter="url(#filter0_d_136_1820)">
                  <rect
                    x="4"
                    y="2"
                    width="22"
                    height="22"
                    rx="4"
                    fill="white"
                  />
                </g>
                <path
                  d="M14.5 8H16.5C16.5 7.73478 16.3946 7.48043 16.2071 7.29289C16.0196 7.10536 15.7652 7 15.5 7C15.2348 7 14.9804 7.10536 14.7929 7.29289C14.6054 7.48043 14.5 7.73478 14.5 8ZM13.5 8C13.5 7.46957 13.7107 6.96086 14.0858 6.58579C14.4609 6.21071 14.9696 6 15.5 6C16.0304 6 16.5391 6.21071 16.9142 6.58579C17.2893 6.96086 17.5 7.46957 17.5 8H21.5C21.6326 8 21.7598 8.05268 21.8536 8.14645C21.9473 8.24021 22 8.36739 22 8.5C22 8.63261 21.9473 8.75979 21.8536 8.85355C21.7598 8.94732 21.6326 9 21.5 9H20.936L19.731 17.838C19.6493 18.4369 19.3533 18.986 18.8979 19.3835C18.4425 19.781 17.8585 20 17.254 20H13.746C13.1415 20 12.5575 19.781 12.1021 19.3835C11.6467 18.986 11.3507 18.4369 11.269 17.838L10.064 9H9.5C9.36739 9 9.24021 8.94732 9.14645 8.85355C9.05268 8.75979 9 8.63261 9 8.5C9 8.36739 9.05268 8.24021 9.14645 8.14645C9.24021 8.05268 9.36739 8 9.5 8H13.5ZM14.5 11.5C14.5 11.3674 14.4473 11.2402 14.3536 11.1464C14.2598 11.0527 14.1326 11 14 11C13.8674 11 13.7402 11.0527 13.6464 11.1464C13.5527 11.2402 13.5 11.3674 13.5 11.5V16.5C13.5 16.6326 13.5527 16.7598 13.6464 16.8536C13.7402 16.9473 13.8674 17 14 17C14.1326 17 14.2598 16.9473 14.3536 16.8536C14.4473 16.7598 14.5 16.6326 14.5 16.5V11.5ZM17 11C17.1326 11 17.2598 11.0527 17.3536 11.1464C17.4473 11.2402 17.5 11.3674 17.5 11.5V16.5C17.5 16.6326 17.4473 16.7598 17.3536 16.8536C17.2598 16.9473 17.1326 17 17 17C16.8674 17 16.7402 16.9473 16.6464 16.8536C16.5527 16.7598 16.5 16.6326 16.5 16.5V11.5C16.5 11.3674 16.5527 11.2402 16.6464 11.1464C16.7402 11.0527 16.8674 11 17 11ZM12.26 17.703C12.3091 18.0623 12.4866 18.3916 12.7598 18.6301C13.033 18.8685 13.3834 19 13.746 19H17.254C17.6168 19.0002 17.9674 18.8689 18.2408 18.6304C18.5142 18.3919 18.6919 18.0625 18.741 17.703L19.927 9H11.073L12.26 17.703Z"
                  fill="#F8665D"
                />
                <defs>
                  <filter
                    id="filter0_d_136_1820"
                    x="0"
                    y="0"
                    width="30"
                    height="30"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_136_1820"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_136_1820"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="shade">{t("groundfloor")}</td>
            <td className="shade">3</td>
            <td>
              <u>Layout.jpeg</u>
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <g filter="url(#filter0_d_136_1820)">
                  <rect
                    x="4"
                    y="2"
                    width="22"
                    height="22"
                    rx="4"
                    fill="white"
                  />
                </g>
                <path
                  d="M14.5 8H16.5C16.5 7.73478 16.3946 7.48043 16.2071 7.29289C16.0196 7.10536 15.7652 7 15.5 7C15.2348 7 14.9804 7.10536 14.7929 7.29289C14.6054 7.48043 14.5 7.73478 14.5 8ZM13.5 8C13.5 7.46957 13.7107 6.96086 14.0858 6.58579C14.4609 6.21071 14.9696 6 15.5 6C16.0304 6 16.5391 6.21071 16.9142 6.58579C17.2893 6.96086 17.5 7.46957 17.5 8H21.5C21.6326 8 21.7598 8.05268 21.8536 8.14645C21.9473 8.24021 22 8.36739 22 8.5C22 8.63261 21.9473 8.75979 21.8536 8.85355C21.7598 8.94732 21.6326 9 21.5 9H20.936L19.731 17.838C19.6493 18.4369 19.3533 18.986 18.8979 19.3835C18.4425 19.781 17.8585 20 17.254 20H13.746C13.1415 20 12.5575 19.781 12.1021 19.3835C11.6467 18.986 11.3507 18.4369 11.269 17.838L10.064 9H9.5C9.36739 9 9.24021 8.94732 9.14645 8.85355C9.05268 8.75979 9 8.63261 9 8.5C9 8.36739 9.05268 8.24021 9.14645 8.14645C9.24021 8.05268 9.36739 8 9.5 8H13.5ZM14.5 11.5C14.5 11.3674 14.4473 11.2402 14.3536 11.1464C14.2598 11.0527 14.1326 11 14 11C13.8674 11 13.7402 11.0527 13.6464 11.1464C13.5527 11.2402 13.5 11.3674 13.5 11.5V16.5C13.5 16.6326 13.5527 16.7598 13.6464 16.8536C13.7402 16.9473 13.8674 17 14 17C14.1326 17 14.2598 16.9473 14.3536 16.8536C14.4473 16.7598 14.5 16.6326 14.5 16.5V11.5ZM17 11C17.1326 11 17.2598 11.0527 17.3536 11.1464C17.4473 11.2402 17.5 11.3674 17.5 11.5V16.5C17.5 16.6326 17.4473 16.7598 17.3536 16.8536C17.2598 16.9473 17.1326 17 17 17C16.8674 17 16.7402 16.9473 16.6464 16.8536C16.5527 16.7598 16.5 16.6326 16.5 16.5V11.5C16.5 11.3674 16.5527 11.2402 16.6464 11.1464C16.7402 11.0527 16.8674 11 17 11ZM12.26 17.703C12.3091 18.0623 12.4866 18.3916 12.7598 18.6301C13.033 18.8685 13.3834 19 13.746 19H17.254C17.6168 19.0002 17.9674 18.8689 18.2408 18.6304C18.5142 18.3919 18.6919 18.0625 18.741 17.703L19.927 9H11.073L12.26 17.703Z"
                  fill="#F8665D"
                />
                <defs>
                  <filter
                    id="filter0_d_136_1820"
                    x="0"
                    y="0"
                    width="30"
                    height="30"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_136_1820"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_136_1820"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button className="add-more-btn mt-3" style={{ marginLeft: "10px" }}>
          {t("AddMore")}
        </button>
      </div>
    </div>
  );
}

export default Table;
