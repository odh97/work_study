export interface ExpertStoreType {
  state: {
    id: number | null;
    name: string;
    phone: number | null;
    gender: string;
    portfolio: File | null;
    field: string;
    week_work: (string | null)[] | null;
    addressObj: {
      address: string;
      roadAddress: string;
      detailAddress: string;
      mapX: number | null;
      mapY: number | null;
    };
  };
  getInfo: () => void;
  setInfo: (actionPayload: boolean) => void;
  infoAdd: (actionPayload: any) => void;
}
