import AnnouncementBar from "@/components/UI/AnnouncementBar";
import Navbar from "@/components/UI/Navbar";
import ProductCard from "@/components/ProductCard";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Cart from "@/components/Cart";
import { useState } from "react";
import Footer from "@/components/UI/Footer";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types/product";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: products, isLoading } = useGetProductsQuery();

  const cart = useSelector((state: RootState) => state.cart.items);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="w-full bg-[#f7f3f3] relative">
      <AnnouncementBar />
      <Navbar showCart={showCart} setShowCart={setShowCart} />
      <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto my-5">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={() => handleProductClick(product)} // Pass function to open modal
            />
          ))}
      </div>
      <Footer />
      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
