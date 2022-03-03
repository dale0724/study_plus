import {useRouter} from 'next/router'
import Layout from '../../components/layout';
import useSWR from 'swr';
import {fetchWrapper} from '../../tools/fetchWrapper';
import RichTextEditor from '../../components/helpers/richTextEditor';
import styles from "../../styles/post_id.module.css";
import React from "react";
import DiscussionPostMain from "../../components/post_detail_components/postMain";
import DiscussionReplyMain from "../../components/post_detail_components/replyMain";

export async function getServerSideProps() {

    // Pass data to the page via props
    return {props: {}}
}

export default function CampusNewsDetailPage() {
    const router = useRouter();
    const {post_id} = router.query;

    return (
        <>
            <Layout>
                <div className={`mx-auto w-50 ${styles.main}`}>
                    <PostMain postID={post_id}/>
                    <ReplyMain postID={post_id}/>
                </div>
            </Layout>
        </>
    )

}
