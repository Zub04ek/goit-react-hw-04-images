import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Container } from "./Container.styled";
import { GlobalStyles } from "./Global.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "components/LoadMoreBtn/LoadMoreBtn";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { fetchImages, limit } from "helpers/api";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  const handleSubmit = newSearchQuery => {
    if (newSearchQuery.trim() === '') {
      setPictures([]);
      toast(`Please enter a word for searching!`, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setPage(1);
      setPictures([]);
      setTotalImages(0);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    const fetchPictures = async () => {
      setLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(searchQuery.trim(), page);

        if (hits.length === 0) {
          setLoading(false);
          setPictures([]);
          setTotalImages(0);
          return toast.error(`Nothing found for ${searchQuery}!`);
        };

        setPictures(prevPictures => [...prevPictures, ...hits]);
        setLoading(false);
        setTotalImages(totalHits);

      } catch (err) {
        console.log(err);
      };
    }
    fetchPictures();
  }, [searchQuery, page]);

  const hasMorePages = useMemo(() => {
    const totalPages = totalImages / limit;
    const restTotalPages = pictures.length / limit;
    return totalPages > restTotalPages;
  }, [pictures, totalImages]);
  
  const handleLoad = () => {
    setPage(page => page + 1 );
  }
  
  const openModal = (e) => {
    setShowModal(showModal => !showModal);
    setLargeImg( e.currentTarget.alt);
  }

  const closeModal = () => {
    setShowModal(showModal => !showModal);
  }

    return (
    <Container>
        <GlobalStyles />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery pictures={pictures} openModal={openModal} />
        {showModal &&
                    <Modal onClose={closeModal}>
                        <img src={largeImg} alt={largeImg} width="800" />
                    </Modal>
                }
        {loading && <Loader />}
        {hasMorePages && totalImages > limit && <Button onClick={handleLoad}/>}
    </Container>
  );
};
