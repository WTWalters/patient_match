import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntakeFlow } from './screens/IntakeFlow';
import { ProviderReview } from './screens/ProviderReview';
import { Welcome } from './screens/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/intake/*" element={<IntakeFlow />} />
        <Route path="/provider" element={<ProviderReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
