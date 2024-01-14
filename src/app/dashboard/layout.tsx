'use client'
import Sidebar from '@/common/components/Sidebar'
import type { FC } from 'react'
import { useGetMe } from '@/common/hooks/api/useGetMe'
import { useAuth } from '@/common/contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  const { me } = useGetMe()
  const { currentUser } = useAuth()

  if (currentUser === null) {
    window.location.href = '/login'
  }

  if (!me) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <img className="w-[80px]" src="/img/logo/logo.svg" alt="loading logo" />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="w-full p-12">{children}</div>
    </main>
  )
}

export default AppLayout
