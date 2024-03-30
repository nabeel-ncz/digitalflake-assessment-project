import { useState } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import { useAppSelector } from "../hooks";
import { Outlet } from "react-router-dom";

export default function Layout() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleSidebar = () => { setIsOpen((state) => !state) };

    const theme = useAppSelector((state) => state.common.theme);

    return (
        <>
            <div data-theme={theme === "default" ? "dark" : theme}>
                <Header toggleSidebar={toggleSidebar} />
                <div className="w-full flex">
                    <SideNav isOpen={isOpen} />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
