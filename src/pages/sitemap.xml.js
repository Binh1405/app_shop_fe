import {getServerSideSiteMap} from "next-sitemap"
import { getAllProductsPublic } from 'src/services/product'


export const getServerSideProps = async (context) => {
    const {req, res} = context

    const allProducts = []
    await getAllProductsPublic({limit: -1, page: -1}).then((res) => {
        const data = res?.data?.products
        data?.map((item) => {
            allProducts.push(item.slug)
        })
    })

    const productUrls = allProducts.map((slug) => ({
        loc: `https://app-shop-fe.vercel.app/product/${slug}`,
        lastMod: new Date().toISOString(),
        priority: 0.9,
    }))

    const homeUrl = {
        loc: "https://app-shop-fe.vercel.app/home",
        lastMod: new Date().toISOString(),
        priority: 0.9,
    }

    const urls = [homeUrl,...productUrls]

    return getServerSideSiteMap(req, res, urls)
}

const SiteMap = () => null
export default SiteMap