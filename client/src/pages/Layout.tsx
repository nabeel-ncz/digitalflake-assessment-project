import { useState } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import { useAppSelector } from "../hooks";

export default function Layout() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleSidebar = () => { setIsOpen((state) => !state) };

    const theme = useAppSelector((state) => state.common.theme);

    return (
        <>
            <div data-theme={theme === "default" ? "dark" : theme}>
                <Header toggleSidebar={toggleSidebar} />
                <SideNav isOpen={isOpen} />
            </div>
        </>
    )
}
