import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Footer from './footer'
import NaviBar from './navibar'

export default function Layout({children}) {
    return (
        <>
            <div className="min-vh-100 position-relative">
                <NaviBar/>
                <Container fluid className={`padding-0px`}>
                    <Head>
                        <meta
                            name="description"
                            content="StudyPlus WebSite"
                            charSet="utf-8"
                        />
                    </Head>
                    <main style={{paddingBottom: '100px'}}>
                        {children}
                    </main>
                </Container>
                <Footer/>
            </div>

        </>

    )
}