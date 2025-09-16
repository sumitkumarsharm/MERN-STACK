export const userRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project-admin",
    MEMBER: "member"
}


export const taskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in-progress",
    DONE: "done"
}

export const AvialableTaskStatus = Object.values(taskStatusEnum)

export const AvialableUserRole = Object.values(userRolesEnum)