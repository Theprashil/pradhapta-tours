import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
function Header(props) {
  return (
    <nav>
      <div className={classes.logo}>Pradhapta Tours</div>

      <div className={classes.headerbtn}>
        <HeaderCartButton onShow={props.onShow} />
      </div>
    </nav>
  );
}

export default Header;
