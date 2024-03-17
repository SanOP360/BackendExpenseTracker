
import { Route,Routes } from "react-router-dom";
import SignUpForm from "./Pages/SignUpForm";
import LoginForm from "./Pages/LoginForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm/>} />
      <Route path="/Signup" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
