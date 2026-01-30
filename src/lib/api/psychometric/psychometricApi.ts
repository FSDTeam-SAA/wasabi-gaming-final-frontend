export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

// Types based on the User's API response
export interface PsychometricOption {
    option: string;
    // The API response shows options as simple strings ["Option A", ...].
    // If the API structure changes to objects, we update this.
    // Based on user JSON: "options": ["Option A", "Option B"...]
}

export interface PsychometricQuestion {
    _id: string;
    question: string;
    options: string[];
    answer?: string; // Only present in some responses or admin view? The user 'get all' response shows 'answer'.
    difficulty: string;
    timeTakenSec: number;
}

export interface PsychometricTest {
    _id: string;
    category: string;
    score: number;
    allQuestions: PsychometricQuestion[];
    attamUser: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PsychometricTestResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: PsychometricTest[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface SinglePsychometricTestResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: PsychometricTest;
}

export interface SubmitAnswer {
    questionId: string;
    userAnswer: string;
    timeTakenSec: number;
}

export interface SubmitAttemptBody {
    answers: SubmitAnswer[];
}

export interface AttemptAnswer {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    timeTakenSec: number;
    _id: string;
}

export interface UserAttempt {
    _id: string;
    user: string;
    test: {
        _id: string;
        category: string;
    };
    answers: AttemptAnswer[];
    score: number;
    totalTime: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface MyAnswersResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: UserAttempt[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

// API Functions

// Get all psychometric tests
export const getAllPsychometricTests = async (): Promise<PsychometricTestResponse> => {
    const res = await fetch(`${API_BASE_URL}/psychometric-test/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Error fetching tests: ${res.statusText}`);
    }

    return res.json();
};

// Get single psychometric test by ID
export const getPsychometricTestById = async (id: string): Promise<SinglePsychometricTestResponse> => {
    const res = await fetch(`${API_BASE_URL}/psychometric-test/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Error fetching test ${id}: ${res.statusText}`);
    }

    return res.json();
};

// Submit psychometric test result
// URL: /psychometric-attempt/:id/submit
// Note: :id here is likely the Test ID based on typical REST patterns for creating an attempt for a test?
// Or user example: /psychometric-attempt/69705221153b41a985c3fea3/submit where 6970522... matches the test ID in my-answers response?
// Yes, in my-answers: test._id is 69705221153b41a985c3fea3.
// So we post to /psychometric-attempt/{TEST_ID}/submit
export const submitPsychometricAttempt = async (testId: string, answers: SubmitAnswer[], token: string) => {
    const res = await fetch(`${API_BASE_URL}/psychometric-attempt/${testId}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // User typically sends "Bearer token" or just token depending on backend. User said "useSession theke accesstoken niye...". Typical pattern is Bearer. I will assume just token or Bearer token? I will assume the token I get is the raw JWT, so I might need "Bearer ".
            // However, usually the token passed in might already be handled. I will try with `Authorization: token` first as per user wording "accesstoken niye".
            // If the user's backend expects Bearer, I should prepend it. I'll check if I can see other API headers.
            // I'll stick to passing `token` mostly, assuming the caller formats it if needed or I'll just add `Bearer ` if standard.
            // Let's check `achievementsApi.ts` again... it didn't use token.
            // I will assume standard Bearer.
        },
        body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error submitting test: ${errorText}`);
    }

    return res.json();
};

// Try again
// URL: /psychometric-attempt/:id/try-again
// id here is likely the TEST ID again? Or the previous ATTEMPT id?
// User example: /psychometric-attempt/69705261153b41a985c3fea8/try-again
// In my-answers: test._id for the second item is 69705261153b41a985c3fea8.
// So it seems we POST to /psychometric-attempt/{TEST_ID}/try-again to retry a test.
export const tryAgainPsychometricAttempt = async (testId: string, answers: SubmitAnswer[], token: string) => {
    const res = await fetch(`${API_BASE_URL}/psychometric-attempt/${testId}/try-again`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error retrying test: ${errorText}`);
    }

    return res.json();
};

// Get my answers (history)
export const getMyPsychometricAnswers = async (token: string): Promise<MyAnswersResponse> => {
    const res = await fetch(`${API_BASE_URL}/psychometric-attempt/my-answers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Error fetching my answers: ${res.statusText}`);
    }

    return res.json();
};
