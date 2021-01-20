import React from "react"
import { EuiHorizontalRule } from "@elastic/eui"

import moment from "moment";

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <p>Copyright &copy; HereWeAre! {moment().format("YYYY")}</p>
                <EuiHorizontalRule />
            </div>
        );
    }
}

