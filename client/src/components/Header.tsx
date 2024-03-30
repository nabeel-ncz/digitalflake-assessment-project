import { IoMenu } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "../store/reducers/common";

export default function Header({
    toggleSidebar
}: {
    toggleSidebar: () => void;
}) {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.common.theme);
    const handleChangeTheme = (theme: string) => {
        dispatch(changeTheme(theme));
    }

    return (
        <div className="w-full flex items-center justify-between bg-primary py-4 lg:px-24 px-2 md:px-6">
            <div className="flex items-center justify-center gap-2">
                <span onClick={toggleSidebar} className="bg-base-100 rounded px-2 py-1 cursor-pointer">
                    <IoMenu size={25} />
                </span>
                <img src="logo.png" alt="" className="h-5 md:h-6" />
            </div>
            <div className="flex items-center justify-center gap-2">
                <div className="dropdown hidden md:inline-block">
                    <div tabIndex={0} role="button" className="btn m-1 text-xs min-h-10 h-10">
                        {theme === "default" && "Theme (default)"}
                        {theme === "autumn" && "Theme (light)"}
                        {theme === "dark" && "Theme (dark)"}
                    </div>
                    <ul tabIndex={0} className="dropdown-content -left-16 z-[1] menu p-1 md:p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => { handleChangeTheme("default") }} className="hover:bg-gray-500 cursor-pointer">Theme (default)</li>
                        <li onClick={() => { handleChangeTheme("autumn") }} className="hover:bg-gray-500 cursor-pointer">Light </li>
                        <li onClick={() => { handleChangeTheme("dark") }} className="hover:bg-gray-500 cursor-pointer">Dark </li>
                    </ul>
                </div>
                <div className="avatar cursor-pointer">
                    <div className="w-12 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
        </div>
    )
}
