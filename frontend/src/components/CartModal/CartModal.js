import "./cartmodal.scss";

//Modal to confirm the removal of more than 1 item
const CartModal = ({ cartItem, removeFromCart, closeModal }) => {
  // Confirm removing the items and closing modal when clicking "Ja"
  const handleConfirm = () => {
    removeFromCart(cartItem);
    closeModal();
  };

  //Cancel the action and close the modal when clicking "Nej"
  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <div className="cart-modal">
        <div className="modal-content">
          <p>{`Radera alla produkter "${cartItem.name}"?`}</p>
          <div className="button-section">
            <button onClick={handleConfirm}>Ja</button>
            <button onClick={handleCancel}>Nej</button>
          </div>
        </div>
      </div>
      <div className="cart-modal-backdrop" onClick={handleCancel}></div>
    </>
  );
};
export default CartModal;
