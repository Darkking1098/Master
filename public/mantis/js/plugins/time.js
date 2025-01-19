(() => {
    const pad = (m) => String(m).padStart(2, 0);

    const days = [
        { index: 0, day: "00", name: "Sunday", abbr: "sun" },
        { index: 1, day: "01", name: "Monday", abbr: "mon" },
        { index: 2, day: "02", name: "Tuesday", abbr: "tue" },
        { index: 3, day: "03", name: "Wednesday", abbr: "wed" },
        { index: 4, day: "04", name: "Thursday", abbr: "thu" },
        { index: 5, day: "05", name: "Friday", abbr: "fri" },
        { index: 6, day: "06", name: "Saturday", abbr: "sat" },
    ];

    const months = [
        { index: 0, month: "01", name: "January", days: 31, abbr: "jan" },
        { index: 1, month: "02", name: "February", days: 28, abbr: "feb" },
        { index: 2, month: "03", name: "March", days: 31, abbr: "mar" },
        { index: 3, month: "04", name: "April", days: 30, abbr: "apr" },
        { index: 4, month: "05", name: "May", days: 31, abbr: "may" },
        { index: 5, month: "06", name: "June", days: 30, abbr: "jun" },
        { index: 6, month: "07", name: "July", days: 31, abbr: "jul" },
        { index: 7, month: "08", name: "August", days: 31, abbr: "aug" },
        { index: 8, month: "09", name: "September", days: 30, abbr: "sep" },
        { index: 9, month: "10", name: "October", days: 31, abbr: "oct" },
        { index: 10, month: "11", name: "November", days: 30, abbr: "nov" },
        { index: 11, month: "12", name: "December", days: 31, abbr: "dec" },
    ];

    const time = () => {
        const cTime = new Date();
        let h = cTime.getHours();
        let ch = h % 12;
        let m = cTime.getMinutes();
        let s = cTime.getSeconds();
        let mi = Math.floor(cTime / 1000);
        let month = months[cTime.getMonth()];
        let year = cTime.getFullYear();
        let isLeapYear =
            year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        if (isLeapYear && month.index == 1) month.days = 29;

        let secondAngle = 6 * (s + mi / 1000);
        let minuteAngle = 6 * m + secondAngle / 60;
        let hourAngle = 30 * h + minuteAngle / 12;
        let minutePercentage = (s * 100) / 60;
        let hourPercentage = ((m + s / 60) * 100) / 60;
        let dayPercentage = ((h + (m + s / 60) / 60) * 100) / 24;

        return {
            _h: h,
            _ch: ch,
            _m: m,
            _s: s,
            h: pad(h),
            _ch: pad(ch),
            m: pad(m),
            s: pad(s),
            meridiem: h < 12 ? "AM" : "PM",
            millisecond: mi,
            microsecond: cTime.getTime(),
            date: pad(cTime.getDate()),
            day: days[cTime.getDay()],
            month: month,
            year: year,
            isLeapYear: isLeapYear ?? false,

            passedHours: h,
            totalHours: 24,
            totalMinutes: 1440,
            passedMinutes: h * 60 + m,
            totalSeconds: 86400,
            passedSeconds: h * 60 + m * 60 + s,

            secondAngle: secondAngle,
            minuteAngle: minuteAngle,
            hourAngle: hourAngle,
            minutePercentage: minutePercentage,
            hourPercentage: hourPercentage,
            dayPercentage: dayPercentage,
        };
    };

    Object.defineProperty(MU, "MTime", {
        get() {
            return time();
        },
        configurable: false,
        enumerable: true,
    });
})();
