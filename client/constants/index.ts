import { CircleEllipsis, File, Home, Image, Video } from 'lucide-react'

export const navItems = [
  { name: 'Dashboard', icon: Home, url: '/' },
  { name: 'Documents', icon: File, url: '/documents' },
  { name: 'Images', icon: Image, url: '/images' },
  { name: 'Media', icon: Video, url: '/media' },
  { name: 'Others', icon: CircleEllipsis, url: '/others' },
]

export const avatarPlaceholderUrl = 'https://img.freepik.com/free-vector/man-profile-account-picture_24908-81754.jpg?semt=ais_hybrid&w=740&q=80'

export const MAX_FILE_SIZE = 50*1024*1024 // 50MB
