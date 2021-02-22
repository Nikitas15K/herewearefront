import React, { useState } from "react"
import { connect } from "react-redux"
import ProfileData from "../ProfileData/ProfileData"
import ProfileUpdate from "../ProfileUpdate/ProfileUpdate"
import {
  EuiAvatar,
  EuiHorizontalRule,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiButton,
  EuiFlexItem,
  EuiFlexGroup,
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
  visibility: ${(props) => (props.clicked ? "hidden" : "visible")};
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    margin-bottom: 1rem;
  }
`
const StyledEuiFlexGroup = styled(EuiFlexGroup)`
  margin:1px 7px 10px 1px;
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

        <StyledEuiFlexGroup wrap gutterSize="s" alignItems="center" justifyContent="center">
          <EuiFlexItem grow={false}>
            <EuiButton color="text" onClick={() => { }}>
              Update Email
                  </EuiButton>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButton color="text" onClick={() => { }}>
              Update Password
                </EuiButton>
          </EuiFlexItem>

          <ProfileUpdate />
          
        </StyledEuiFlexGroup>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <StyledEuiPageContentBody>
            <EuiAvatar
              size="xl"
              name={user.profile.first_name || user.username || "Anonymous"}
              initialsLength={2}
              color="#abd544"
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

              <ProfileData />
            </EuiText>
          </StyledEuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}
export default connect((state) => ({ user: state.auth.user }))(ProfilePage);