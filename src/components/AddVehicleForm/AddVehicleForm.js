import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Actions as vehicleActions } from "../../redux/vehicles"
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldNumber,
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
  EuiTextArea
} from "@elastic/eui"
import validation from "../../utils/validation"
import { extractErrorMessages } from "../../utils/errors"
import styled from "styled-components";

const RegistrationFormWrapper = styled.div`
  padding: 2rem;
`
const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`

const vehicleTypeOptions = [
    {
      value: "bicycle",
      inputDisplay: "Bicycle"
    },
    {
      value: "motorcycle",
      inputDisplay: "Motorcycle"
    },
    {
      value: "car",
      inputDisplay: "Car",
    },
    {
        value: "truck",
        inputDisplay: "Truck",
    },
    {
        value: "bus",
        inputDisplay: "Bus",
    }
  ]

function AddVehicleForm({
    user, 
    vehicleError, 
    isLoading, 
    createVehicle 
}) {
  const [form, setForm] = React.useState({
    sign: "",
    type: vehicleTypeOptions[2].value,
    model: "",
    manufacture_year: "" 
  })
  const [errors, setErrors] = React.useState({})
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const navigate = useNavigate()
  const vehicleErrorList = extractErrorMessages(vehicleError)
  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
  }
  const onInputChange = (label, value) => {
    validateInput(label, value)
    setForm((state) => ({ ...state, [label]: value }))
  }
  const onVehicleTypeChange = (type) => {
    setForm((state) => ({ ...state, type }))
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
    setHasSubmitted(true)
    const res = await createVehicle({ new_vehicle: { ...form } })
    if (res?.success) {
      const vehicleId = res.data?.id
      navigate(`/vehicles/${vehicleId}`)
      // redirect user to new vehicle post
    }
  }
  const getFormErrors = () => {
    const formErrors = []
    if (errors.form) {
      formErrors.push(errors.form)
    }
    if (hasSubmitted && vehicleErrorList.length) {
      return formErrors.concat(vehicleErrorList)
    }
    return formErrors
  }
  return (
    <>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="Sign"
          helpText="What is the vehicle sign?"
          isInvalid={Boolean(errors.name)}
          error={`Please enter a valid sign.`}
        >
          <EuiFieldText
            name="sign"
            value={form.sign}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow label="Select a vehicle type">
          <EuiSuperSelect
            options={vehicleTypeOptions}
            valueOfSelected={form.type}
            onChange={(value) => onVehicleTypeChange(value)}
            itemLayoutAlign="top"
            hasDividers
          />

        </EuiFormRow>
        <EuiFormRow
          label="Model"
          helpText="Model of the car."
          isInvalid={Boolean(errors.model)}
          error={`Please enter your vehicle model`}
        >
          <EuiFieldText
            name="model"
            value={form.model}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>
        <EuiFormRow
          label="manufacture_year"
          helpText="Tell us the year your vehicle was manufactured?"
          isInvalid={Boolean(errors.description)}
          error={`Please enter a valid year between 1970-now .`}
        >
          <EuiFieldNumber
            name="manufacture_year"
            placeholder="2010"
            value={form.manufacture_year}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton type="submit" isLoading={isLoading} fill>
          Add Vehicle
        </EuiButton>
      </EuiForm>
    </>
  )
}

export default connect(state => ({
  user: state.auth.user,
  vehicleError: state.vehicles.error,
  isLoading: state.vehicles.isLoading,
}), {
  createVehicle: vehicleActions.createVehicle
})(AddVehicleForm)

