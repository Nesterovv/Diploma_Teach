const filmsLoaded = (newFilms) => {
    return{
        type:'FILMS_LOADED',
        payload: newFilms
    };
};

export {
    filmsLoaded
};