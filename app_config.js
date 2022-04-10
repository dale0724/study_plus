const host = 'http://127.0.0.1:5000/api/'
//'http://10.27.85.191:5000/api/'
//'http://192.168.1.121:5000/api/'
// 'http://127.0.0.1:5000/api/'
// 'http://192.168.1.104:5000/api/'
export const API_url = {
    sign_in: host + 'sign_in',
    sign_up: host + 'sign_up',
    avatar:  host + 'avatar/',
    modify_todo: host + 'todo/id/',
    get_todos_by_email:  host + 'todo/email/',
    add_todo: host + 'todo',
    todo_date: host + 'todo/date',
    update_todo_status: host + 'todo/status/id/',
    add_discussion_post: host + 'discussion',
    discussion_post: host + 'discussion',
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
    discussion_vote: host + 'discussion_post_votes',
    get_discussion_post_reply: host + 'discussion_replies_main/id/',
    add_discussion_post_reply: host + 'discussion_reply_main',
    discussion_reply_vote: host + 'discussion_reply_main_votes',
    get_my_index_swapping_posts_by_email: host + 'index_swapping_posts/email/',
    get_matched_index_swapping_posts_by_email: host + 'matched_index_swapping_posts/email/',
    get_all_campus_news_post: host + 'campus_news_post/all',
    add_new_campus_post: host + 'campus_news_post',
    campus_news_vote: host + 'campus_news_post_votes',
    get_campus_news_post_reply: host + 'campus_news_replies_main/post_id/',
    add_campus_news_post_reply: host + 'campus_news_replies_main',
    campus_news_reply_vote: host + 'campus_news_reply_main_votes',
    get_campus_news_post_by_id: host + 'campus_news_post/id/',
    get_all_announcement_post: host + 'announcement_post/all',
    add_new_announcement_post: host + 'announcement_post',
    get_announcement_post_by_id: host + 'announcement_post/id/',
    get_deadline_post_by_email: host + 'deadline/email/',
    add_new_deadline_post: host + 'deadline',
    modify_deadline_post: host + 'deadline/id/',
}


export const JWT_SECRET = 'DALEisHandsome'
export const self_host = "http://localhost:3000/"