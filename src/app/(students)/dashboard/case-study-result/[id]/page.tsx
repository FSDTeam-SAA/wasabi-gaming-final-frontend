'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

interface CareAnalysisData {
  _id: string;
  aiassigmentId: {
    title: string;
    discription: string;
    type: string;
    logo?: string;
  };
  precedentSummary: string;
  pretendCase: string;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
  };
  caseLinking?: string;
  legalIssue?: string;
  summaryQuality?: string;
  yourResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export default function CaseAnalysisPage() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [caseData, setCaseData] = useState<CareAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login'); // or wherever your login page is
      return;
    }

    if (!id || !session?.accessToken) return;

    const fetchCase = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/careanalysis/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();

        if (json.success && json.data) {
          setCaseData(json.data);
        } else {
          throw new Error(json.message || 'Failed to get case data');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong while loading the case');
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id, session, status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-yellow-600" />
          <p className="mt-4 text-gray-600">Loading case analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error || 'Case not found'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { aiassigmentId, precedentSummary, pretendCase, yourResponse, summaryQuality, legalIssue, caseLinking, applicant } = caseData;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#FFFF00] p-8 text-gray-900">
          <h1 className="text-3xl md:text-3xl font-extrabold mb-3 text-black">
            {aiassigmentId.title || 'Case Law Analysis'}
          </h1>
          <p className="text-lg opacity-90">{aiassigmentId.discription}</p>
          {/* <div className="mt-4 text-sm flex flex-wrap gap-4">
            <span className="bg-white/30 px-3 py-1 rounded-full">
              Type: {aiassigmentId.type.replace('_', ' ')}
            </span>
            <span className="bg-white/30 px-3 py-1 rounded-full">
              ID: {caseData._id.slice(-8)}
            </span>
          </div> */}
        </div>

        <div className="p-6 md:p-10 space-y-10">
          {/* Precedent */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#000000] pl-4">
              Precedent Summary
            </h2>
            <div className="prose max-w-none text-gray-800 leading-relaxed">
              {precedentSummary.split('\n').map((line, i) => (
                <p key={i} className="mb-4 text-base text-[#374151] font-normal">{line}</p>
              ))}
            </div>
          </section>

          {/* Fictional Case */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-4">
              Pretend / Fictional Case
            </h2>
            <div className="prose max-w-none text-gray-800 leading-relaxed">
              {pretendCase.split('\n').map((line, i) => (
                <p key={i} className="mb-4 text-base text-[#374151] font-normal">{line}</p>
              ))}
            </div>
          </section>

          {/* Your Response / Submitted Answer */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Your Response
            </h2>
            {yourResponse && yourResponse.trim() !== 'dfasdf' ? (
              <div className="prose max-w-none text-gray-700">
                {yourResponse.split('\n').map((line, i) => (
                  <p key={i} className="mb-3">{line}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No meaningful response submitted yet.
              </p>
            )}
          </section>

          {/* Feedback / Quality */}
          {summaryQuality && (
            <section className="bg-[#FEFCE8] p-6 rounded-xl border border-[#FACC15]">
              <h2 className="text-2xl font-bold mb-4 text-[#000000]">
                AI Feedback / Summary Quality
              </h2>
              <p className="text-[#374151] leading-relaxed">{summaryQuality}</p>
            </section>
          )}

          {/* Additional Analysis Fields */}
          {(legalIssue || caseLinking) && (
            <section className="grid md:grid-cols-2 gap-6">
              {legalIssue && (
                <div className="bg-white p-5  border border-gray-200 rounded-[12px] shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Legal Issue</h3>
                  <p className="text-[#374151] text-base font-normal">{legalIssue}</p>
                </div>
              )}
              {caseLinking && (
                <div className="bg-white p-5 rounded-[12px] border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Case Linking</h3>
                  <p className="text-[#374151] text-base font-normal">{caseLinking}</p>
                </div>
              )}
            </section>
          )}

          {/* Applicant Info */}
          <section className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Submitted by</h3>
            <div className="flex items-center gap-4">
              {applicant.profileImage && (
                <img
                  src={applicant.profileImage}
                  alt={`${applicant.firstName} ${applicant.lastName}`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
              )}
              <div>
                <p className="font-medium">
                  {applicant.firstName} {applicant.lastName}
                </p>
                <p className="text-sm text-gray-500">{applicant.email}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}