import NavConfig from "app/nav-config";
import logoutUser from "app/main/logout/index";
const navigationConfig = [
  ...NavConfig,
  {
    id: "user",
    title: "User",
    type: "group",
    icon: "account_circle",
    children: [
      {
        id: "logout",
        title: "Logout",
        type: "item",
        icon: "exit_to_app",
        onClick: () => logoutUser(),
        //url: "/logout"
      },
      {
        id: "update_profile",
        title: "Update Profile",
        translate: "Update Profile",
        type: "item",
        icon: "face",
        url: "/profile",
      },
      {
        id: "change_password",
        title: "Change Password",
        translate: "Change Password",
        type: "item",
        icon: "vpn_key",
        url: "/changePassword",
      },
    ],
  },
];

export default navigationConfig;
