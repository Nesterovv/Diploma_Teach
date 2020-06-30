import React, { useState } from 'react';
import styles from './styles.module.css';
import Modal from 'react-modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root')

export function Common() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const getData = async (e) => {
    e.preventDefault();

    const url = `https://reactjs-cdp.herokuapp.com/movies?search=${query}&searchBy=title`;
  

  try {
    const res =  await fetch(url);
    const data = await res.json();
    setMovies (data.data);
  }catch(err){
    console.error(err);
  }
}

       
    return (
        <div>
        <div className={styles.container}>
        <p className={styles.header}>FIND YOUR MOVIE</p>
        <Form inline onSubmit={getData}>
        <FormControl type="text" placeholder="Seacrh film ..." 
        className={styles.search} name="query" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button type='submit' variant="outline-success">Search</Button>
        {/*<input type="text" className={styles.search} placeholder='Seacrh film ...'
         name="query" value={query} onChange={(e) => setQuery(e.target.value)} />
    <Button type='submit'>Search</Button>*/}
        </Form>
        {/*<div className={styles.block_with_filter}>
        <p className={styles.p_elem}>SEARH BY</p>
        <button className={styles.button_searchby}>TITLE</button>
        <button className={styles.button_searchby}>GENRE</button>
        </div>*/}
        </div>
        <div className={styles.block_with_filter_second}>
    <p className={styles.sortby}>{movies.length} movies found</p>
        {/*<div className={styles.sortby}>
        <p className={styles.inline}>Sort by</p>
        <a className={styles.links} rel='stylesheet' href="#"> release date </a>
        <p></p>
        <a className={styles.links} rel='stylesheet' href="#"> rating </a>
      </div>*/}
        </div>
        
        {movies.filter(movie => movie.poster_path).map(movie => {
          return <Card className={styles.cardcontainer} key={movie.id} onClick={() => setmodalIsOpen(true)}>
          <Card.Img variant="top" src={movie.poster_path} alt="Movie" />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
            {movie.release_date} <br/>
            {movie.genres}
            </Card.Text>
          </Card.Body>
          </Card>
        })}
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} style={{overlay:{backgroundColor:'grey'}}}>
            <h3>Films description</h3>
            <div>
            {movies.map(movie =>{
          return <ListGroup key={movie.id} ><ListGroup.Item><div>Film Name:{movie.title}</div>
          <div>Genre:{movie.genres}</div>
          <div>Overview:{movie.overview}</div>
          <div>Budget:{movie.budget}</div>
          <div>Rating:{movie.vote_average}</div>
          </ListGroup.Item>
          </ListGroup>
          })}
          </div>
            <Button variant="primary" size="lg" block onClick={() => setmodalIsOpen(false)}>Close</Button>
            </Modal>
        </div>
        
    );
      
          }


