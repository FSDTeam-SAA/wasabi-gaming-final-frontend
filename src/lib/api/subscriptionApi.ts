export interface IReview {
  user: string
  rating: number
  comment: string
  _id: string
}

export interface IPremiumPlan {
  _id: string
  name: string
  price: number
  type: string // 'monthly' | 'yearly'
  features: string[]
  totalSubscripeUser: any[]
  subscriptionCategory: 'students' | 'school'
  createdAt: string
  updatedAt: string
  __v: number
}

// Re-using common response type if available, otherwise defining minimal
interface IPremiumResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: IPremiumPlan[]
}

export const getAllPremiums = async (interval: string): Promise<IPremiumResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/premium?type=${interval}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Assuming next.js revalidate or cache settings if needed
    cache: 'no-store',
  })

  // We are not using the generic TResponse here because we want strict typing for this specific response shape
  // to match the user's provided JSON including the typo 'mounth' if that's what's returned.
  // Although usually we'd use a shared fetch wrapper if the project has one.
  // I saw `achievementsApi.ts` uses relative path for types but I don't have access to types folder content content easily without checking.
  // I will just return the JSON.

  if (!res.ok) {
    throw new Error('Failed to fetch premiums')
  }

  return res.json()
}
