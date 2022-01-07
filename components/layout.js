import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Footer from './footer'
import NaviBar from './navibar'

export default function Layout({children}) {
    return (
        <>
        <NaviBar/>
        <Container fluid className='padding-0px'>
            <Head>
                <meta
                    name="description"
                    content="StudyPlus WebSite"
                />
            </Head>
            <main>{children}</main>
            <Footer/>
        </Container>
        </>
        
    )
}