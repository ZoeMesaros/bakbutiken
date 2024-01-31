import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import sv from "date-fns/locale/sv";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useOrderFetch from "../../customHooks/fetchOrders";
import useProductFetch from "../../customHooks/fetchProducts";
import OrderDetailsModal from "../../components/OrderModal/OrderModal";
import useAuth from "../../customHooks/useAuth";
import "./admin.scss";

// Admin page
const AdminPage = () => {
  // Call useOrderFetch to recieve orders and loading data
  const { orders, loading } = useOrderFetch();

  // Call the useProductFetch to recieve products and loading data
  const { products, loading: productsLoading } = useProductFetch();

  //Call the useAuth to handle logout
  const { logout } = useAuth();

  //State to track wich order has been selected
  const [selectedOrder, setSelectedOrder] = useState(null);

  //State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Navigate to login page after successful logout
  const navigate = useNavigate();

  // Handle log out and navigate to the login page
  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  // When clicking on an order, show the modal
  const handleDetailsClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // When closing the details modal, reset the selectedOrder state
  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  // Render loadingspinner component during loading
  if (loading || productsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="d-flex justify-content-end">
          <button onClick={handleLogoutClick} className="btn btn-danger m-5">
            Logga ut
          </button>
        </div>
        <div className="row mx-5">
          <div className="col">
            <div>
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="row no-gutters border-top cart-item"
                >
                  <div className="row main align-items-center p-3">
                    <div className="col-md-4">
                      <div className="row text-muted">Beställningsnummer</div>
                      <div className="row text-muted">{order.orderNumber}</div>
                    </div>
                    <div className="col-md-4">
                      <div className="row text-muted">Datum</div>
                      <div className="row text-muted">
                        {/* Format the date */}
                        {format(new Date(order.orderDate), "yyyy-MM-dd", {
                          locale: sv,
                        })}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="row text-muted">Totalt</div>
                      <div className="row text-muted">
                        {order.totalAmount} kr
                      </div>
                    </div>
                    <div className="col-md-1 ">
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleDetailsClick(order)}
                      >
                        Detaljer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          show={showModal}
          onHide={handleCloseModal}
          order={selectedOrder}
          products={products}
        />
      )}
    </div>
  );
};

export default AdminPage;
