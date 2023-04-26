import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";
  
//  Form Validation
import * as Yup from 'yup'
const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Too Short!')
  .max(10, 'Too Long!')
  .required('Required'),
});

export default function App() {

  const [password, setPassword] = useState('')
  const [ispasswordgenerated, setIsPasswordGenerated] = useState(false)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePassword = (passwordLength:number) => {
    let charaterList = ''
    const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'
    const NUMBER_CHARACTERS = '0123456789'
    const SYMBOL_CHARACTERS = '!@#$%^&*()_+'

    if (uppercase) {
      charaterList += UPPERCASE_CHARACTERS
    }
    if (lowercase) {
      charaterList += LOWERCASE_CHARACTERS
    }
    if (numbers) {
      charaterList += NUMBER_CHARACTERS
    }
    if (symbols) {
      charaterList += SYMBOL_CHARACTERS
    }

    const password = createPassword(charaterList, passwordLength);

    setPassword(password)
    setIsPasswordGenerated(true)

  }

  const createPassword = (characters:string, passwordLength:number) => {
    let result =''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }
  const resetPasswordState = () => {
      setPassword('')
      setIsPasswordGenerated(false)
      setUppercase(false)
      setLowercase(true)
      setNumbers(false)
      setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          
            <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={passwordSchema}
              onSubmit={ 
                values =>  {
                  console.log(values)
                  generatePassword(+values.passwordLength)
                }
              }
            >
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
                isSubmitting,
                /* and other goodies */
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {errors.passwordLength && touched.passwordLength && (
                        <Text style={styles.errorText}>{errors.passwordLength}</Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex 8"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include LowerCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowercase}
                      onPress={() => setLowercase(!lowercase)}
                      fillColor='green'
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include UpperCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor='green'
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor='green'
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor='green'
                    />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryBtn}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => {
                        handleReset();
                        resetPasswordState();
                      }}
                    >
                      <Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
                  </View>
                </>

              )}
            </Formik>

            {ispasswordgenerated ? (
              <View style={[styles.card, styles.cardElevated]}>
                <Text style={styles.subTitle}>Result:</Text>
                <Text style={styles.description}>Long Press to copy</Text>
                <Text selectable style={styles.generatedPassword}>{ password }</Text>
              </View>
            ) : null}

        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})