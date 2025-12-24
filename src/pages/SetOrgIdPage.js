import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import _ from "lodash";

// others
import { setOrgId, setTollFree } from '../utils'

const SetOrgIdPage = props => {
    // variables
    const OrgId = props.match.params.id
    const { getAuthorityListState } = props
    const [redirect, setRedirect] = useState([false, ""])

    let next = window.location.search
    // callbacks
    useEffect(() => {
        if (!OrgId) {
            setRedirect([true, "/"])
        } else {
            let data = _.find(getAuthorityListState.list, { Id: Number(OrgId) })
            setOrgId(OrgId)
            setTollFree(data.TollFreeNo)
            if (next) {
                let url = new URL(decodeURIComponent(next).slice(6))
                setRedirect([true, (decodeURIComponent(next).slice(6)).replace(url.origin, '')])
            } else {
                setRedirect([true, "/"])
            }
        }
    }, [])

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    getAuthorityListState: state.getAuthorityList,
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SetOrgIdPage)
