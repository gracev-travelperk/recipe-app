import { SearchBarProps } from "../types/types"

export default function Searchbar({searchTerm, handleSearch }:SearchBarProps) {
    return (
        <input type="text" placeholder="Search for a recipe" onChange={handleSearch} value={searchTerm}/>
    )
}