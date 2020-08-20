// imports
import React, { useEffect, useRef, useState } from "react";
import Formsy from "formsy-react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

// material & fuse
import { TextFieldFormsy } from "@fuse/core/formsy";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "app/auth/store/actions";

export default function LoginForm(props) {
  // redux state
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.user);

  // local state
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let history = useHistory();
  const formRef = useRef(null);

  useEffect(() => {
    if (login.error && (login.error.email || login.error.password)) {
      formRef.current.updateInputsWithError({
        ...login.error,
      });
      disableButton();
    }
    if (login.isAuthenticate) {
      if (login.user && login.user.new_user) {
        history.push("/profile");
      } else {
        history.push("/botList");
      }
    }
  }, [login.error, history, login.isAuthenticate, login.user]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.submitLogin(model));
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
        <div className="flex items-center justify-between">
          <FormControl>
            {/*<FormControlLabel control={<Checkbox name="remember" />} label="Remember Me" />*/}
          </FormControl>

          <Link className="font-medium" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="LOG IN"
          disabled={!isFormValid}
          value="legacy"
        >
          Login
        </Button>
      </Formsy>
    </div>
  );
}
