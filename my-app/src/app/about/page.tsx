import Link from 'next/link'
const getData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("这是异步数据")
      // reject("这是异步数据")
    }, 3000)
  })
}
export default async function About() {
  await getData();
  return <div>about===
    <Link className='block' href="/about/child">child</Link>
    {/* <Link prefetch={false} href={{ pathname: '/home', query: { id: 1 } }} > --home</Link> */}
    <Link className='block' href={{ pathname: '/home', query: { id: 1 } }} > --home</Link>

  </div >;
}