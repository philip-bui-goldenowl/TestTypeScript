import { Colors } from '@/assets/styles';
import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TextInputProps } from 'react-native';
import Text from '../Text';
interface Props extends TextInputProps {
  label?: string,
  icon?: number,
  style?: object,
  error: string,
  onFocus?: () => void,
  password?: string,
  placeholder?: string,
}
const Input = ({ label, icon, style, error, password, onFocus = () => { }, ...props }: Props) => {
  const [hidePassword, setHidePassword] = useState(password ? true : false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            // eslint-disable-next-line no-nested-ternary
            borderColor: Colors.primaryBlue,
            alignItems: 'center',
          },
          style,
        ]}>
        <Image style={{ marginLeft: 16 }} source={icon} />
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={styles.txtInput}
          placeholderTextColor={Colors.neutralGrey}
          {...props}
        />
        {/* {password && (
          <Icon
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
            name={!hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ color: Colors.black, fontSize: 22, marginRight: 10 }}
          />
        )} */}
      </View>
      {error && <Text style={{ marginTop: 7, color: 'red', fontSize: 12 }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    //...TypoText.body13Normal,
    color: Colors.neutralGrey,
    fontSize: 13,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 12,
  },
  txtInput: {
    padding: 0,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 16,
  },
});
export default Input;
