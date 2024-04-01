import { useNavigate, useSearchParams } from "react-router-dom"
import { deleteProductAction, getProductsAction } from "../../store/actions/product";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Modal from "../../components/ui/Modal";
import Loader from "../../components/ui/Loader";

export default function ListProducts() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.product);
    const { data: user } = useAppSelector((state) => state.user);
    const modalRef = useRef({
        open: () => { },
        close: () => { }
    });
    interface Product {
        _id: string;
        name: string;
        categoryRef: {
            _id: string;
            name: string;
            description: string;
        }
        description: string;
        status: string;
        size: string;
        price: string;
        image: string;
    }
    const [products, setProducts] = useState<Product[] | null | undefined>(null);
    const [pageAvailable, setPageAvailable] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [query, setQuery] = useSearchParams();
    const [deleteObj, setDeleteObj] = useState<{ name: string; id: string; } | null>(null);

    useEffect(() => {
        handleFetchData();
        setQuery({ page: "1" });
    }, []);

    useEffect(() => {
        setProducts(data);
        if (data && data?.length < 5) {
            setPageAvailable(false);
        } else if (data && data?.length === 5) {
            setPageAvailable(true);
        }
    }, [loading])

    const handleFetchData = (page?: number, limit?: number) => {
        dispatch(getProductsAction({
            userId: user?._id ?? "",
            page: page ?? 1,
            limit: limit ?? 5
        }));
    }

    const handleOpen = (obj: { name: string; id: string }) => {
        setDeleteObj(obj);
        modalRef?.current.open();
    }

    const handleClose = () => {
        modalRef?.current.close();
        setDeleteObj(null);
    }

    const handleDelete = (id: string) => {
        dispatch(deleteProductAction({ _id: id })).then(() => {
            handleFetchData();
            handleClose();
        });
    };

    const navigateToCreate = () => {
        navigate("create");
    }

    const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
        setSearch(evt.target.value);
        const filtered = data?.filter((item) => item.name?.toLowerCase().includes(evt.target.value.toLowerCase()));
        setProducts(filtered);
    }

    const handlePrev = () => {
        const page = Number(query.get("page"));
        if (page > 1) {
            handleFetchData(page - 1);
            setQuery({ page: (page - 1).toString() });
        }
    }

    const handleNext = () => {
        const page = Number(query.get("page"));
        console.log(page, pageAvailable)
        if (pageAvailable) {
            handleFetchData(page + 1, 5);
            setQuery({ page: (page + 1).toString() });
        }
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className='w-full py-2 px-12 flex items-center justify-between'>
                <h2 className='font-bold'>Products</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <input value={search} onChange={handleSearch} type="text" className="grow min-w-80" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <button
                    onClick={navigateToCreate}
                    className="btn">Add New</button>
            </div>
            {loading && <Loader />}
            {(!loading && data?.length === 0) && (
                <h2 className="font-bold mt-2 text-center">No Products found!</h2>
            )}
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
                    {!loading && products?.map((item) => (
                        <>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td className="max-w-md">
                                    {item._id}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div className="max-w-[16rem]">
                                            <div className="font-bold">{item.name}</div>
                                            <div className="text-sm opacity-50 line-clamp-1">{item.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {!item.categoryRef ?
                                        (<span className={`badge badge-ghost badge-sm bg-red-800`}>Deleted</span>) :
                                        item.categoryRef?.name
                                    }
                                </td>
                                <td>
                                    <span className={`badge badge-ghost badge-sm`}>{item.size} KG</span>
                                </td>
                                <td>
                                    <span className={`badge badge-ghost badge-sm`}>₹.{item.price}</span>
                                </td>
                                <td>
                                    <span className={`badge badge-ghost badge-sm ${item.status == 'active' ? "text-green-800" : "text-red-800"}`}>{item.status}</span>
                                </td>
                                <th className="max-w-lg min-w-[12rem]">
                                    <button
                                        onClick={() => { navigate(`update/${item._id}`) }}
                                        className="btn btn-ghost btn-xs bg-yellow-600 text-primary-content mr-2">edit</button>
                                    <button
                                        onClick={() => { handleOpen({ name: item.name, id: item._id }); }}
                                        className="btn btn-ghost btn-xs bg-red-700 text-slate-50">delete</button>
                                </th>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <div className='w-full py-2 px-12 flex items-center justify-end gap-2'>
                <button onClick={handlePrev} className="btn" disabled={Number(query.get("page")) === 1 ? true : false}>Prev</button>
                <button onClick={handleNext} className="btn" disabled={!pageAvailable}>Next</button>
            </div>
            <Modal
                heading={deleteObj?.name ?? ""}
                description="Are your sure, you want delete this category"
                actionText="Delete"
                actionMethod={() => { handleDelete(deleteObj?.id ?? "") }}
                ref={modalRef}
            />
        </div>
    )
}
