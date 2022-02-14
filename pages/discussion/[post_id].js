import { useRouter } from 'next/router'
import {stateToHTML} from 'draft-js-export-html';
import { API_url } from '../../app_config';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import MySpinner from '../../components/mySpinner';
import Layout from '../../components/layout';
import useSWR from 'swr';
import { fetchWrapper } from '../../tools/fetchWrapper';
import RichTextEditor from '../../components/discussion/richTextEditor';

export async function getServerSideProps() {
  
    // Pass data to the page via props
    return { props: {}}
  }


export default function DiscussionDtailPage(props){
    const router = useRouter()
    const {post_id} = router.query
    
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(API_url.get_discussion_post_by_id + post_id, fetcher)

    var editorState = EditorState.createWithContent(emptyContentState)
    if(error){
        return <h1>{error}</h1>
    }
    else{
        if(data){
            const postDetail = JSON.parse(data['data'])
            const rawContent =  JSON.parse(postDetail.content)
            console.log(rawContent)
            const currentContent = convertFromRaw(rawContent)
            editorState = EditorState.createWithContent(currentContent)
        }
    }
    return (
        <>
            <Layout>
                <div className='mx-auto w-50' >
                    <RichTextEditor editorState={editorState} readOnly={true}  editorKey="editor"/>
                </div>
                
            </Layout>
        </>
    )
}

const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        text: '',
        key: 'foo',
        type: 'unstyled',
        entityRanges: [],
      },
    ],
  });