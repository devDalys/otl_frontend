'use client';

import './DatePicker.scss';
import {useState} from 'react';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';

// import 'react-datetime-picker/dist/DateTimePicker.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

//TODO Заменить или доделать

export const DatePicker = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
        minDate={new Date()}
        format="dd-MM-yy HH:mm"
        className="datepicker"
      />
    </div>
  );
};
