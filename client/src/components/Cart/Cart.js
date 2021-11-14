import Modal from "../Modals/Modal";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Cart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CartItems from "./CartItems";
import { clearCart } from "../../redux/actions/tourActions";

function Cart(props) {
  const carts = useSelector((state) => state.allTours.carts);
  const dispatch = useDispatch();

  // displaying cart items
  const items = (
    <ul className={classes["cart-items"]}>
      {carts.map(({ payload, quantity }) => (
        <CartItems payload={payload} quantity={quantity} key={payload._id} />
      ))}
    </ul>
  );
  console.log(carts);
  //calcualating total price of the cart
  let total_price = 0;
  for (let i = 0; i < carts.length; i++) {
    total_price += carts[i].quantity * carts[i].payload.price;
  }

  //checking if the cart is empty or not
  const status = carts.length;

  return (
    <>
      {status > 0 ? (
        <Modal onClick={props.onClose}>
          <div className={classes.icons}>
            <CloseIcon onClick={props.onClose} />
          </div>
          {items}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>$ {total_price} </span>
          </div>
          <div className={classes.actions}>
            <button
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear Cart
            </button>
            <button className={classes.order}>Checkout</button>
          </div>
        </Modal>
      ) : (
        <Modal onClick={props.onClose}>
          <h3>Cart Is Empty</h3>
        </Modal>
      )}
    </>
  );
}

export default Cart;
