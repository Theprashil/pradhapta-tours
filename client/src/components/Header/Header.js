import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
function Header() {
  return (
    <nav>
      <div className={classes.logo}>Pradhapta Tours</div>

      <div className={classes.headerbtn}>
        <HeaderCartButton />
      </div>
    </nav>
  );
}

export default Header;
