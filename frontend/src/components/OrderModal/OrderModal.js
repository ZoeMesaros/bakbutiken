import React from "react";
import { Modal, Button } from "react-bootstrap";
import { format } from "date-fns";
import sv from "date-fns/locale/sv";

// Modal to show order information details
const OrderDetailsModal = ({ show, onHide, order, products }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detaljer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="order-details-section">
          <h5>Beställning</h5>
          <p>Ordernummer: {order.orderNumber}</p>
          <p>
            {/* Formatting date */}
            Datum:{" "}
            {format(new Date(order.orderDate), "yyyy-MM-dd", {
              locale: sv,
            })}
          </p>
          <p>Fraktalternativ: {order.shipping_method}</p>
          <p>Betalalternativ: {order.payment_method}</p>
          <p>Totalt: {order.totalAmount} kr</p>
        </div>
        <br></br>
        <div className="personal-info-section">
          <h5>Personlig information</h5>
          <p>Förnamn: {order.first_name}</p>
          <p>Efternamn: {order.last_name}</p>
          <p>Adress: {order.address}</p>
          <p>Postnummer: {order.postal}</p>
          <p>Ort: {order.area}</p>
          {order.phone && <p>Telefon: {order.phone}</p>}
        </div>
        <br></br>
        <div className="ordered-items-section">
          <h5>Produkter</h5>
          <p>Beställda Produkter</p>
          {/*    Map though products and display product name and details */}
          {order.items.map((item) => {
            const product = products.find((p) => p._id === item._id);
            return (
              <div key={item._id}>
                {product && (
                  <>
                    <p>Produktnamn: {product.name}</p>
                    <p>Antal: {item.quantity}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Stäng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
