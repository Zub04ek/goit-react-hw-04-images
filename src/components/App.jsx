import { Component } from "react";
import { Toaster } from 'react-hot-toast';
import { Container } from "./Container.styled";
import { GlobalStyles } from "./Global.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  }

  render() {
    return (
    <Container>
        <GlobalStyles />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
    </Container>
  );
  }
};
