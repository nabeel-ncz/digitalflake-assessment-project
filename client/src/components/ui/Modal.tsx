import { forwardRef, useImperativeHandle, useRef } from "react"

const Modal = forwardRef(({
    heading,
    description,
    actionText,
    actionMethod
}: {
    heading: string;
    description: string;
    actionText: string;
    actionMethod: () => void;
}, ref) => {

    const dialogRef: any = useRef();
    const handleOpen = () => {
        dialogRef?.current?.showModal();
    }
    const handleClose = () => {
        dialogRef?.current?.close();
    }

    useImperativeHandle(ref, () => ({
        open: handleOpen,
        close: handleClose
    }));
    
    return (
        <>
            <dialog ref={dialogRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{heading}</h3>
                    <p className="py-4">{description}</p>
                    <div className="w-full flex justify-end">
                        <button onClick={actionMethod} className="btn btn-primary">{actionText}</button>
                    </div>
                </div>
            </dialog>
        </>
    )
})

export default Modal;