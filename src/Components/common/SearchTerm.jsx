import { func } from 'prop-types'

const SearchTerm = ({ onSearch, ...rest }) => {
    const onChage = (e) => {
        onSearch(e.target.value)
    }
    return (
        <div>
            <input type="text" onChange={onChage} {...rest} />
        </div>
    )
}
SearchTerm.propTypes = {
    onSearch: func,
}
export default SearchTerm
