import React, { useState } from 'react'
import cls from './Search.module.css'

const Search = ({ onChange }) => {
    const [inputValue, setInputValue] = useState < string > ''

    const handleSearchQuery = (e) => {
        e.preventDefault()
        onChange(inputValue)
    }

    return (
        <div className={cls.sidebar__search}>
            <div className={cls.search__bar}>
                <form onSubmit={handleSearchQuery} action="">
                    <input
                        type="search"
                        name=""
                        id=""
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search for users"
                    />
                </form>
            </div>
        </div>
    )
}

export default Search
