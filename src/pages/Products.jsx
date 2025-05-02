
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css"; // CSS for animation

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  useEffect(() => {
    axios.get("http://localhost/product_panel/api/products/get_products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost/product_panel/api/products/update_product/${editingProductId}`, newProduct)
        .then(response => {
          const updatedProducts = products.map(prod =>
            prod.id === editingProductId ? response.data : prod
          );
          setProducts(updatedProducts);
          resetForm();
        })
        .catch(error => console.error("Error updating product:", error));
    } else {
      axios.post("http://localhost/product_panel/api/products/add_product", newProduct)
        .then(response => {
          setProducts([...products, response.data]);
          resetForm();
        })
        .catch(error => console.error("Error adding product:", error));
    }
  };
  
  const resetForm = () => {
    setNewProduct({ name: "", description: "", price: "", image_url: "" });
    setShowForm(false);
    setIsEditing(false);
    setEditingProductId(null);
  };
  

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Products</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add Product</button>
      </div>

      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
          <div className="card h-100">
            <img src={product.image_url} className="card-img-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text"><strong>₹{product.price}</strong></p>
            </div>
            <div className="card-footer d-flex justify-content-end">
            <button
  className="btn btn-outline-secondary"
  onClick={() => {
    setNewProduct(product);
    setEditingProductId(product.id);
    setIsEditing(true);
    setShowForm(true);
  }}
>
  ✏️ Edit
</button>

            </div>
          </div>
        </div>
        
        ))}
      </div>

      {/* Slide-In Form */}
      <div className={`slide-form bg-white position-fixed top-0 end-0 h-100 w-100 ${showForm ? "show" : ""}`}>
        <div className="container h-100 py-5">
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger" onClick={() => setShowForm(false)}>Close ✖</button>
          </div>
          <h3 className="mb-4">{isEditing ? "Edit Product" : "Add New Product"}</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <input type="text" name="name" className="form-control" placeholder="Name" value={newProduct.name} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <textarea name="description" className="form-control" placeholder="Description" value={newProduct.description} onChange={handleInputChange} required></textarea>
            </div>
            <div className="mb-3">
              <input type="number" name="price" className="form-control" placeholder="Price (INR)" value={newProduct.price} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <input type="text" name="image_url" className="form-control" placeholder="Image URL" value={newProduct.image_url} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-success">Save Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
