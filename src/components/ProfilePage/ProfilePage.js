
import React from "react"
import { connect } from "react-redux"
import {
  EuiAvatar,
  EuiHorizontalRule,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText
} from "@elastic/eui"
import moment from "moment"
import styled from "styled-components"
const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`
const StyledEuiPageHeader = styled(EuiPageHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  & h1 {
    font-size: 3.5rem;
  }
`
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    margin-bottom: 1rem;
  }
`

function ProfilePage({ user }) {

  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <StyledEuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Profile</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </StyledEuiPageHeader>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <StyledEuiPageContentBody>
            <EuiAvatar
              size="xl"
              name={user.profile.first_name || user.username || "Anonymous"}
              initialsLength={2}
              imageUrl={user.profile.image}
            />
            <EuiTitle size="l">
              <h2>@{user.username}</h2>
            </EuiTitle>
            <EuiText>
              <p>
                <EuiIcon type="email" /> {user.email}
              </p>

              <p>
                <EuiIcon type="clock" /> MEMBER SINCE {moment(user.created_at).format("DD-MM-YYYY")}
              </p>
              
              <EuiHorizontalRule />

              <p> FIRST NAME: {" "} 
                {user.profile.first_name ? user.profile.first_name : <EuiIcon type="alert" /> + " First name not specified"}
              </p>

              <p> LAST NAME: {" "} 
                {user.profile.last_name ? user.profile.last_name : <EuiIcon type="alert" /> + " Last name not specified"}
              </p>


              <p> PHONE NUMBER: {" "} 
                {user.profile.phone_number ? user.profile.phone_number : <EuiIcon type="alert" /> + " No phone number added"}
              </p>

              <EuiHorizontalRule />

              <p> LICENCE NUMBER: {" "}
                {user.profile.licence_number ?
                 user.profile.licence_number : <EuiIcon type="alert" /> + " No licence number added"}
              </p>
              <p> LICENCE CATEGORY: {" "}
                {user.profile.licence_category ?
                 user.profile.licence_category : <EuiIcon type="alert" /> + " No licence category added"}
              </p>
              <p> LICENCE EXPIRE DATE: {" "}
                {moment(user.profile.licence_expire_date).format("DD-MM-YYYY") ?
                 user.profile.licence_expire_date :<EuiIcon type="alert" /> + " No licence expire date added"}
              </p>
           
              <EuiHorizontalRule />
            
            </EuiText>
          </StyledEuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}
export default connect((state) => ({ user: state.auth.user }))(ProfilePage)