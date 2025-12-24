import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// components
import { Item, Xmodal } from "./SelectAuthorityStyle"

// actions
import { getAuthorityList } from '../../actions/getAuthorityListAction'

const SelectAuthority = props => {
    // variables
    const { getAuthorityList, getAuthorityListState } = props

    // callbacks
    useEffect(() => {
        getAuthorityList()
    }, [])

    return (
        <Xmodal
            title="Select Authority"
            visible={true}
            closable={false}
            footer={null}
            centered
        >
            {getAuthorityListState.apiState === "success" &&
                <>
                    {getAuthorityListState.list.map(item => (
                        <Link to={`/set-org-id/${item.Id}`} >
                            <Item key={item.Id} >{item.Name}</Item>
                        </Link>
                    ))}
                </>
            }
        </Xmodal>
    )
}

const mapStateToProps = (state) => ({
    getAuthorityListState: state.getAuthorityList,
})
const mapDispatchToProps = (dispatch) => ({
    getAuthorityList: (params) => dispatch(getAuthorityList(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectAuthority)