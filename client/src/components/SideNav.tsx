import { TbBox } from "react-icons/tb";
import { TbHome } from "react-icons/tb";
import { TbCategory } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export default function SideNav({
    isOpen
}: {
    isOpen: boolean
}) {

    return (
        <>
            <div className={`${isOpen ? 'w-60' : 'w-[5.5rem]'} bg-base-200 min-h-[88vh] transition-all`}>
                <div className="px-4 py-12">
                    <div className="flex flex-col items-start gap-4">
                        <NavLink to={"/"} className={({ isActive }) => isActive ? "bg-primary text-white w-full rounded" : "bg-base-100 w-full rounded"}>
                            <div className="cursor-pointer w-full rounded flex gap-4 items-center justify-start py-2 px-4">
                                <TbHome size={25} />
                                {isOpen && (
                                    <span >Home</span>
                                )}
                            </div>
                        </NavLink>
                        <NavLink to={"/categories"} className={({ isActive }) => isActive ? "bg-primary text-white w-full rounded" : "bg-base-100 w-full rounded"}>
                            <div className="cursor-pointer w-full rounded flex gap-4 items-center justify-start py-2 px-4">
                                <TbCategory size={25} />
                                {isOpen && (
                                    <span>Categories</span>
                                )}
                            </div>
                        </NavLink>
                        <NavLink to={"/products"} className={({ isActive }) => isActive ? "bg-primary text-white w-full rounded" : "bg-base-100 w-full rounded"}>
                            <div className="cursor-pointer w-full rounded flex gap-4 items-center justify-start py-2 px-4">
                                <TbBox size={25} />
                                {isOpen && (
                                    <span>Products</span>
                                )}
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
