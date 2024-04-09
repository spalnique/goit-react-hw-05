import css from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const input = e.target.elements.search.value.trim();

    if (!input) return;
    onSubmit(input);
    e.target.reset();
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <input
        className={css.searchInput}
        type="text"
        name="search"
        placeholder="You know what to do ;)"
        autoFocus
      />
      <button className={css.searchButton} type="submit" name="button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
