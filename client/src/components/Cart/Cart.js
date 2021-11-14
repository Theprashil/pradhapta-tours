import Modal from "../Modals/Modal";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import CloseIcon from "@mui/icons-material/Close";

function Cart(props) {
  const carts = useSelector((state) => state.allTours.carts);

  //checking if the cart is empty or not
  const status = carts.length;

  return (
    <>
      {status > 0 ? (
        <Modal onClick={props.onClose}>
          <div className={classes.icons}>
            <CloseIcon onClick={props.onClose} />
          </div>
          {/* {items} */}
          <div className={classes.total}>
            <span>Total Amount</span>
            {/* <span>$ {total_price} </span> */}
          </div>
          <div className={classes.actions}>
            <button> Clear Cart</button>
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
