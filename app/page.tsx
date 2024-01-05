export default function Home() {
  return (
    <div className={"mx-auto w-[95%]"}>
      <h1 className={"py-5 text-center"}>메인페이지입니다.</h1>
      <div className={"mb-[30px]"}></div>
      <div className={"mb-[30px]"}></div>
      <div className={"mb-[30px]"}></div>
      <div className={"mb-[30px]"}></div>
    </div>
  );
}
function Calendar() {
  return (
    <div className="wrapper">
      <header>
        <div className="nav">
          <button className="material-icons"> chevron_left </button>
          <p className="current-date">September 2022</p>
          <button className="material-icons"> chevron_right </button>
        </div>
      </header>
    </div>
  );
}
