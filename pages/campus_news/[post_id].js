import {useRouter} from 'next/router'
import Layout from '../../components/layout';
import styles from "../../styles/post_id.module.css";
import React from "react";
import PostMain from "../../components/post_detail_components/postMain";
import ReplyMain from "../../components/post_detail_components/replyMain";
import {API_url} from "../../app_config";

export async function getServerSideProps() {

    // Pass data to the page via props
    return {props: {}}
}

export default function CampusNewsDetailPage() {
    const router = useRouter();
    const {post_id} = router.query;
    const host = "http://localhost:3000/"

    return (
        <>
            <Layout>
                <div className={`mx-auto w-50 ${styles.main}`}>
                    <PostMain
                    postID={post_id}
                    backHref='/campus_news'
                    contentType='campusNews'
                    />
                    <ReplyMain postID={post_id} type='campus_news'
                    apiGetUrl={API_url.get_campus_news_post_reply}
                    apiAddReplyUrl = {API_url.add_campus_news_post_reply}
                    apiUpVoteUrl = {API_url.campus_news_reply_vote}
                    />
                </div>
            </Layout>
        </>
    )

}
