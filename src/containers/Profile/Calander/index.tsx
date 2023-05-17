import { Colors } from '@/assets/styles';
import dayjs from 'dayjs';
import React, { Component, useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from './styles';
interface Props {
  onDayPress: (value: object) => void,
  isVisible: boolean
}
const CalendarPicker = ({ onDayPress, isVisible }: Props) => {
  const [visible, setVisible] = useState<boolean>()
  const [year, setYear] = useState(String(dayjs().year()))
  const [current, setCurrent] = useState()


  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  return (
    <Modal visible={visible} transparent onRequestClose={() => {
      setVisible(false)
    }}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.overlay} onStartShouldSetResponder={() => true}>
          <TouchableWithoutFeedback>
            <View style={styles.calendarContainer}>
              <Calendar
                current={current || `${year}-01-01`}
                enableSwipeMonths
                onDayPress={date => {
                  onDayPress && onDayPress(date);
                  setVisible(false);
                }}
              // markedDates={{
              //   [current]: { selected: true, selectedColor: Colors.primaryBlue }
              // }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

}

export default CalendarPicker;
