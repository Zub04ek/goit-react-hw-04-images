import { Component } from "react";
import toast from 'react-hot-toast';
import { Button, Header, Input, SearchForm } from "./Searchbar.styled";
import { BsSearch } from "react-icons/bs";
import PropTypes from 'prop-types';

export class Searchbar extends Component {
    state = {
        searchQuery: '',
    };

    handleChange = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.searchQuery.trim() === '') {
           return toast(`Please enter a word for searching!`, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
        }

        this.props.onSubmit(this.state.searchQuery);
    }

    render() {
        return (
            <Header>
                <SearchForm onSubmit={this.handleSubmit}>
                    <Button type="submit">
                        <BsSearch />
                    </Button>

                    <Input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="searchQuery"
                        value={this.state.searchQuery}
                        onChange={this.handleChange}
                    />
                </SearchForm>
            </Header>
        )
    }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};