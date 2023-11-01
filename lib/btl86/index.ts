import { TAGS, sqtImages } from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
// import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Leader,
  LeaderMinor,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `http://localhost:3101`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  // headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  // headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'X-Shopify-Storefront-Access-Token': key,
      //   ...headers
      // },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

export async function btl86Fetch<T>({
  apiPath,
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  apiPath: string,
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`${endpoint}/${apiPath}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...(query && { query }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  console.log('[reshapeImages][]', images);
  const flattened = removeEdgesAndNodes(images);

  const result = flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });

  console.log('[reshapeImages]', result);
  return result;
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = false) => {
  console.log('[reshapeProduct][]', product);
  if (!product || filterHiddenProducts) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  const result = {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };

  console.log('[reshapeProduct]', result);
  return result;
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  console.log('[reshapeProducts][]', products);
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  console.log('[reshapedProducts]', reshapedProducts);
  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await btl86Fetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await btl86Fetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await btl86Fetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await btl86Fetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await btl86Fetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await btl86Fetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await btl86Fetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getLeaderDetail({
  label,
  reverse,
  sortKey
}: {
  label: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Leader | undefined> {
  console.log('[getLeaderDetail]', label);
  let result: Leader | undefined;
  return await new Promise((resolve, reject) => {
    result = sqtImages.find((img) => img.id === label);
    // switch (label) {
    //   case 'phan-van-giang':
    //     break;

    //   case 'ngo-xuan-lich':
    //     result = sqtImages.find((img) => img.id === label);
    //     break;
    //   case 'nguyen-tan-cuong':
    //     result = sqtImages.find((img) => img.id === label);
    //     break;

    //   default:
    //     break;
    // }
    resolve(result);
  });
}

export async function getLeaderRelate({
  label,
  reverse,
  sortKey
}: {
  label: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<LeaderMinor[]> {
  console.log('[getLeaderRelate]', label);
  return await new Promise((resolve, reject) => {
    const result: LeaderMinor[] = [
      // {
      //   name: 'Lê Hoàng',
      //   url: '/images/cuccntt/cntt.LeHoang.jpg',
      //   description: 'Le Hoang'
      // },
      // {
      //   name: 'Ngô Văn Sơn',
      //   url: '/images/cuccntt/cntt.NgoVanSon.jpg',
      //   altText: 'Ngo Van Son'
      // },
      // {
      //   name: 'Nguyễn Hồng Tuấn',
      //   url: '/images/cuccntt/cntt.NguyenHongTuan.jpg',
      //   altText: 'Nguyễn Hồng Tuấn'
      // },
      // {
      //   name: 'Phạm Việt Trung',
      //   url: '/images/cuccntt/cntt.PhamVietTrung.jpg',
      //   altText: 'Phạm Việt Trung'
      // }
    ];
    resolve(result);
  });
}

export async function getLeaders({
  label,
  q,
  reverse,
  sortKey
}: {
  label: string | undefined;
  reverse?: boolean;
  q: string | undefined,
  sortKey?: string;
}): Promise<LeaderMinor[]> {
  console.log('[getLeaderRelate]', label);
  // return await new Promise((resolve, reject) => {
  //   const result: LeaderMinor[] = sqtImages;
  //   resolve(result);
  // });
  const res = btl86Fetch<LeaderMinor[]>({
    apiPath: '/public/leaders',
    query: `type=${label}&q=${q}`
  })
  console.log("[getLeaders] res:", res)
  return []
}

export async function getCollections(): Promise<Collection[]> {
  const res = await btl86Fetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await btl86Fetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await btl86Fetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await btl86Fetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await btl86Fetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await btl86Fetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await btl86Fetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  // const topic = headers().get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  // const isCollectionUpdate = collectionWebhooks.includes(topic);
  // const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  // if (!isCollectionUpdate && !isProductUpdate) {
  //   // We don't need to revalidate anything for any other topics.
  //   return NextResponse.json({ status: 200 });
  // }

  // if (isCollectionUpdate) {
  //   revalidateTag(TAGS.collections);
  // }

  // if (isProductUpdate) {
  //   revalidateTag(TAGS.products);
  // }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
