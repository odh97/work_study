export default async function Page() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  // throw Error("Error");

  return <div>Hello 페이지</div>;
}
