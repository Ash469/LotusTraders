export default function ProductDetails({params}:{params:{productId:string}}) {
    return <h1>Details About the Product {params.productId}</h1>;
  }