
import { Route,Routes } from "react-router-dom";
import SignUpForm from "./Pages/SignUpForm";
import LoginForm from "./Pages/LoginForm";
import ExpenseForm from "./Pages/ExpenseForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Signup" element={<SignUpForm />} />
      <Route path="/AddExpense" element={<ExpenseForm/>} />
    </Routes>
  );
}

export default App;
