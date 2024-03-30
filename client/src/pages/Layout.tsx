import { useState } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

export default function Layout() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleSidebar = () => { setIsOpen((state) => !state) };

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <div className="w-full flex">
                <SideNav isOpen={isOpen} />
                <Outlet />
            </div>
        </>
    )
}
