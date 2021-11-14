import { useDispatch } from "react-redux";
import classes from "./CartItems.module.css";
import { addToCart, removeFromCart } from "../../redux/actions/tourActions";

function CartItems({ payload, quantity }) {
  const dispatch = useDispatch();

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h3>{payload.name}</h3>

        <div className={classes.summary}>
          <span className={classes.price}>${payload.price * quantity}</span>
          <span className={classes.amount}> x{quantity}</span>
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={() => dispatch(addToCart(payload))}>+</button>
        <button onClick={() => dispatch(removeFromCart(payload))}>-</button>
      </div>
    </li>
  );
}

export default CartItems;
