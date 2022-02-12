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
    get_discussion_post_by_id: host + 'discussion_post/id/'
}


export const JWT_SECRET = 'DALEisHandsome'