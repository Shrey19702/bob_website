import { withRouter } from 'next/router'

function Gethref({router}) {
    return (router.asPath)
}

export default withRouter(Gethref);