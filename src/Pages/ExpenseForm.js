import axios from "axios";
import "./Expense.css";
import { useEffect, useRef, useState } from "react";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const reloadExpenses = () => {
    const token = localStorage.getItem("jwttoken");
    if (!token) {
      console.error("No token found.");
      return;
    }

    axios
      .get("http://localhost:5000/Expense/add-expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    reloadExpenses();
  }, []);

  const submitExpenses = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwttoken");
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    axios
      .post(
        "http://localhost:5000/Expense/add-expense",
        {
          price,
          description,
          categories: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        reloadExpenses();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteExpense = (expenseId) => {
    axios
      .delete(`http://localhost:5000/Expense/delete-expense/${expenseId}`)
      .then((response) => {
        console.log(response);
        reloadExpenses();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const buyPremiumHandler = async (e) => {
    try {
      const token = localStorage.getItem("jwttoken");
      const response = await axios.post(
        `http://localhost:5000/purchase/payment`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response data is", response.data);

      const options = {
        key: response.data.key,
        order_id: response.data.order_id,
        handler: async function (response) {
          console.log(response);
          try {
            const successResponse = await axios.post(
              "http://localhost:5000/purchase/success",
              {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(successResponse);
            if (successResponse.data.success) {
              alert("Payment successful & you are premium user");
              console.log(successResponse);
              localStorage.setItem("premium", true);
              document.getElementById("premium-button").remove();
            } else {
              alert("Payment failed");
            }
          } catch (error) {
            console.log(error);
            alert("Payment failed");
          }
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment failed", async function (response) {
        console.log(response.error);
        alert("Payment failed");

        try {
          const failResponse = await axios.post(
            "http://localhost:5000/purchase/failed",
            {
              payment_id: response.error.metadata.payment_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(failResponse);
        } catch (error) {
          console.log(error);
        }
      });
      rzp1.open();

      e.preventDefault();
    } catch (error) {
      console.error(error);
      alert("Internal Server Error: " + error.response.data.msg);
    }
  };


  return (
    <div className="expense-form">
      <button className="buyPrem" onClick={buyPremiumHandler}>
        Buy Premium
      </button>
      <h1>Add Your Expenses here</h1>
      <form onSubmit={submitExpenses}>
        <div className="subform">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            ref={priceRef}
            name="price"
            id="price"
            className="input-field"
          />
        </div>
        <div className="subform">
          <label htmlFor="description">Description of the Expense</label>
          <input
            type="text"
            ref={descriptionRef}
            name="description"
            id="description"
            className="input-field"
          />
        </div>
        <div className="subform">
          <label htmlFor="categories">Category</label>
          <select
            ref={categoryRef}
            name="categories"
            id="categories"
            className="select-field"
          >
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="rent">Rent</option>
            <option value="loan">Loan</option>
          </select>
        </div>
        <button type="submit" className="expense-btn">
          Done
        </button>
      </form>

      <div className="expense-list">
        <h2>Expense List</h2>
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <p>Price: ${expense.price}</p>
            <p>Description: {expense.description}</p>
            <p>Category: {expense.categories}</p>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseForm;
