import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LeftNav from "../../../Components/LeftNav/LeftNav/LeftNav";
import Header from "../../../Components/Header/Header";
import { useTranslation } from "react-i18next";
import InputFieldWithTitle from "../../../Elements/InputFieldWithTitle";
import LeftNavOwner from "../../../Components/LeftNav/LeftNavOwner/LeftNavOwner";


const SellerInfoPage = () => {
    const { i18n, t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);

    // Sample data, replace it with your actual data
    const [buyerData, setBuyerData] = useState({
        name: "John Doe",
        age: "",
        blood: "",
        addressl1: "123 Main St, Cityville",
        addressl2: "123 Main St, Cityville",
        zipCode: "",
        age: "18",
        city: "Vellarad",
        state: "TVM",
        country: "India",
        FatherName: "Jose",
        motherName: "Beena",
        contact: "",
        mobile: "",
        pEmail: "",
        sEmail: ""
        // Add more fields as needed
    });



    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleFieldChange = (field, value) => {
        setBuyerData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };


    const [isBankEditing, setIsBankEditing] = useState(false);
    const [bankData, setBankData] = useState({
        name: "Geo Jose",
        accNo: "43567890876543",
        ifsc: "FDRL001101",
        bank: "Federal",
        branch: "Karakkonam",
    });

    const handleEditBank = () => {
        setIsBankEditing(!isBankEditing);
    };

    const handleBankFieldChange = (field, value) => {
        setBankData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (


        <div>
            <header>
                <Header />
            </header>
            <div className="container-fluid p-4">
                <Tabs className="vertical-tabs">
                    <TabList className="hidden-tab-list" >
                        <Tab className="hidden-tab-list"></Tab>
                    </TabList>
                    <LeftNavOwner />
                    <TabPanel style={{ height: 'fit-content', width: '70%' }}>
                        <main>
                            <h2 class="active-menu">{t("profile")}</h2>
                            <div className="container-fluid-buyer-document">
                                <Box>

                                    <Container maxWidth="100%" sx={{ marginTop: 4 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                            <h2 class="active-menu">{t("myInfo")}</h2>
                                            {isEditing ? (
                                                <Button class="floor-image-btn" onClick={handleEditToggle}>
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button class="add-btn" onClick={handleEditToggle}>
                                                    Edit
                                                </Button>
                                            )}
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Name"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter Name"}
                                                        value={buyerData.name}
                                                        onChange={(e) => handleFieldChange("name", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={3}>
                                                    <InputFieldWithTitle
                                                        title={"Age"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter age"}
                                                        value={buyerData.age}
                                                        onChange={(e) => handleFieldChange("age", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={3}>
                                                    <InputFieldWithTitle
                                                        title={"Blood Group"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter blood group"}
                                                        value={buyerData.blood}
                                                        onChange={(e) => handleFieldChange("blood", e.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Address line 1"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter address"}
                                                        value={buyerData.addressl1}
                                                        onChange={(e) => handleFieldChange("addressl1", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Adrees Line 2"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter Adrees Line 2"}
                                                        value={buyerData.addressl2}
                                                        onChange={(e) => handleFieldChange("addressl2", e.target.value)}
                                                    />
                                                </Grid>


                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"City"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter City"}
                                                        value={buyerData.city}
                                                        onChange={(e) => handleFieldChange("city", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"State"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter State"}
                                                        value={buyerData.state}
                                                        onChange={(e) => handleFieldChange("state", e.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Zip Code"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter ZipCode"}
                                                        value={buyerData.zipCode}
                                                        onChange={(e) => handleFieldChange("zipCode", e.target.value)}
                                                    />
                                                </Grid>


                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Contact"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter Landphone"}
                                                        value={buyerData.contact}
                                                        onChange={(e) => handleFieldChange("contact", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Mobile"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter Mobile Number"}
                                                        value={buyerData.mobile}
                                                        onChange={(e) => handleFieldChange("mobile", e.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Primary Email"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter Email "}
                                                        value={buyerData.pEmail}
                                                        onChange={(e) => handleFieldChange("pEmail", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Secondary Email"}
                                                        disabled={!isEditing}
                                                        placeholder={"Enter Email"}
                                                        value={buyerData.sEmail}
                                                        onChange={(e) => handleFieldChange("sEmail", e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Container>
                                </Box>
                                <Box>
                                    <Container maxWidth="100%" sx={{ marginTop: 4 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                            <h2 class="active-menu">Bank Details</h2>
                                            {isBankEditing ? (
                                                <Button class="floor-image-btn" onClick={handleEditBank}>
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button class="add-btn" onClick={handleEditBank}>
                                                    Edit
                                                </Button>
                                            )}
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Name"}
                                                        disabled={!isBankEditing}
                                                        placeholder={"Enter account holder name"}
                                                        value={bankData.name}
                                                        onChange={(e) => handleBankFieldChange("name", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Account Number"}
                                                        disabled={!isBankEditing}
                                                        placeholder={"Enter acc no"}
                                                        value={bankData.accNo}
                                                        onChange={(e) => handleBankFieldChange("accNo", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"IFSC"}
                                                        disabled={!isBankEditing}
                                                        placeholder={"Enter IFSC Code"}
                                                        value={bankData.ifsc}
                                                        onChange={(e) => handleBankFieldChange("ifsc", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Bank "}
                                                        disabled={!isBankEditing}
                                                        placeholder={"Enter Bank Name"}
                                                        value={bankData.bank}
                                                        onChange={(e) => handleBankFieldChange("bank", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InputFieldWithTitle
                                                        title={"Branch"}
                                                        disabled={!isBankEditing}
                                                        placeholder={"Enter Branch"}
                                                        value={bankData.branch}
                                                        onChange={(e) => handleBankFieldChange("branch", e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Container>
                                </Box>
                            </div>
                        </main>
                    </TabPanel>
                </Tabs>
            </div >
        </div >
    );
};

export default SellerInfoPage;
