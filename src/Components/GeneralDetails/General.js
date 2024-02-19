import * as React from 'react';
import './General.css'
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";

export default function NewListing() {
    const { i18n, t } = useTranslation();
    return (
        <div className="row">
            <div className="container">
                <div>
                    <form className="row formBox p-3">
                        <div className="col-md-4">
                            <p>
                                {("description")}<span>*</span>
                                <br />
                                <textarea class="no-scroll">{("description")}</textarea>
                            </p>
                            <p>
                                {t("ageOfBuilding")}
                                <span>*</span>
                                <br />
                                <input type="text" placeholder={t("enterDetailsHere")} />
                            </p><p>
                                H
                            {t("houseType")}
                                <br />
                                <input type="text" placeholder={t("enterDetailsHere")} />
                            </p>
                            <div className='add-img-btn-container'>
                                <button className="add-more-btn mt-3" style={{ marginLeft: "10px" }}>
                                    {t("+Add")}
                                </button>


                            </div>
                        </div>
                        <div className="col-md-3">
                            <p>
                                Lorem ipsum
                                <br />
                                <input type="text" placeholder={t("enterDetailsHere")} />
                            </p>
                            <p>
                                Lorem ipsum
                                <br />
                                <input type="text" placeholder={t("enterDetailsHere")} />
                            </p>
                            <p>
                                Lorem ipsum

                                <br />
                                <input type="text" placeholder={t("enterDetailsHere")} />
                            </p>
                            <p>
                                Lorem ipsum
                                <br />
                                <input type="text" placeholder={t("enterDetailsHere")} />
                            </p>

                        </div>
                        {/* <div className="col-md-5">
                            <div className="margin-bottom">
                                <button className="candelBtn">Cancel</button>
                                <button className="nextBtn">Next</button>
                            </div>
                        </div> */}

                    </form>
                </div >

            </div >

        </div >

    );
}