const host = 'http://192.168.1.104:5000/api/'
export const API_url = {
    sign_in: host + 'sign_in',
    sign_up: host + 'sign_up',
    avatar:  host + 'avatar/',
    modify_todo: host + 'todo/id/',
    get_todos_by_email:  host + 'todo/email/',
    add_todo: host + 'todo',
    update_todo_status: host + 'todo/status/id/'
}


export const JWT_SECRET = 'DALEisHandsome'