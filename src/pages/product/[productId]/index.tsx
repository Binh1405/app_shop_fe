// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import { getDetailsProductPublicBySlug, getListRelatedProductBySlug } from 'src/services/product'
import { TProduct } from 'src/types/product'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import DetailsProductPage from 'src/views/pages/product/DetailsProduct'

type TProps = {
  productData: TProduct
  listRelatedProduct: TProduct[]
}

const Index: NextPage<TProps> = ({productData,listRelatedProduct}) => {
  return <DetailsProductPage productData={productData} productsRelated={listRelatedProduct} />
}

export default Index

Index.guestGuard = false
Index.authGuard = false
Index.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>

export async function getServerSideProps(context: any) {

  try {
    const slugId = context.query?.productId
    const res = await getDetailsProductPublicBySlug(
      slugId, true
    )
    const resRelated = await getListRelatedProductBySlug({ params: { slug: slugId } })

    const productData = res?.data
    const listRelatedProduct =resRelated?.data

    if(!productData?._id) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        productData: productData,
        listRelatedProduct
      }
    }
  } catch (error) {
    return {
      props: {
        productData: {},
        listRelatedProduct: []
      }
    }
  }
}
