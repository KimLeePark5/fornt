import React, { useState, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import koLocale from "@fullcalendar/core/locales/ko";
import ProgramItem from "../../../components/board/program/items/ProgramItem";

export function MyCalendar({ programs }) {
    const [currentMonth, setCurrentMonth] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // 페이지 로드 시 현재 년도와 월을 설정
        const currentDate = new Date();
        setCurrentMonth(`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`);

        // programs가 존재하면 events 업데이트
        if (programs) {
            setEvents(generateProgramEvents(programs));
        }
    }, [programs]);

    // 프로그램 데이터를 받아서 이벤트를 생성하는 함수
    const generateProgramEvents = (programs) => {
        const generatedEvents = [];

        // 각 프로그램에 대해 이벤트 생성
        programs.forEach((program) => {
            const startDate = new Date(program.startDate);
            const endDate = new Date(program.endDate);
            const dayOfWeek = program.day;

            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                if (currentDate.getDay() === dayOfWeek) {
                    // 요일이 맞는 경우 이벤트 추가
                    generatedEvents.push({
                        title: program.categoryName,
                        start: currentDate.toISOString().split('T')[0],  // YYYY-MM-DD 형식으로 변환
                        program: program,  // 프로그램 정보 추가
                    });
                }

                // 다음 주로 이동
                currentDate.setDate(currentDate.getDate() + 7);
            }
        });

        return generatedEvents;
    }

    const updateCurrentMonth = (info) => {
        // FullCalendar의 이벤트 콜백을 활용하여 년도와 월을 업데이트
        setCurrentMonth(`${info.view.title}`);
    }

    const handleDatesSet = (info) => {
        // FullCalendar의 datesSet 이벤트를 활용하여 다음/이전 버튼을 클릭할 때 년도와 월을 업데이트
        setCurrentMonth(`${info.view.title}`);
    }

    const handleEventClick = (info) => {
        // 클릭한 이벤트의 프로그램 정보를 상태에 저장하고 모달을 엽니다.
        setSelectedProgram(info.event.extendedProps.program);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        // 모달을 닫습니다.
        setIsModalOpen(false);
    }

    return (
        <>
            <div>
                <div style={{ gridColumn: "1 / span 2", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
                    {currentMonth && (
                        <div>
                            {currentMonth}
                        </div>
                    )}
                    <br/>
                </div>
                <div className="calender-div">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={'dayGridMonth'}
                        headerToolbar={{
                            start: 'today',
                            center: 'title',
                            end: 'prev,next'
                        }}
                        height={"80vh"}
                        dateClick={updateCurrentMonth}
                        datesSet={handleDatesSet}
                        events={events}
                        eventClick={handleEventClick}
                        locale={koLocale}
                    />
                </div>
            </div>
            {isModalOpen && selectedProgram && (
                // 모달 컴포넌트를 렌더링합니다.
                <ProgramItem program={selectedProgram} closeModal={closeModal} />
            )}
        </>
    );
}

export default MyCalendar;