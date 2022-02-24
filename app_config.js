const host = 'http://192.168.1.104:5000/api/'
export const API_url = {
    sign_in: host + 'sign_in',
    sign_up: host + 'sign_up',
    avatar:  host + 'avatar/',
    modify_todo: host + 'todo/id/',
    get_todos_by_email:  host + 'todo/email/',
    add_todo: host + 'todo',
    update_todo_status: host + 'todo/status/id/',
    add_discussion_post: host + 'discussion',
    get_discussion_posts_by_email: host + 'discussion_posts/email/',
    get_all_discussion_posts_meta: host + 'discussion_posts/all',
    get_discussion_post_by_id: host + 'discussion_post/id/',
    upload_discussion_post_img: host + 'discussion_post_img',
    get_discussion_post_img: host + 'discussion_post_img',
    get_VAPID_public_key: host + 'VAPID_public_key',
    subscribe: host + 'subscribe',
    unsubscribe: host + 'unsubscribe',
    add_index_swapping_post: host + 'index_swapping_post',
    get_all_index_swapping_posts: host + 'index_swapping_posts/all',
    get_unread_index_matched_number: host + 'unread_index_record_number/',
    get_index_swapping_post_by_id: host + 'index_swapping_post/id/',
    discussion_add_vote_number: host + 'discussion_post_votes',
    get_discussion_post_reply: host + 'discussion_replies_main/id/',
    add_discussion_post_reply: host + 'discussion_reply_main',
    discussion_reply_add_vote_number: host + 'discussion_reply_main_votes',
}


export const JWT_SECRET = 'DALEisHandsome'