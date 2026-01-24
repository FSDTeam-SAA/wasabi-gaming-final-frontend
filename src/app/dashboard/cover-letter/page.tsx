import { CoverLetterBuilder } from "./_components/CoverLetterBuilder"


export const metadata = {
  title: 'Cover Letter Builder',
  description: 'Create a professional cover letter that stands out to employers.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <CoverLetterBuilder />
      </div>
    </main>
  )
}
