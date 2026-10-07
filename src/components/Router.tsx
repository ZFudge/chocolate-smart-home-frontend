import { Route, Routes } from 'react-router-dom';
import { LeonardoPage, NeoPixelsPage, NotFoundPage, OnOffPage, TabsPage } from '../pages';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<TabsPage />} />
      <Route path="/neo_pixel" element={<NeoPixelsPage />} />
      <Route path="/on_off" element={<OnOffPage />} />
      <Route path="/leonardo" element={<LeonardoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
