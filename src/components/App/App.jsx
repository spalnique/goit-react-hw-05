import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import { fetchTrending } from '../../service/api';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<p>homepage</p>} />
          <Route path="/hello" element={<p>hello page</p>} />
          <Route path="/world" element={<p>world page</p>} />
          <Route path="*" element={<p>not found</p>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
