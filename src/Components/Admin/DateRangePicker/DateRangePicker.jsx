import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import './DateRangePicker.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import * as locales from 'react-date-range/dist/locale';

const DateRangePickerComp = ({range, setRange, setStartDate, setEndDate, dirty, setDirty}) => {
  const [open, setOpen] = useState(false)
  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  useEffect(() => {
    if(dirty) {setStartDate(format(range[0].startDate, "dd/MM/yyyy"))
               setEndDate(format(range[0].endDate, "dd/MM/yyyy"))}
  }, [range])

  const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  return (
    <div className="calendarWrap">

      <input
        value={''}
        readOnly
        placeholder='Pilih tanggal transaksi...'
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open && 
          <DateRangePicker
            onChange={item => {setRange([item.selection])
                               setDirty(true)}}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            maxDate={new Date()}
            direction="horizontal"
            className="calendarElement"
            locale={locales['id']}
            weekStartsOn={0}
            inputRanges={[]}
          />
        }
      </div>

    </div>
  )
}

export default DateRangePickerComp