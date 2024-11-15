import data from '../data/assessment.json';
import React from 'react';
import { IoRocketSharp } from "react-icons/io5";
import { IoArrowForwardSharp, IoArrowBackSharp } from "react-icons/io5";
import { RiShareBoxFill } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { IoMdRefresh } from "react-icons/io";
import _ from 'lodash';
import { useImmer } from 'use-immer';
import ReactSpeedometer, { CustomSegmentLabelPosition } from "react-d3-speedometer";
import { isValidEmail } from '@/utils/emailValidate';
import { EmailShareButton, FacebookShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface IQuestionOption {
    id: number
    text: string
    score: number
    isSelected: boolean
}

interface IQuestion {
    id: number
    title: string
    options: IQuestionOption[]
    score: number
}

interface IQuestionOptionProps {
    btnStyle: string
    activeBtnStyle: string
    optionContent: string
    isSelected: boolean
    OnClick?: () => void
}

interface IResultDescription {
    text: string
    image_url: string
}
interface IResult {
    level: number
    icon: string
    name: string
    range: number[]
    description: IResultDescription
}

interface IEvaluationResultProps {
    score: number
    result: IResult | null
    setResult: (result: IResult) => void
    setShowSharingOptions: (value: boolean) => void
    setStep: (step: number) => void
}

interface IEmailEnterSectionProps {
    email: string
    setEmail: (email: string) => void
    step: number
    setStep: (step: number) => void
}

interface IGuidelinesSectionProps {
    step: number
    setStep: (step: number) => void
}

interface IAnswerQuestionSectionProps {
    step: number
    setStep: (step: number) => void
    setTotalScore: (totalScore: number) => void
}

interface IEvaluationResultSharingProps {
    level: number
    setShow: (value: boolean) => void
    setShowEmailSharing: (value: boolean) => void
}

interface IEvaluationResultEmailSharingProps {
    setShow: (value: boolean) => void
}

const imageUrls = ["https://ibb.co/ZXR94B5", "https://ibb.co/cxf0Dyx", "https://ibb.co/C73Nd6R", "https://ibb.co/sKks2tt", "https://ibb.co/vvKzGxT"];
const resultUrls = ["https://i.ibb.co/V906ngR/level-1.jpg", "https://i.ibb.co/1by180b/level-2.jpg", "https://i.ibb.co/bBMqhFc/level-3.jpg", "https://i.ibb.co/c6M21xx/level-4.jpg", "https://i.ibb.co/NnHYP6J/level-5.jpg"];

const EmailEnterSection = (props: IEmailEnterSectionProps) => {

    const { email, setEmail, step, setStep } = props;

    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(true);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            hanldeStartEvaluation();
        }
    }

    const hanldeStartEvaluation = () => {
        if (isValidEmail(email)) {
            setStep(step + 1);
        }
        setEmailIsValid(false);
    }

    return (
        <div className='dark-blue-bg h-screen px-4'>
            <div className='mx-8 py-10 text-center'>
                <span className='text-white uppercase text-sm'>{data.title}</span>
            </div>
            <div className='text-center text-white text-3xl leading-normal mb-6 font-medium'>
                <div>Công ty bạn trưởng thành như thế nào trong việc lắng nghe khách hàng?</div>
            </div>
            <div className='text-white text-center mb-5'>
                <span>Đánh giá khả năng của bạn trong việc lắng nghe, hiểu và đáp ứng các tín hiệu từ khách hàng.</span>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 mx-auto'>
                <input
                    type="text"
                    className='w-full outline-none px-4 py-3 mb-2'
                    placeholder='Địa chỉ email của bạn'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(event) => handleKeyPress(event)}
                />
                {
                    !emailIsValid &&
                    <div className='text-red-500 text-sm'>Địa chỉ email không đúng định dạng</div>
                }
                <div className='light-blue-bg py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90 mt-4' onClick={() => hanldeStartEvaluation()}>
                    <span className='text-white'>Bắt đầu</span>
                    <IoRocketSharp className='text-white' />
                </div>
            </div>
        </div>
    )
}

const GuidelinesSection = (props: IGuidelinesSectionProps) => {

    const { step, setStep } = props;

    const hanldeStartEvaluation = () => {
        setStep(step + 1);
    }

    return (
        <div className='h-screen px-4 bg-img'>
            <div className='mx-8 py-10 text-center'>
                <span className='text-white uppercase text-sm'>{data.title}</span>
            </div>
            <div className='w-full sm:w-1/2 xl:w-1/3 mx-auto rounded bg-gray-500/70 px-6 py-6 text-white mb-10'>
                <div className='flex items-center justify-center gap-x-2 mb-4'>
                    <div className='light-blue-bg rounded-full w-2.5 h-2.5'></div>
                    <span className='text-sm text-gray-200'>HƯỚNG DẪN TRẢ LỜI</span>
                </div>
                <div className='font-medium text-lg mb-4'>Hãy dựa vào hướng dẫn sau đây để trả lời các câu hỏi:</div>
                <div className='px-4 mb-4 text-gray-200'>
                    <ul className="list-disc">
                        <li className='text-justify'>Chọn "Có": nếu câu đó phản ánh hiện trạng đang có và được thực hiện một cách nhất quán (ít nhất 80% tời gian)</li>
                        <li className='text-justify'>Chọn "Không có": nếu hoàn toàn chưa từng thực hiện</li>
                        <li className='text-justify'>Chọn "Không rõ vấn đề này": nếu không chắc chắn đã thực hiện hay chưa</li>
                    </ul>
                </div>
                <div className='light-blue-bg py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90' onClick={() => hanldeStartEvaluation()}>
                    <span className='text-white'>Bắt đầu</span>
                    <IoArrowForwardSharp className='text-white' />
                </div>
            </div>
        </div>
    )

}

const QuestionOption = (props: IQuestionOptionProps) => {

    const { btnStyle, activeBtnStyle, optionContent, isSelected, OnClick } = props;

    const classes = (): string => {
        return `w-full rounded py-2 font-medium border-2 text-center cursor-pointer ${!isSelected ? btnStyle : activeBtnStyle}`
    }

    return (
        <button className={classes()} onClick={OnClick}> {optionContent}</button >

    )
}

const AnswerQuestionSection = (props: IAnswerQuestionSectionProps) => {

    const { setTotalScore, step, setStep } = props;

    const [questionNum, setQuestionNum] = React.useState<number>(1);
    const [currentQuestion, setCurrentQuestion] = React.useState<IQuestion>();
    const [questionList, setQuestionList] = useImmer<IQuestion[]>([]);
    const [numOfQuestions, setNumOfQuestions] = React.useState<number>(0);

    const handleChangeQuestion = (qNum: number) => {
        if (qNum < 1 || qNum > questionList.length) {
            return;
        }

        let current_question = _.cloneDeep(questionList[qNum - 1]);
        setCurrentQuestion(current_question);
        setQuestionNum(qNum);
    }

    const handleSelectOption = (questionId: number, optionId: number) => {
        setQuestionList(draft => {
            draft.forEach(question => {
                if (question.id === questionId) {
                    let optionList = question.options;
                    let newOptionsList = optionList.map(option => {
                        if (option.id === optionId) {
                            question.score = option.score;
                            return {
                                ...option, isSelected: true
                            }
                        }

                        return {
                            ...option, isSelected: false
                        }
                    });
                    question.options = newOptionsList;
                }
            })
        });

        if (currentQuestion) {
            let optionList = currentQuestion.options;
            let newOptionsList = optionList.map(option => {
                if (option.id === optionId) {
                    return {
                        ...option, isSelected: true
                    }
                }

                return {
                    ...option, isSelected: false
                }
            });
            setCurrentQuestion({
                ...currentQuestion, options: newOptionsList
            })
        }

    }

    const handleEvaluationSubmit = () => {
        let totalScore = questionList.reduce((acc, question) => {
            return acc + question.score;
        }, 0);

        setTotalScore(totalScore);
        setStep(step + 1);
    }

    React.useEffect(() => {
        let questions = data.questions;
        let newQuestionList = questions.map(question => {
            let options = question.options;
            let newOptionsList = options.map(option => {
                return {
                    ...option, isSelected: false
                }
            });

            return {
                ...question, options: newOptionsList, score: 0
            }
        });

        setQuestionList(newQuestionList);
        setNumOfQuestions(questions.length);
        let initialQuestion = newQuestionList.filter(question => question.id === questionNum);
        setCurrentQuestion(initialQuestion[0]);
    }, []);

    return (

        <div className='h-screen px-4 bg-img'>
            <div className='mx-8 py-10 text-center'>
                <span className='text-white uppercase text-sm'>{data.title}</span>
            </div>
            <div className='w-full sm:w-1/2 xl:w-1/3 mx-auto rounded bg-gray-500/70 px-6 py-6 text-white mb-10'>
                <div className='flex items-center justify-center gap-x-2 mb-4'>
                    <div className='light-blue-bg rounded-full w-2.5 h-2.5'></div>
                    <span className='text-sm text-gray-200'>CÂU HỎI {questionNum}/{numOfQuestions}</span>
                </div>
                <div className='mb-8'>
                    <div className='font-medium text-lg mb-4 text-center'>{currentQuestion?.title}</div>
                    <div className='mb-4 flex flex-col gap-y-6'>
                        {
                            currentQuestion &&
                            <>
                                <QuestionOption
                                    btnStyle="text-blue-300 border-blue-600 hover:text-white hover:bg-blue-600"
                                    activeBtnStyle='text-white bg-blue-600 border-blue-600'
                                    optionContent={currentQuestion.options[0].text}
                                    isSelected={currentQuestion.options[0].isSelected}
                                    OnClick={() => handleSelectOption(currentQuestion.id, currentQuestion.options[0].id)}
                                />
                                <QuestionOption
                                    btnStyle="text-red-400 border-red-400 hover:text-white hover:bg-red-400 hover:border-red-400"
                                    activeBtnStyle='text-white bg-red-400 border-red-400'
                                    optionContent={currentQuestion.options[1].text}
                                    isSelected={currentQuestion.options[1].isSelected}
                                    OnClick={() => handleSelectOption(currentQuestion.id, currentQuestion.options[1].id)}
                                />
                                <QuestionOption
                                    btnStyle="text-gray-100 border-white hover:text-gray-700 hover:bg-gray-300 hover:border-gray-300"
                                    activeBtnStyle='text-gray-700 bg-gray-300 border-gray-300'
                                    optionContent={currentQuestion.options[2].text}
                                    isSelected={currentQuestion.options[2].isSelected}
                                    OnClick={() => handleSelectOption(currentQuestion.id, currentQuestion.options[2].id)}
                                />
                            </>
                        }

                    </div>
                </div>
                {
                    questionNum === 1 ?
                        <div className='flex items-center justify-end gap-x-4'>
                            <div className='light-blue-bg px-6 py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90 self-end select-none' onClick={() => handleChangeQuestion(questionNum + 1)}>
                                <span className='text-white font-medium'>Tiếp theo</span>
                                <IoArrowForwardSharp className='text-white font-medium' />
                            </div>
                        </div>
                        :
                        <div className='flex items-center justify-between gap-x-4'>
                            <div className='bg-white px-6 py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90 select-none' onClick={() => handleChangeQuestion(questionNum - 1)}>
                                <IoArrowBackSharp className='light-blue-text font-medium' />
                                <span className='light-blue-text font-medium'>Quay lại</span>
                            </div>
                            {
                                questionNum !== numOfQuestions &&
                                <div className='light-blue-bg px-6 py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90 self-end select-none' onClick={() => handleChangeQuestion(questionNum + 1)}>
                                    <span className='text-white font-medium'>Tiếp theo</span>
                                    <IoArrowForwardSharp className='text-white font-medium' />
                                </div>
                            }
                            {
                                questionNum === numOfQuestions &&
                                <div className='light-blue-bg px-6 py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90 select-none' onClick={() => handleEvaluationSubmit()}>
                                    <span className='text-white font-medium'>Hoàn tất</span>
                                    <IoArrowForwardSharp className='text-white font-medium' />
                                </div>
                            }
                        </div>
                }

            </div>
        </div>
    )
}

const EvaluationResult = (props: IEvaluationResultProps) => {

    const { score, result, setResult, setShowSharingOptions, setStep } = props;
    const [resultLabelList, setResultLabelList] = React.useState<string[]>([]);

    const handleDownload = (imageName: string) => {
        const link = document.createElement("a");
        link.href = `/thumbnails/level_${result?.level}.jpg`;
        link.download = imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    React.useEffect(() => {

        let finalResult = data.results.filter(result => {
            return score >= result.range[0] && score < result.range[1];
        })[0];

        setResult(finalResult);

        let labelList = data.results.map(result => {
            return result.name;
        });
        setResultLabelList(labelList);

    }, []);

    return (
        <div className='dark-blue-bg h-full bg-img relative'>
            <div className='w-full h-full px-4 pb-6'>
                <div className='mx-8 py-10 text-center'>
                    <span className='text-white uppercase text-sm'>{data.title}</span>
                </div>
                <div className='w-full sm:w-1/2 xl:w-1/3 mx-auto rounded bg-gray-500/70 p-6 text-white'>
                    <div className='flex items-center gap-x-4 mb-6'>
                        <div className='bg-white rounded-full p-3'>
                            <img src={result?.icon} alt="" className='w-6 h-6' />
                        </div>
                        <div>
                            <div className='text-gray-200 text-sm'>VOICE OF THE CUSTOMER - CẤP ĐỘ {result?.level}</div>
                            <div className='uppercase text-xl font-medium'>{result?.name}</div>
                        </div>
                    </div>
                    <div className='text-gray-200 mb-8 text-justify'>{result?.description.text}</div>
                    {
                        resultLabelList && resultLabelList.length > 0 &&
                        <>
                            <div className='flex items-center justify-center'>
                                <ReactSpeedometer
                                    width={280}
                                    height={240}
                                    needleHeightRatio={0.7}
                                    minValue={0}
                                    maxValue={10}
                                    value={score}
                                    valueTextFontSize='20px'
                                    currentValueText={`Score: ${score}`}
                                    customSegmentLabels={[
                                        {
                                            text: resultLabelList[0],
                                            position: CustomSegmentLabelPosition.Outside,
                                            color: '#FFFFFF',
                                            fontSize: '12px'
                                        },
                                        {
                                            text: resultLabelList[1],
                                            position: CustomSegmentLabelPosition.Outside,
                                            color: '#FFFFFF',
                                            fontSize: '12px'
                                        },
                                        {
                                            text: resultLabelList[2],
                                            position: CustomSegmentLabelPosition.Outside,
                                            color: '#FFFFFF',
                                            fontSize: '12px'
                                        },
                                        {
                                            text: resultLabelList[3],
                                            position: CustomSegmentLabelPosition.Outside,
                                            color: '#FFFFFF',
                                            fontSize: '12px'
                                        },
                                        {
                                            text: resultLabelList[4],
                                            position: CustomSegmentLabelPosition.Outside,
                                            color: '#FFFFFF',
                                            fontSize: '12px'
                                        },
                                    ]}
                                    ringWidth={16}
                                    needleTransitionDuration={2000}
                                    needleColor={'#ffbb10'}
                                    textColor={'#d8dee9'}
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex flex-col gap-y-2 justify-center'>
                <div className='light-blue-bg text-white pt-6 pb-2 flex flex-col items-center gap-y-5 cursor-pointer' onClick={() => setShowSharingOptions(true)}>
                    <div className='-rotate-90 h-auto whitespace-nowrap'>Chia sẻ</div>
                    <div><RiShareBoxFill className='w-5 h-5' /></div>
                </div>
                <div className='bg-white py-2 flex items-center justify-center cursor-pointer' onClick={() => handleDownload("my_result.jpg")}>
                    <div><LuDownload className='w-5 h-5 light-blue-text' /></div>
                </div>
                <div className='bg-white py-2 flex items-center justify-center cursor-pointer' onClick={() => setStep(1)}>
                    <div><IoMdRefresh className='w-5 h-5 light-blue-text' /></div>
                </div>
            </div>

        </div>
    )

}

const EvaluationResultSharing = (props: IEvaluationResultSharingProps) => {

    const { level, setShow, setShowEmailSharing } = props;

    return (
        <>
            <div className="w-full h-screen fixed dark-blue-bg flex z-50 top-0 right-0 left-0"></div>
            <div className="h-screen fixed flex items-center justify-center z-[60] top-0 right-0 left-0 px-4">
                <div className='w-full sm:w-1/2 xl:w-1/3 mx-auto rounded bg-white px-6 py-6 mb-10'>
                    <div className='text-center mb-4'>
                        <span className='text-lg font-bold tracking-wide'>Chia sẻ kết quả</span>
                    </div>
                    <div className='mb-6'>Đây là một số cách bạn có thể chia sẻ với bạn bè và đồng nghiệp của mình:</div>
                    <div className='flex flex-col gap-y-4 font-medium'>
                        <FacebookShareButton
                            url={imageUrls[level - 1]}
                        >
                            <button className='text-center text-white py-2 w-full light-blue-bg hover:opacity-90 cursor-pointer'>Chia sẻ qua Facebook</button>
                        </FacebookShareButton>
                        <button className='text-center light-blue-text py-2 w-full bg-blue-100 hover:opacity-90 cursor-pointer' onClick={() => setShowEmailSharing(true)}>Chia sẻ qua Email</button>
                        <CopyToClipboard
                            text={resultUrls[level - 1]}
                        >
                            <button className='text-center light-blue-text py-2 w-full bg-blue-100 hover:opacity-90 cursor-pointer'>Sao chép đường dẫn đến trang kết quả</button>
                        </CopyToClipboard>
                        <button className='text-center light-blue-text py-2 w-full hover:bg-gray-100 cursor-pointer' onClick={() => setShow(false)}>Hủy</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const EvaluationResultEmailSharing = (props: IEvaluationResultEmailSharingProps) => {

    const { setShow } = props;

    return (

        <>
            <div className="w-full h-screen fixed dark-blue-bg flex z-50 top-0 right-0 left-0"></div>
            <div className="h-screen fixed flex items-center justify-center z-[60] top-0 right-0 left-0 px-4">
                <div className='w-full sm:w-1/2 xl:w-1/3 mx-auto rounded bg-white px-6 py-6 mb-10'>
                    <div className='text-center mb-4'>
                        <span className='text-lg font-bold tracking-wide'>Chia sẻ kết quả</span>
                    </div>
                    <div className='mb-4'>Vui lòng cung cấp địa chỉ email mà bạn muốn chia sẻ kết quả:</div>
                    <div className='mb-6'>
                        <input type="email" className='outline-none px-4 py-2 border border-gray-300 w-full' placeholder='Địa chỉ email nhận kết quả' />
                    </div>
                    <div className='flex items-center justify-between gap-x-4'>
                        <button className='text-center light-blue-text py-2 bg-blue-100 w-1/2 cursor-pointer hover:opacity-90' onClick={() => setShow((false))}>Quay lại</button>
                        <button className='text-center text-white py-2 light-blue-bg w-1/2 cursor-pointer hover:opacity-90'>
                            <EmailShareButton
                                url={'dachetmehet113@gmail.com'}
                            >
                                Gửi email
                            </EmailShareButton >
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

const Homepage = () => {

    const [email, setEmail] = React.useState<string>("");

    const [evaluationStep, setEvaluationStep] = React.useState<number>(1);
    const [evaluationScore, setEvaluationScore] = React.useState<number>(0);
    const [result, setResult] = React.useState<IResult | null>(null);

    const [showSharingOptions, setShowSharingOptions] = React.useState<boolean>(false);
    const [showEmailSharing, setShowEmailSharing] = React.useState<boolean>(false);

    return (
        <>
            {
                evaluationStep === 1 &&
                <EmailEnterSection email={email} setEmail={setEmail} step={evaluationStep} setStep={setEvaluationStep} />
            }
            {
                evaluationStep === 2 &&
                <GuidelinesSection step={evaluationStep} setStep={setEvaluationStep} />
            }
            {
                evaluationStep === 3 &&
                <AnswerQuestionSection step={evaluationStep} setStep={setEvaluationStep} setTotalScore={setEvaluationScore} />
            }
            {
                evaluationStep === 4 && !showSharingOptions && !showEmailSharing &&
                <EvaluationResult
                    score={evaluationScore}
                    result={result}
                    setResult={setResult}
                    setShowSharingOptions={setShowSharingOptions}
                    setStep={setEvaluationStep}
                />
            }
            {
                showSharingOptions && !showEmailSharing &&
                <EvaluationResultSharing level={result ? result?.level : 1} setShow={setShowSharingOptions} setShowEmailSharing={setShowEmailSharing} />
            }
            {
                showEmailSharing &&
                <EvaluationResultEmailSharing setShow={setShowEmailSharing} />
            }
        </>
    )
}

export default Homepage;
