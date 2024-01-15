export default function Page({ params }: { params: { productId: string } }) {
  return <div className="">{params.productId}</div>
}
