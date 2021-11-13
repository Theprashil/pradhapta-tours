import classes from "./HeaderCartButton.module.css";
import HeaderCartIcon from "./HeaderCartIcon";

function HeaderCartButton() {
  return (
    <>
      <button className={classes.btn}>
        <span className={classes.badge}> 0 Item</span>
        <span className={classes.icon}>
          <HeaderCartIcon />
        </span>
      </button>
    </>
  );
}

export default HeaderCartButton;
