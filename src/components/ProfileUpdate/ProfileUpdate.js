import { connect } from "react-redux";
import '@elastic/eui/dist/eui_theme_light.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Actions as authActions, FETCHING_USER_FROM_TOKEN_SUCCESS } from "../../redux/auth";
import {
  EuiButton,
  EuiCheckbox,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPopover,
  EuiSpacer
} from "@elastic/eui";
import validation from "../../utils/validation";
// import { htmlIdGenerator } from "@elastic/eui/lib/services";
// import styled from "styled-components";
import { extractErrorMessages } from "../../utils/errors";


function ProfileUpdate({ user, authError, isUpdating, isAuthenticated, UpdateUserProfileData }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [form, setForm] = React.useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    licence_number: "",
    licence_category: "",
    licence_expire_date: ""
  })

  let pat = /(\d{3})-(\d{3})-(\d{4})/
  const [errors, setErrors] = React.useState({})
  const navigate = useNavigate()
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const authErrorList = extractErrorMessages(authError)
  // if the user is already authenticated, redirect them to the "/profile" page



  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
  };

  const handleInputChange = (label, value) => {
    validateInput(label, value)
    setForm((form) => ({ ...form, [label]: value }))
  };

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  const closePopover = () => {
    setIsPopoverOpen(false)
  }

  const handlePhoneChange = (label, value) => {
    setErrors((errors) => ({
      ...errors,
      phone_number: !pat.exec(value) || value.length > 12 ? `Phone number should be written like 69x-xxx-xxxx.` : null
    }));
    handleInputChange(label, value)
  }


  const handleDateChange = (label, value) => {
    setErrors((errors) => ({
      ...errors,
      licence_expire_date: !Date.parse(value) || Date(value) < Date.now() ? `Date should be after today and written like YYYY-MM-DD.` : null
    }))
    handleInputChange(label, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]))
    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({ ...errors, form: `You must fill out all fields.` }))
      return
    }

    if (!pat.exec(form.phone_number) || form.phone_number.length > 12) {
      setErrors((errors) => ({ ...errors, form: `Phone number should be written like 69x-xxx-xxxx.` }))
      return
    }

    if (!Date.parse(form.licence_expire_date) || Date.parse(form.licence_expire_date) < Date.now()) {
      setErrors((errors) => ({ ...errors, form: `Date should be after today and written like YYYY-MM-DD.` }))
      return
    }

    setHasSubmitted(true)

     const actionUp = await UpdateUserProfileData({
      first_name: form.first_name,
      last_name: form.last_name,
      phone_number: form.phone_number,
      licence_number: form.licence_number,
      licence_category: form.licence_category,
      licence_expire_date: form.licence_expire_date
    }
    )

    if (actionUp.success) {
      // redirect user to updated cleaning job post
      closePopover()
    }
  }

  const getFormErrors = () => {
    const formErrors = []
    if (errors.form) {
      formErrors.push(errors.form)
    }
    if (hasSubmitted && authErrorList.length) {
      return formErrors.concat(authErrorList)
    }
    return formErrors
  }



  const button = (
    <EuiButton style={{ backgroundColor: "#abd544", borderColor: "#abd544" }}
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={onButtonClick}>
      Update Profile Info
    </EuiButton>
  );


  const UpdateUserDataForm = (<EuiForm
    component="form"
    onSubmit={handleSubmit}
    isInvalid={Boolean(getFormErrors().length)}
    error={getFormErrors()}
  >
    <EuiFormRow
      label="First name"
      helpText="Enter your first name."
      isInvalid={Boolean(errors.first_name)}
      error={`Please enter your name.`}
    >
      <EuiFieldText
        icon="user"
        placeholder={user.profile.first_name ? user.profile.first_name : " First name not specified"}
        value={form.first_name}
        onChange={(e) => handleInputChange("first_name", e.target.value)}
        aria-label="Enter your first name."
        isInvalid={Boolean(errors.first_name)}
      />
    </EuiFormRow>
    <EuiFormRow
      label="Last name"
      helpText="Enter your last name."
      isInvalid={Boolean(errors.last_name)}
      error={`Please enter your last name.`}
    >
      <EuiFieldText
        icon="user"
        placeholder={user.profile.last_name ? user.profile.last_name : " Last name not specified"}
        value={form.last_name}
        onChange={(e) => handleInputChange("last_name", e.target.value)}
        aria-label="Enter your last name."
        isInvalid={Boolean(errors.last_name)}
      />
    </EuiFormRow>
    <EuiFormRow
      label="Phone number"
      helpText="Enter your phone number."
      isInvalid={Boolean(errors.phone_number)}
      error={`Phone number should be written like 69x-xxx-xxxx.`}
    >
      <EuiFieldText
        placeholder={user.profile.phone_number ? user.profile.phone_number : " No phone number added"}
        value={form.phone_number}
        onChange={(e) => handlePhoneChange("phone_number", e.target.value)}
        aria-label="Phone number should be written like 69x-xxx-xxxx."
        isInvalid={Boolean(errors.phone_number)}
      />
    </EuiFormRow>
    <EuiFormRow
      label="Licence number"
      helpText="Confirm your licencenumber."
      isInvalid={Boolean(errors.licence_number)}
      error={`Confirm your licence number.`}
    >
      <EuiFieldText
        placeholder={user.profile.licence_number ?
          user.profile.licence_number : " No licence number added"}
        value={form.licence_number}
        onChange={(e) => handleInputChange("licence_number", e.target.value)}
        aria-label="Confirm your licence number."
        isInvalid={Boolean(errors.licence_number)}
      />
    </EuiFormRow>
    <EuiFormRow
      label="Licence Category"
      helpText="Enter your licence category."
      isInvalid={Boolean(errors.licence_category)}
      error={`Enter your licence_category.`}
    >
      <EuiFieldText
        placeholder={user.profile.licence_category ?
          user.profile.licence_category : " No licence category added"}
        value={form.licence_category}
        onChange={(e) => handleInputChange("licence_category", e.target.value)}
        aria-label="Enter your licence_category."
        isInvalid={Boolean(errors.licence_categoryr)}
      />
    </EuiFormRow>
    <EuiFormRow
      label="Licence Expire Date"
      helpText="Confirm your licence expire date."
      isInvalid={Boolean(errors.licence_expire_date)}
      error={`Please enter your licence expire date.`}
    >
      <EuiFieldText
        placeholder={user.profile.licence_expire_date ?
          user.profile.licence_expire_date : " No licence expire date added"}
        value={form.licence_expire_date}
        onChange={(e) => handleDateChange("licence_expire_date", e.target.value)}
        aria-label="Please enter your licence expire date."
        isInvalid={Boolean(errors.licence_expire_date)}
      />
    </EuiFormRow>
    <EuiSpacer />

    <EuiButton type="submit" isLoading={isUpdating} fill>
      Update Profile
    </EuiButton>
  </EuiForm>);

  return (
    <div>
      <EuiPopover style={{ width: '100%' }}
        id="formPopover"
        ownFocus
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        {UpdateUserDataForm}
      </EuiPopover>
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.auth.user,
    authError: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    isUpdating: state.auth.isUpdating
  }),
  {
    UpdateUserProfileData: authActions.UpdateOwnProfile
  }
)(ProfileUpdate)
