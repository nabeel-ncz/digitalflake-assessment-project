import { useNavigate } from "react-router-dom"

export default function ListProducts() {

    const navigate = useNavigate();

    return (
        <div className="w-full overflow-x-auto">
            <div className='w-full py-2 px-12 flex items-center justify-between'>
                <h2 className='font-bold'>Products</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow min-w-80" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <button
                    onClick={() => { navigate("create") }}
                    className="btn">Add New</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <td className="max-w-md">
                            kuneoolloieowjfklsowelkrle
                        </td>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                    <div className="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            fjksfkelslejf
                        </td>
                        <td>
                            <span className={`badge badge-ghost badge-sm`}>5 KG</span>
                        </td>
                        <td>
                            <span className={`badge badge-ghost badge-sm`}>₹.100</span>
                        </td>
                        <td>
                            <span className={`badge badge-ghost badge-sm text-green-800`}>Active</span>
                        </td>
                        <th className="max-w-lg min-w-[12rem]">
                            <button
                                // onClick={() => { navigate(`update/${item._id}`) }}
                                className="btn btn-ghost btn-xs bg-yellow-600 text-primary-content mr-2">edit</button>
                            <button
                                // onClick={handleOpen}
                                className="btn btn-ghost btn-xs bg-red-700 text-slate-50">delete</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
