import {useRouter} from 'next/router'
import Layout from '../../components/layout';
import useSWR from 'swr';
import {fetchWrapper} from '../../tools/fetchWrapper';
import RichTextEditor from '../../components/helpers/richTextEditor';
import styles from "../../styles/post_id.module.css";
import React from "react";
import DiscussionPostMain from "../../components/discussion/discussionPostMain";
import DiscussionReplyMain from "../../components/discussion/discussionReplyMain";

export async function getServerSideProps() {

    // Pass data to the page via props
    return {props: {}}
}

export default function DiscussionDetailPage() {
    const router = useRouter();
    const {post_id} = router.query;

    return (
        <>
            <Layout>
                <div className={`mx-auto w-50 ${styles.main}`}>
                    <DiscussionPostMain postID={post_id}/>
                    <DiscussionReplyMain postID={post_id}/>
                </div>
            </Layout>
        </>
    )

}
