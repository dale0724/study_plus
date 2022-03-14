import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Footer from './footer'
import NaviBar from './navibar'
import styles from '../styles/layout.module.css'

export default function Layout({children}) {
    return (
        <>
        <NaviBar/>
        <Container fluid className={`padding-0px ${styles.container}`}>
            <Head>
                <meta
                    name="description"
                    content="StudyPlus WebSite"
                    charset="utf-8"
                />
            </Head>
            <main>{children}</main>
            <Footer/>
        </Container>
        </>
        
    )
}