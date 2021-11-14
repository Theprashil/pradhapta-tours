import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

function BackDrop(props) {
  return <div onClick={props.onClose} className={classes.backdrop} />;
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const modal = document.getElementById("modal");

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClick} />, modal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modal
      )}
    </>
  );
}

export default Modal;
