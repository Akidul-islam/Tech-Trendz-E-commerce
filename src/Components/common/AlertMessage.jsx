/* eslint-disable react/prop-types */
import { useEffect } from "react"
import ReactPortal from "./PortalComponent"
import { useDispatch } from "react-redux"
import { closeMessage } from "../../Redux/features/Auth"

const AlertMessage = ({ title, msg, duration = 3000, variant = 'green' }) => {
    const dispatch = useDispatch()
    // const { isSuccess, isError } = useSelector(state => state.auth)
    useEffect(() => {
        const time = setTimeout(() => {
            dispatch(closeMessage())
        }, duration)
        return () => clearTimeout(time)
    }, [duration, dispatch])


    return (
        <ReactPortal>
            <div style={{ borderColor: variant }} className={` border border-teal-500 bg-white absolute max-w-[400px] w-full top-4 right-20 py-2 px-6 shadow-md rounded-md`}>
                <h1 style={{ color: variant }} className="text-green-700 font-[400] font-Roboto capitalize text-[20px]">{title}</h1>
                <p className="text-gray-900 font-Poppins text-sm">{msg}</p>
            </div>
        </ReactPortal>
    )
}

export default AlertMessage
