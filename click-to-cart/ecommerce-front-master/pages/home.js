// pages/home.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header'; // Adjust the path based on your project structure

import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function Home({featuredProduct,newProducts}) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") == true;
    if (isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      {/* <h2>CLICK-TO-CART</h2>
      <p>Welcome to the home page!</p> */}
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
    const featuredProductId = '666351c87670b9e589b19a3f';
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      },
    };
  }
