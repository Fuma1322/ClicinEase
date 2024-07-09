"use client"
import { useRef, useState } from "react"
import CustomButton from "../ui/CustomButton";

// Type definitions for props
interface Faq {
    q: string;
    a: string | JSX.Element;  // Allow `a` to be a string or JSX.Element
}

interface FaqsCardProps {
    faqsList: Faq;
    idx: number;
}

const FaqsCard = (props: FaqsCardProps) => {
    const answerElRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState(false);
    const [answerH, setAnswerH] = useState('0px');
    const { faqsList, idx } = props;

    const handleOpenAnswer = () => {
        if (answerElRef.current) { // Add null check here
            const answerElH = answerElRef.current.firstChild instanceof HTMLElement 
                ? answerElRef.current.firstChild.offsetHeight 
                : 0;
            setState(!state);
            setAnswerH(`${answerElH + 20}px`);
        }
    };

    return (
        <div 
            className="space-y-3 mt-5 overflow-hidden border-b"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-300 font-medium">
                {faqsList.q}
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? { height: answerH } : { height: '0px' }}
            >
                {typeof faqsList.a === "string" ? (
                    <p className="text-gray-200">{faqsList.a}</p>
                ) : (
                    <div className="text-gray-200">{faqsList.a}</div>
                )}
            </div>
        </div>
    );
};

export default function FAQ () {
    const faqsList: Faq[] = [
        {
            q: "How do I sign up fir the ClinicEase App?",
            a: (
                <div>
                    You can sign up by visiting our website and clicking on the{" "}
                    <CustomButton 
                    title="Register"
                    href="/register?role=CLINIC"
                    className="bg-sky-300 hover:bg-indigo-600"/>{" "}
                    Follow the instructions to create your account.
                </div>
            ),
        },
        {
            q: "Do you include common questions?",
            a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator."
        },
        {
            q: "Can I use this for 21 questions?",
            a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated."
        },
        {
            q: "Are these questions for girls or for boys?",
            a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with)."
        },
        {
            q: "What do you wish you had more talent doing?",
            a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires."
        }
    ];

    return (
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-gray-400 font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto text-lg">
                    Answered all frequently asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            key={idx} // Added key prop to FaqsCard
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    );
};
