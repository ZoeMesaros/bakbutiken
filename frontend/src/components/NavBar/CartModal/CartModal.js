import "./cartmodal.scss";
const CartModal = ({ cartItem, removeFromCart, closeModal }) => {
  const handleConfirm = () => {
    removeFromCart(cartItem);
    closeModal();
  };

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
