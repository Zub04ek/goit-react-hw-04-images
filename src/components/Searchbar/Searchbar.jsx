import { useState } from "react";
import { Button, Header, Input, SearchForm } from "./Searchbar.styled";
import { BsSearch } from "react-icons/bs";
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = e => {
        setSearchQuery(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(searchQuery);
    }

        return (
            <Header>
                <SearchForm onSubmit={handleSubmit}>
                    <Button type="submit">
                        <BsSearch />
                    </Button>

                    <Input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="searchQuery"
                        value={searchQuery}
                        onChange={handleChange}
                    />
                </SearchForm>
            </Header>
        )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};