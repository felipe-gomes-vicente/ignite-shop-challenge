import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Stripe from "stripe";
import useEmblaCarousel from "embla-carousel-react";

import { stripe } from "../lib/stripe";

import { HomeContainer, Product, SliderContainer } from "../styles/pages/home";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <div style={{ overflow: "hidden", width: "100%" }} >
        <HomeContainer>
          <div className="embla" ref={emblaRef} >
            <SliderContainer className="embla__container container">
              {products.map(product => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  prefetch={false}
                  passHref
                >
                  <Product className="embla__slide">
                    <Image
                      src={product.imageUrl}
                      width={520}
                      height={480}
                      alt=""
                      placeholder="blur"
                      blurDataURL={product.imageUrl}
                    />

                    <footer>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.price}</span>
                      </div>
                    </footer>
                  </Product>
                </Link>
              ))}
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? price.unit_amount / 100 : 0,
    }
  })

  return {
    props: {
      products,
    }
  }
}