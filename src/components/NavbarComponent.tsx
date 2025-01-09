import Searchbar from "./SearchbarComponent";
import { NavbarProps } from "../types/types";

export default function Navbar({
  searchTerm,
  handleSearch,
  showForm,
  setShowForm,
}: NavbarProps) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Recipe App</h1>
          <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            onClick={() => setShowForm(!showForm)}
            className="add-recipe-btn"
          >
            {showForm ? "Close" : "Add New Recipe"}
          </button>
        </div>
      </nav>
    </>
  );
}
