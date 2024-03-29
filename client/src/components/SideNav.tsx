import { TbBox } from "react-icons/tb";
import { TbHome } from "react-icons/tb";
import { TbCategory } from "react-icons/tb";
import { useAppSelector } from "../hooks";

export default function SideNav({
    isOpen
}: {
    isOpen: boolean
}) {
    const theme = useAppSelector((state) => state.common.theme);

    return (
        <>
            <div className={`${isOpen ? 'w-60' : 'w-[5.5rem]'} bg-base-200 min-h-[88vh]`}>
                <div className="px-4 py-12">
                    <div className="flex flex-col items-start gap-4">
                        <div className="bg-primary w-full rounded flex gap-4 items-center justify-start py-2 px-4">
                            <TbHome color="#f2f2f2" size={25} />
                            {isOpen && (
                                <span className="text-white">Home</span>
                            )}
                        </div>
                        <div className="bg-base-100 w-full rounded flex gap-4 items-center justify-start py-2 px-4">
                            {(theme === "default" || theme === "dark") && (
                                <TbCategory color="#f2f2f2" size={25} />
                            )}
                            {theme === "autumn" && (
                                <TbCategory color="#000" size={25} />
                            )}
                            {isOpen && (
                                <span>Categories</span>
                            )}
                        </div>
                        <div className="bg-base-100 w-full rounded flex gap-4 items-center justify-start py-2 px-4">
                            {(theme === "default" || theme === "dark") && (
                                <TbBox color="#f2f2f2" size={25} />
                            )}
                            {theme === "autumn" && (
                                <TbBox color="#000" size={25} />
                            )}
                            {isOpen && (
                                <span>Products</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
