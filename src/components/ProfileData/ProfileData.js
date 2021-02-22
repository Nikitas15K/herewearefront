import React from "react"
import { connect } from "react-redux"
import {
    EuiHorizontalRule,
    EuiIcon,
} from "@elastic/eui"
import moment from "moment"
import styled from "styled-components"

const StyledLi = styled.li`
display:block;
list-style-type: none;
margin-left: -2rem;
padding: 1rem;
`

function ProfileData({ user }) {

    return (
        <ul>

            <StyledLi> FIRST NAME: {" "}
                {user.profile.first_name ? user.profile.first_name : " First name not specified"}
            </StyledLi>

            <StyledLi> LAST NAME: {" "}
                {user.profile.last_name ? user.profile.last_name : " Last name not specified"}
            </StyledLi>

            <StyledLi> PHONE NUMBER: {" "}
                {user.profile.phone_number ? user.profile.phone_number : " No phone number added"}
            </StyledLi>

            <StyledLi> LICENCE NUMBER: {" "}
                {user.profile.licence_number ?
                    user.profile.licence_number : " No licence number added"}
            </StyledLi>

            <StyledLi> LICENCE CATEGORY: {" "}
                {user.profile.licence_category ?
                    user.profile.licence_category : " No licence category added"}
            </StyledLi>

            <StyledLi> LICENCE EXPIRE DATE: {" "}
                {user.profile.licence_expire_date ?
                     moment(user.profile.licence_expire_date).format("DD-MM-YYYY") : " No licence expire date added"}
            </StyledLi>
        </ul>)
}
export default connect((state) => ({ user: state.auth.user }))(ProfileData)