import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, TurboModuleRegistry, View } from 'react-native';

export default function App() {
  const [firstName, setFirstName] = useState({ value: "", valid: true })
  const [lastName, setLastName] = useState({ value: "", valid: true })
  const [email, setEmail] = useState({ value: "", valid: true })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (field: "firstName" | "lastName" | "email") => {
    switch (field) {
      case "firstName":
        if (!firstName.value.trim()) {
          setFirstName(prev => ({ ...prev, valid: false }))
          return false
        } else {
          setFirstName(prev => ({ ...prev, valid: true }))
          return true
        }
      case "lastName":
        if (!lastName.value.trim()) {
          setLastName(prev => ({ ...prev, valid: false }))
          return false
        } else {
          setLastName(prev => ({ ...prev, valid: true }))
          return true
        }
      case "email":
        if (!email.value.trim()) {
          setEmail(prev => ({ ...prev, valid: false }))
          return false
        } else {
          setEmail(prev => ({ ...prev, valid: true }))
          return true
        }
    }
  }

  const reset = () => {
    setFirstName({ value: "", valid: true })
    setLastName({ value: "", valid: true })
    setEmail({ value: "", valid: true })
  }

  const handleSubmit = () => {
    if (validateField("firstName") && validateField("lastName") && validateField("email")) {
      setIsSubmitted(true)
      reset()
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {isSubmitted && (
          <View style={styles.success}>
            <Text style={{ color: "white" }}>Success! Thanks for registering</Text>
          </View>
        )}
        <TextInput 
          placeholder='First Name'
          style={[styles.formField, styles.input]}
          autoCorrect={false}
          autoCapitalize="none"
          value={firstName.value}
          onChangeText={(text) => setFirstName(prev => ({ ...prev, value: text }))}
          onBlur={() => validateField("firstName")}
        />
        {!firstName.valid && <Text style={styles.error}>*First Name is required</Text>}
        <TextInput 
          placeholder='Last Name'
          style={[styles.formField, styles.input]}
          autoCorrect={false}
          autoCapitalize="none"
          value={lastName.value}
          onChangeText={(text) => setLastName(prev => ({ ...prev, value: text }))}
          onBlur={() => validateField("lastName")}
        />
        {!lastName.valid && <Text style={styles.error}>*Last Name is required</Text>}
        <TextInput 
          placeholder='Email'
          style={[styles.formField, styles.input]}
          autoCorrect={false}
          autoCapitalize="none"
          value={email.value}
          onChangeText={(text) => setEmail(prev => ({ ...prev, value: text }))}
          onBlur={() => validateField("email")}
        />
        {!email.valid && <Text style={styles.error}>*Email is required</Text>}
        <TouchableOpacity style={[styles.formField, styles.btn]} onPress={handleSubmit}>
          <Text style={styles.btnText}>register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76b852',
    alignItems: 'center',
    justifyContent: 'center',
  },
  success: {
    backgroundColor: "#3f89f8",
    padding: 15,
    borderRadius: 6
  },
  formContainer: {
    width: 300,
    backgroundColor: "white",
    margin: "auto",
    padding: 10,
    elevation: 5,
    borderRadius: 6
  },
  formField: {
    marginVertical: 10,
    padding: 12,
    fontSize: 16,
    borderRadius: 6
  },
  input: {
    backgroundColor: "#f2f2f2"
  },
  btn: {
    backgroundColor: "#4caf50"
  },
  btnText: {
    color: "white",
    textAlign: "center"
  },
  error: {
    color: "red",
    fontSize: 11
  }
});
