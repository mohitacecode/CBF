import FuseUtils from "@fuse/utils";
import { showMessage } from "app/store/actions/fuse";
import ProfileService from "app/services/profile/ProfileService";

export const GET_PROFILE = "[PROFILE] GET PROFILE";
export const SAVE_PROFILE = "[PROFILE] SAVE PROFILE";
export const SAVE_AVATAR = "[PROFILE] SAVE AVATAR";

export function saveProfile(id, data) {
  return dispatch =>
    ProfileService.updateProfile({
      data: { ...data },
      pathParam: { id: id },
    }).then(response => {
      dispatch(showMessage({ message: "Profile Updated" }));
      return dispatch({
        type: SAVE_PROFILE,
        payload: response.data,
      });
    });
}
export function uploadAvatar(data, id) {
  return dispatch =>
    ProfileService.uploadAvatar({
      data: data,
      formData: true,
      pathParam: { id: id },
    }).then(response => {
      dispatch(showMessage({ message: "Avatar Updated" }));
      return dispatch({
        type: SAVE_AVATAR,
        payload: response.data.user,
      });
    });
}
export function getProfile() {
  return dispatch =>
    ProfileService.getProfile().then(response => {
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    });
}

export function newProfile() {
  const data = {
    id: FuseUtils.generateGUID(),
    name: "",
    handle: "",
    description: "",
    categories: [],
    tags: [],
    images: [],
    priceTaxExcl: 0,
    priceTaxIncl: 0,
    taxRate: 0,
    comparedPrice: 0,
    quantity: 0,
    sku: "",
    width: "",
    height: "",
    depth: "",
    weight: "",
    extraShippingFee: 0,
    active: true,
  };

  return {
    type: GET_PROFILE,
    payload: data,
  };
}
