import { useState } from "react";
import toast from 'react-hot-toast';
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

        if (searchQuery.trim() === '') {
           return toast(`Please enter a word for searching!`, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
        }

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