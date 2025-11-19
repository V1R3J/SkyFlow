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

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];
