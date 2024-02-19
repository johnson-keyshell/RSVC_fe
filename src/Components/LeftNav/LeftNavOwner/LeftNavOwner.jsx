import '../LeftNav.css'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { React, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {
    FaBars,
    FaUserAlt,
    FaCommentAlt
} from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoDocumentsOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { MdApartment } from "react-icons/md";
import { BiCog, BiHelpCircle, BiBriefcase } from 'react-icons/bi';
import { TbMessages } from 'react-icons/tb';
import { NavLink, useLocation } from 'react-router-dom';

const LeftNavOwner = ({ }) => {
    const { i18n, t } = useTranslation();
    const location = useLocation();
    const isMenuItemActive = (path) => location.pathname.includes(path);
    const [expandedMenu, setExpandedMenu] = useState(null);

    const handleMenuClick = (index) => {
        setExpandedMenu(expandedMenu === index ? null : index);
    };



    const menuItem = [
        {
            path: "/sellers",
            name: t("listing"),
            icon: <MdApartment />
        },
        {
            name: t("enquiries"),
            icon: <TbMessages />,
            submenus: [
                {
                    path: "/seller/chat",
                    name: t("chats"),
                    icon: <TbMessages />,

                },
                {
                    path: "/seller/documents",
                    name: t("documents"),
                    icon: <IoDocumentsOutline />,

                },
                {
                    path: "/seller/myinfo",
                    name: t("myInfo"),
                    icon: <IoInformationCircleOutline />,

                },
            ],
        },
        {
            path: "/seller/agents",
            name: t("agents"),
            icon: <LuUsers />
        },
        {
            path: "/seller/profile",
            name: t("profile"),
            icon: <FaRegCircleUser />
        },
        {
            path: "/help",
            name: t("help"),
            icon: <BiHelpCircle />
        }
    ]
    useEffect(() => {
        // Check if the current location matches any submenu path
        const matchedSubmenuIndex = menuItem.findIndex(
            (item) => item.submenus && item.submenus.some((submenu) => location.pathname.includes(submenu.path))
        );

        if (matchedSubmenuIndex !== -1) {
            setExpandedMenu(matchedSubmenuIndex);
        } else {
            setExpandedMenu(null);
        }
    }, [location.pathname]);

   
    return (


        <TabList className="vertical-tab-list">
            <div className="container">
                {menuItem.map((item, index) => (
                    <div key={index}>
                        <NavLink to={item.path} className={`${(isMenuItemActive(item.path) && expandedMenu !== index )? 'linkselectedmenu' : 'link'} `}
                            onClick={() => handleMenuClick(index)}
                        >
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                        {/* Render submenus if they exist */}
                        {item.submenus && expandedMenu === index && (
                            <div className="submenu-container">
                                {item.submenus.map((submenu, subIndex) => (
                                    <NavLink
                                        key={subIndex}
                                        to={submenu.path}
                                        className={`${isMenuItemActive(submenu.path) ? 'linkselectedmenu' : 'link'}`}
                                        activeClassName="active-leftNav"
                                    >
                                        <div className="icon">{submenu.icon}</div>
                                        <div className="link_text">{submenu.name}</div>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </TabList>


    );
}

export default LeftNavOwner;
