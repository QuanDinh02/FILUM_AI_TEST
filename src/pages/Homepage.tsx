import data from '../data/assessment.json';
import React from 'react';
import { IoRocketSharp } from "react-icons/io5";
import { IoArrowForwardSharp, IoArrowBackSharp } from "react-icons/io5";

interface IQuestionOption {
    id: number;
    text: string
    score: number;
}

interface IQuestion {
    id: number;
    title: string;
    options: IQuestionOption[]
}

const EmailEnterSection = () => {

    const [email, setEmail] = React.useState<string>("");

    return (
        <div className='dark-blue-bg h-screen border border-white px-4'>
            <div className='mx-8 my-10 text-center'>
                <span className='text-white uppercase text-sm'>{data.title}</span>
            </div>
            <div className='text-center text-white text-3xl leading-normal mb-6 font-medium'>
                <div>Công ty bạn trưởng thành như thế nào trong việc lắng nghe khách hàng?</div>
            </div>
            <div className='text-white text-center mb-5'>
                <span>Đánh giá khả năng của bạn trong việc lắng nghe, hiểu và đáp ứng các tín hiệu từ khách hàng.</span>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 mx-auto'>
                <input type="text" className='w-full outline-none px-4 py-3 mb-4' placeholder='Địa chỉ email của bạn' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='light-blue-bg py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90'>
                    <span className='text-white'>Bắt đầu</span>
                    <IoRocketSharp className='text-white' />
                </div>
            </div>
        </div>
    )
}

const GuidelinesSection = () => {
    return (

        <div className='dark-blue-bg h-screen border border-white px-4 bg-img'>
            <div className='mx-8 my-10 text-center'>
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
                <div className='light-blue-bg py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90'>
                    <span className='text-white'>Bắt đầu</span>
                    <IoArrowForwardSharp className='text-white' />
                </div>
            </div>
        </div>
    )
}

const AnswerQuestionSection = () => {

    const [totalScore, setTotalScore] = React.useState<number>(0);
    const [questionNum, setQuestionNum] = React.useState<number>(1);
    const [currentQuestion, setCurrentQuestion] = React.useState<IQuestion>();
    const [questionList, setQuestionList] = React.useState<IQuestion[]>([]);

    React.useEffect(() => {
        let questions = data.questions;
        setQuestionList(questions);
        let initialQuestion = questions.filter(question => question.id === questionNum);
        setCurrentQuestion(initialQuestion[0]);
    }, []);

    return (

        <div className='dark-blue-bg h-screen border border-white px-4 bg-img'>
            <div className='mx-8 my-10 text-center'>
                <span className='text-white uppercase text-sm'>{data.title}</span>
            </div>
            <div className='w-full sm:w-1/2 xl:w-1/3 mx-auto rounded bg-gray-500/70 px-6 py-6 text-white mb-10'>
                <div className='flex items-center justify-center gap-x-2 mb-4'>
                    <div className='light-blue-bg rounded-full w-2.5 h-2.5'></div>
                    <span className='text-sm text-gray-200'>CÂU HỎI {questionNum}/10</span>
                </div>
                <div className='mb-8'>
                    <div className='font-medium text-lg mb-4 text-center'>{currentQuestion?.title}</div>
                    <div className='px-4 mb-4 flex flex-col gap-y-6'>
                        <div className='w-full rounded py-2 text-blue-300 font-medium border-2 border-blue-300 text-center hover:text-white hover:bg-blue-600 cursor-pointer'>{currentQuestion?.options[0].text}</div>
                        <div className='w-full rounded py-2 text-red-300 font-medium border-2 border-red-300 text-center hover:text-white hover:bg-red-300 hover:border-red-100 cursor-pointer'>{currentQuestion?.options[1].text}</div>
                        <div className='w-full rounded py-2 text-white font-medium border-2 border-white text-center hover:text-white hover:bg-black hover:border-black cursor-pointer'>{currentQuestion?.options[2].text}</div>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-x-4'>
                    <div className='bg-white px-6 py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90'>
                        <IoArrowBackSharp className='light-blue-text font-medium' />
                        <span className='light-blue-text font-medium'>Quay lại</span>
                    </div>
                    <div className='light-blue-bg px-6 py-3 flex items-center justify-center gap-x-2 cursor-pointer hover:opacity-90'>
                        <span className='text-white font-medium'>Tiếp theo</span>
                        <IoArrowForwardSharp className='text-white font-medium' />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Homepage = () => {

    return (
        <>
            {/* <EmailEnterSection /> */}
            {/* <GuidelinesSection /> */}
            <AnswerQuestionSection />
        </>
    )
}

export default Homepage;
