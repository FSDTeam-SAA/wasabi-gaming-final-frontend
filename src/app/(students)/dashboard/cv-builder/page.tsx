import CvMakingForm from './_components/cv-making-form'
import CvTips from './_components/cv-tips'

const page = () => {
  return (
    <div className="container mx-auto px-2 py-4 md:px-6 mb-8 space-y-6">
      <CvMakingForm />
      <CvTips />
    </div>
  )
}

export default page
