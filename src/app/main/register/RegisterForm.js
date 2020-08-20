// imports
import React, { useEffect, useRef, useState } from "react";
import Formsy from "formsy-react";

// material & fuse
import { TextFieldFormsy } from "@fuse/core/formsy";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "app/auth/store/actions";
import { showMessage } from "app/store/actions/fuse";

export default function RegisterForm(props) {
  // redux state
  const dispatch = useDispatch();
  const register = useSelector(({ auth }) => auth.register);

  // local state
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (
      register.error &&
      (register.error.email ||
        register.error.password ||
        register.error.first_name ||
        register.error.last_name)
    ) {
      formRef.current.updateInputsWithError({
        ...register.error,
      });
      disableButton();
    }
    if (register.success) {
      //history.push("/login");
    }
    // eslint-disable-next-line
  }, [register.error, register.success]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(showMessage({ message: "Please standby.." }));
    dispatch(authActions.submitRegister(model));
  }

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col justify-center w-full"
      >
        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="first_name"
          label="First Name"
          value=""
          validations={{
            minLength: 1,
            maxLength: 50,
            isWords: true,
          }}
          validationErrors={{
            minLength: "Min character length is 1",
            maxLength: "Max character length is 50",
            isWords: "It should not contain digits",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="last_name"
          label="Last Name"
          value=""
          validations={{
            minLength: 1,
            maxLength: 50,
            isWords: true,
          }}
          validationErrors={{
            minLength: "Min character length is 1",
            maxLength: "Max character length is 50",
            isWords: "It should not contain digits",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="mb-16"
          type="email"
          name="email"
          label="Email"
          value=""
          validations={{
            isEmail: true,
          }}
          validationErrors={{
            isEmail: "Not a valid email address",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  email
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <TextFieldFormsy
          className="mb-16"
          type="password"
          name="password"
          label="Password"
          value=""
          validations={{
            minLength: 4,
          }}
          validationErrors={{
            minLength: "Min character length is 4",
          }}
          InputProps={{
            className: "pr-2",
            type: showPassword ? "text" : "password",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  <Icon className="text-20" color="action">
                    {showPassword ? "visibility" : "visibility_off"}
                  </Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="SIGN UP"
          disabled={!isFormValid}
          value="legacy"
        >
          Register for free
        </Button>
      </Formsy>
    </div>
  );
}
