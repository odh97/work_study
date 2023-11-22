import { BasicInfo, AddressInfo } from "@/app/(project)/profile/basicInfo";

export default function Profile() {
  return (
    <div className={"pb-[300px] md:container md:mx-auto"}>
      <h2 className={"mb-1 text-center text-2xl"}>필수 정보 입력해주세요</h2>
      <p className={"text-center text-lg"}>
        필수정보는 로톡에서 변호사로 활동하기 위해 필수로 입력해야하는
        정보입니다. 입력 단계가 100%가 되어야 의뢰인에게 변호사프로필이
        노출됩니다.
      </p>
      <ul className={"mt-10 flex"}>
        <li className={"w-1/3 cursor-pointer bg-amber-300 hover:text-blue-700"}>
          기본정보
        </li>
        <li className={"w-1/3 bg-amber-500 text-center text-xl"}>인적사항</li>
        <li className={"w-1/3 bg-amber-300 text-center text-xl"}>학력사항</li>
      </ul>
      <BasicInfo />
      <AddressInfo />
      <button className={"mt-3 rounded-xl bg-sky-500 px-10 py-5 text-white"}>
        전문가 설정 완료
      </button>
    </div>
  );
}
