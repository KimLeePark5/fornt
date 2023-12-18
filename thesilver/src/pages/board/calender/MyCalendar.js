import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 추가

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: null,
        };
    }

    componentDidMount() {
        // 페이지 로드 시 현재 년도와 월을 설정
        const currentDate = new Date();
        this.setState({
            currentMonth: `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`,
        });
    }

    updateCurrentMonth = (info) => {
        // FullCalendar의 이벤트 콜백을 활용하여 년도와 월을 업데이트
        this.setState({
            currentMonth: `${info.view.title}`,
        });
    }

    handleDatesSet = (info) => {
        // FullCalendar의 datesSet 이벤트를 활용하여 다음/이전 버튼을 클릭할 때 년도와 월을 업데이트
        this.setState({
            currentMonth: `${info.view.title}`,
        });
    }

    render() {
        return (
            <>
                <div>
                    <div style={{ gridColumn: "1 / span 2", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
                        {this.state.currentMonth && (
                            <div>
                                {this.state.currentMonth}
                            </div>
                        )}
                    </div>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={'dayGridMonth'}
                        headerToolbar={{
                            start: 'today',
                            center: 'title',
                            end: 'prev,next'
                        }}
                        height={"80vh"}
                        dateClick={this.updateCurrentMonth}
                        datesSet={this.handleDatesSet}
                        events={[{ title: '홍길동 : 연차', date: '2023-12-11', }, { title: '이순신 : 연차', date: '2023-12-13', }]}
                        locale={koLocale} // 한국어 로케일 적용
                    />
                </div>
            </>
        );
    }
}
