import { motion } from 'framer-motion';
import ProductList from '../../Components/home/ProductList';
import Footer from '../../Components/Layout/Footer';
const HomePage = () => {
  return (
    <>
      {/* <Header activeHeading={1} /> */}
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -500 }}
        transition={{ duration: 0.5 }}
      >
        {/* <Hero /> */}
        {/* <Categories /> */}
        <ProductList
          title={'Best deal'}
          query={[
            { key: 'featureStatus', operator: '==', value: 'Best Sales' },
          ]}
        />
        <ProductList title={'Popular deal'} />
        {/* <BestDeals />
        <Events />
        <FeaturedProduct />
        <Sponsored /> */}
        <Footer />
      </motion.div>
    </>
  );
};

export default HomePage;
