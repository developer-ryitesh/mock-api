export interface INotification {
  id: string
  userId: string
  title: string
  body: string
  type: string
  priority: string
  createdAt: string
  updatedAt: string
  isRead: boolean
}