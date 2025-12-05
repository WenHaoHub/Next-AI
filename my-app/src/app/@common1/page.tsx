const getData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("这是异步数据")
      // reject("这是异步数据")
    }, 3000)
  })
}
export default async function Common1() {
  await getData();
    return (
        <div>
            common1
        </div>
    )
}
