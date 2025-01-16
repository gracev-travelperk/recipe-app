import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Searchbar from './SearchbarComponent';
import { SearchBarProps } from '../types/types';


describe ("Searchbar Component", () => {
    const mockHandleSearch = jest.fn();

    const setup = (searchTerm: string = "") => {
        const props: SearchBarProps = {
            searchTerm,
            handleSearch: mockHandleSearch
        };

        render(<Searchbar {...props} />);
    };

    it("should render the input with the correct placeholder", () => {
        setup();
        const inputElement =  screen.getByPlaceholderText("Search for a recipe");
        expect(inputElement).toBeInTheDocument();
    });

    it("should display the correct value passed as a prop", () => {
        const testValue = "Chocolate Cake";
        setup(testValue);
        const inputElement = screen.getByPlaceholderText("Search for a recipe");
        expect(inputElement).toHaveValue(testValue);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})