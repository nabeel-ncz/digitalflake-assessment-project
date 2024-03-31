import { useEffect, useRef } from "react";
import Modal from "../../components/ui/Modal";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteCategoryAction, getCategoriesAction } from "../../store/actions/category";
import Loader from "../../components/ui/Loader";

export default function ListCategories() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.category);
    const { data: user } = useAppSelector((state) => state.user);
    const modalRef = useRef({
        open: () => { },
        close: () => { }
    });

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = (page?: number, limit?: number) => {
        dispatch(getCategoriesAction({
            userId: user?._id ?? "",
            page: page ?? 1,
            limit: limit ?? 5
        }));
    }

    const handleOpen = () => {
        modalRef?.current.open();
    }

    const handleClose = () => {
        modalRef?.current.close();
    }

    const handleDelete = (id: string) => {
        dispatch(deleteCategoryAction({ _id: id })).then(() => {
            handleFetchData();
            handleClose();
        });
    };

    const navigateToCreate = () => {
        navigate("create");
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className='w-full py-2 px-12 flex items-center justify-between'>
                <h2 className='font-bold'>Categories</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow min-w-80" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <button onClick={navigateToCreate} className="btn">Add New</button>
            </div>
            {loading && <Loader />}
            {(!loading && data?.length === 0) && (
                <h2 className="font-bold mt-2 text-center">No Categories found!</h2>
            )}
            <table className="table">
                {(!loading && data?.length !== 0) && (
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                )}
                <tbody>

                    {data?.map((item: {
                        _id: string;
                        name: string;
                        description: string;
                        status: string;
                    }) => (
                        <>

                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>{item._id}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="max-w-md min-w-[24rem]">
                                    {item.description}
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">{item.status}</span>
                                </td>
                                <th className="max-w-lg min-w-[12rem]">
                                    <button
                                        onClick={() => { navigate(`update/${item._id}`) }}
                                        className="btn btn-ghost btn-xs bg-yellow-600 text-primary-content mr-2">edit</button>
                                    <button onClick={handleOpen} className="btn btn-ghost btn-xs bg-red-700 text-slate-50">delete</button>
                                </th>
                            </tr>
                            <Modal
                                heading={item.name}
                                description="Are your sure, you want delete this product"
                                actionText="Delete"
                                actionMethod={() => { handleDelete(item._id) }}
                                ref={modalRef}
                            />
                        </>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
