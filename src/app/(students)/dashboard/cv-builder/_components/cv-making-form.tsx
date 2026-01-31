'use client'
import React, { useState } from 'react'
import ChooseCvStyle from './choose-cv-style'
import Sections from './sections'
import { useFormState } from './state/useFormState'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { cvBuilderSchema } from '@/schema/cvBuilderSchema'
import LegalWorkExperience from './legal-work-experience'
import NonLegalWorkExperience from './non-legal-work-experience'
import EducationLevel from './education-level'
import LeadershipExperience from './leadership-experience'
import Achievements from './achievements'
import Summary from './summary'
import TitleProgress from './title-progress'
import { defaultValues } from '@/utils/cvBuilderDefaultValues'
import PersonalInfo from './personal-info'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ModernCvModal from './modern-cv-modal'
import ClassicCvModal from './classic-cv-modal'
import { useSession } from 'next-auth/react'

export type CvBuilderFormType = z.infer<typeof cvBuilderSchema>

const CvMakingForm = () => {
  const { isActive } = useFormState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cvData, setCvData] = useState<CvBuilderFormType | null>(null)
  const [isClassModalOpen, setIsClassicModalOpen] = useState(false)
  const [classicCvData, setClassicCvData] = useState<CvBuilderFormType | null>(
    null,
  )

  const { data: session } = useSession()

  const token = session?.accessToken || ''

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzg5NWI5YjE1NTA5NWU5ZDZkYWI1MSIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJzaGlzaGlyLmJkY2FsbGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3Njk1OTI1MjYsImV4cCI6MTc3MDE5NzMyNn0.pEkkBnwUA4chMqdg1sxjO-Sys3GRIXvqMEL1_Dg59CU";

  const form = useForm<CvBuilderFormType>({
    resolver: zodResolver(cvBuilderSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  })

  const setCvFormat = (format: string) => {
    form.setValue('cvformet', format)
  }

  const cvFormat = form.watch('cvformet')

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['cv-making'],
    mutationFn: async (payload: CvBuilderFormType) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cvbuilder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      )
      return await res.json()
    },
    onSuccess: data => {
      toast.success(data?.message)
      if (data?.data) {
        if (data?.data?.cvformet === 'Modern') {
          setCvData(data.data)
          setIsModalOpen(true)
        } else {
          setClassicCvData(data?.data)
          setIsClassicModalOpen(true)
        }
      }
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  async function onSubmit(data: CvBuilderFormType) {
    try {
      await mutateAsync(data)
    } catch (error) {
      console.log(`error from cv making: ${error}`)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleClassicModalClose = () => {
    setIsClassicModalOpen(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <TitleProgress form={form} />
            {isActive === 'Personal Information' && (
              <ChooseCvStyle
                cvFormat={cvFormat as string}
                setCvFormat={setCvFormat}
              />
            )}

            <div className="flex flex-col items-start gap-5 lg:flex-row">
              <div className="lg:w-[30%] sticky top-10 lg:top-32 z-40 backdrop-blur-lg">
                <Sections />
              </div>

              <div className="flex flex-1">
                {isActive === 'Personal Information' && (
                  <PersonalInfo form={form} />
                )}
                {isActive === 'Legal Work Experience' && (
                  <LegalWorkExperience form={form} />
                )}
                {isActive === 'Non Legal Work Experience' && (
                  <NonLegalWorkExperience form={form} />
                )}
                {isActive === 'Education Level' && (
                  <EducationLevel form={form} />
                )}
                {isActive === 'Leadership Experience' && (
                  <LeadershipExperience form={form} />
                )}
                {isActive === 'Achievements' && <Achievements form={form} />}
                {isActive === 'Summary' && (
                  <Summary form={form} isPending={isPending} token={token} />
                )}
                <ModernCvModal
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  cvData={cvData}
                />

                <ClassicCvModal
                  isOpen={isClassModalOpen}
                  onClose={handleClassicModalClose}
                  classicCvData={classicCvData}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CvMakingForm
