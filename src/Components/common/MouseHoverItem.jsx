import { array } from "prop-types"
import { useSelector } from "react-redux"


const MouseHoverItem = ({ items }) => {
    const { isOpen } = useSelector(state => state.navigation)
    return (
        <article className={`grid gap-2 p-4 absolute left-10 shadow-md rounded-sm duration-200 ease-linear scale-0 opacity-0 ${isOpen && 'scale-100 opacity-100'}`}>
            {
                items && items.map((item) => (<p key={item.title}>{item.title}</p>))
            }
        </article>
    )
}

MouseHoverItem.propTypes = {
    items: array
}

export default MouseHoverItem
