import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { Alert } from "react-native";

export default class SignUpAndLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        return Alert.alert("Successfully Logged In");
      })
      .catch((error) => {
        var errorcode = error.code;
        var errormessage = error.message;
        return Alert.alert(errormessage);
      });
  };

  userSignUp = (emailId, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then(() => {
        return Alert.alert("Successfully Registered");
      })
      .catch((error) => {
        var errorcode = error.code;
        var errormessage = error.message;
        return Alert.alert(errormessage);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}> Barter </Text>
        </View>

        <View>
          <Text style={styles.belowtitle}> A Trading Method </Text>
        </View>

        <TextInput
          style={styles.loginBox}
          placeholder="Enter Your Email ID"
          keyboardType="email-address"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              emailId: text,
            });
          }}
        />

        <TextInput
          style={styles.loginBox}
          placeholder="Enter Your Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.userLogin(this.state.emailId, this.state.password);
          }}
        >
          <Text style={styles.submittext}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SignUpButton}
          onPress={() => {
            this.userSignUp(this.state.emailId, this.state.password);
          }}
        >
          <Text style={styles.submittext}>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(251,229,183)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    //marginBottom:200,
    fontSize: 55,
    fontWeight: "100",
    //paddingBottom: 30,
    color: "orange",
  },
  belowtitle: {
    fontSize: 10,

    // marginBottom:200,
    color: "orange",
  },
  loginBox: {
    width: 200,
    height: 20,
    borderBottomWidth: 1.5,
    borderColor: "orange",
    fontSize: 20,
    margin: 20,
    paddingLeft: 10,
    marginTop: 30,
  },
  loginButton: {
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 30,
  },

  SignUpButton: {
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 30,
  },
  submittext: {
    fontSize: 16,
    color: "orange",
  },
});
