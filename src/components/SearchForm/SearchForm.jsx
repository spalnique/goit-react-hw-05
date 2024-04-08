const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements.search.value);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" autoFocus />
    </form>
  );
};

export default SearchForm;
