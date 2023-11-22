import { create } from  'zustand'

type  CartStore = {
    cart : number ,
    add : () =>  void ,
    delete : () =>  void ,
    RemoveAll : () =>  void
 }

내보내기  const useCartStore = create< CartStore >( ( 설정 ) => ({
    장바구니 : 0 ,
    추가 : () =>  설정 ( ( 상태 ) => ({ 장바구니 : 상태. 카트 + 1 })),
    제거 : () =>  설정 ( ( 상태 ) => ( { 장바구니 : state.cart - 1 } )),
    RemoveAll : () =>  설정 ({ 장바구니 : 0 }),
}));