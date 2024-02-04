import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

interface Props {
  post:
    | {
        id: string
        date: string
        title: string
        subtitle: string
        link: string
        features: {
          1: string
          2: string
          3: string
          4: string
          5: string
          6: string
          7: string
        }
        description: {
          1: { title: string; desc: string; image: string }
          2: { title: string; desc: string; image: string }
          3: { title: string; desc: string; image: string }
          4: { title: string; desc: string; image: string }
          5: { title: string; desc: string; image: string }
          6: { title: string; desc: string; image: string }
          7: { title: string; desc: string; image: string }
        }
      }
    | undefined
}

export default function BlogId({ post }: Props) {
  return (
    <>
      <div className="space-y-8">
        <h6 className="text-sm text-neutral-500">
          What you&apos;re about to read include:
        </h6>
        <ul className="space-y-4 text-sky-500 list-decimal">
          <li>{post?.features[1]}</li>
          <li>{post?.features[2]}</li>
          <li>{post?.features[3]}</li>
          <li>{post?.features[4]}</li>
          <li>{post?.features[5]}</li>
          <li>{post?.features[6]}</li>
          <li>{post?.features[7]}</li>
        </ul>

        <Separator />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{post?.description[1].title}</h2>
          <p className="text-base leading-7 text-balance tracking-wide">
            <Balancer>{post?.description[1].desc}</Balancer>
          </p>
          {/* <Image
            // @ts-ignore
            src={post?.description[1].image}
            alt="desc image"
            width={2000}
            height={2000}
            className="w-full h-96 sm:h-[40rem] object-cover"
          /> */}
        </div>
      </div>

      <Separator />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{post?.description[2].title}</h2>
        <p className="text-base leading-7 text-balance tracking-wide">
          <Balancer>{post?.description[2].desc}</Balancer>
        </p>
        {/* <Image
          // @ts-ignore
          src={post?.description[2].image}
          alt="desc image"
          width={2000}
          height={2000}
          className="w-full h-96 sm:h-[40rem] object-cover"
        /> */}
      </div>

      <Separator />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{post?.description[3].title}</h2>
        <p className="text-base leading-7 text-balance tracking-wide">
          <Balancer>{post?.description[3].desc}</Balancer>
        </p>
        {/* <Image
          // @ts-ignore
          src={post?.description[3].image}
          alt="desc image"
          width={2000}
          height={2000}
          className="w-full h-96 sm:h-[40rem] object-cover"
        /> */}
      </div>

      <Separator />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{post?.description[4].title}</h2>
        <p className="text-base leading-7 text-balance tracking-wide">
          <Balancer>{post?.description[4].desc}</Balancer>
        </p>
        {/* <Image
          // @ts-ignore
          src={post?.description[3].image}
          alt="desc image"
          width={2000}
          height={2000}
          className="w-full h-96 sm:h-[40rem] object-cover"
        /> */}
      </div>

      <Separator />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{post?.description[5].title}</h2>
        <p className="text-base leading-7 text-balance tracking-wide">
          <Balancer>{post?.description[5].desc}</Balancer>
        </p>
        {/* <Image
          // @ts-ignore
          src={post?.description[3].image}
          alt="desc image"
          width={2000}
          height={2000}
          className="w-full h-96 sm:h-[40rem] object-cover"
        /> */}
      </div>

      <Separator />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{post?.description[6].title}</h2>
        <p className="text-base leading-7 text-balance tracking-wide">
          <Balancer>{post?.description[6].desc}</Balancer>
        </p>
        {/* <Image
          // @ts-ignore
          src={post?.description[3].image}
          alt="desc image"
          width={2000}
          height={2000}
          className="w-full h-96 sm:h-[40rem] object-cover"
        /> */}
      </div>

      <Separator />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{post?.description[7].title}</h2>
        <p className="text-base leading-7 text-balance tracking-wide">
          <Balancer>{post?.description[7].desc}</Balancer>
        </p>
        {/* <Image
          // @ts-ignore
          src={post?.description[3].image}
          alt="desc image"
          width={2000}
          height={2000}
          className="w-full h-96 sm:h-[40rem] object-cover"
        /> */}
      </div>
    </>
  )
}
