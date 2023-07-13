import { NextResponse } from 'next/server'
import ApiThreads from 'threads-api'

const getUserInfo = async ({ username }: { username: string }) => {
  const threadsAPI = new ApiThreads.ThreadsAPI({
    fbLSDToken: 'nEt4W-takTpf7H9o3pJVI0',
    verbose: true,
  })
  console.log('begin to get user', username)

  // 👤 Details for a specific user

  const userID = await threadsAPI.getUserIDfromUsername(username,)
  console.log('userid', userID)
  if (!userID) {
    return
  }
  const user = await threadsAPI.getUserProfile(username, userID)
  const posts = await threadsAPI.getUserProfileThreads(username, userID);
  return {
    user,
    posts
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || ''

  const data = await getUserInfo({ username })
  return NextResponse.json({ data })
}