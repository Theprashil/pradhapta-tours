import classes from "./HeaderCartButton.module.css";
import HeaderCartIcon from "./HeaderCartIcon";
import { useSelector } from "react-redux";

function HeaderCartButton(props) {
  const tours = useSelector((state) => state.allTours.carts);
  return (
    <>
      <button className={classes.btn} onClick={props.onShow}>
        <span className={classes.badge}> {tours.length} Item</span>
        <span className={classes.icon}>
          <HeaderCartIcon />
        </span>
      </button>
    </>
  );
}

export default HeaderCartButton;
