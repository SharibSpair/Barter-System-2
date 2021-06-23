import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { Alert } from "react-native";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView,Modal } from "react-native";

export default class SignUpAndLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      mobileNo: "",
      address: "",
      confirmpassword: "",
      isModalVisible: true
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

  userSignUp = (emailId, password, confirmpassword) => {
    if(password !== confirmpassword){
      return Alert.alert("Passwords Do Not Match")
    }
    else{
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
  }
};

showmodal = () => {
  return <Modal animationType = {'fade'} 
  transparent = {true}
  visible = {this.state.isModalVisible}
  >
  <View style = {styles.modalContainer}>
    
    <ScrollView style = {{width:'100%'}}>
<KeyboardAvoidingView style={styles.keyboardview}>

  <Text style = {styles.modalTitle}>Registration</Text>
<TextInput 
  style={styles.modaltextinput}
  placeholder="First Name"
  maxLength = {10}
onChangeText = {(text)=>{
  this.setState({
    firstName:text
  })
}}
/>
<TextInput 
  style={styles.modaltextinput}
  placeholder="Last Name"
  maxLength = {10}
onChangeText = {(text)=>{
  this.setState({
    lastName:text
  })
}}
/>

<TextInput 
  style={styles.modaltextinput}
  placeholder="Contact No."
  maxLength = {10}
  keyboardType='numeric'
onChangeText = {(text)=>{
  this.setState({
    mobileNo:text
  })
}}
/>

<TextInput 
  style={styles.modaltextinput}
  placeholder="Address"
  multiline={true}
 onChangeText = {(text)=>{
  this.setState({
    address:text
  })
}}
/>

<TextInput 
  style={styles.modaltextinput}
  placeholder="Email ID"
  keyboardType="email-address"
  onChangeText = {(text)=>{
  this.setState({
    emailId:text
  })
}}
/>
<TextInput 
  style={styles.modaltextinput}
  placeholder="Password"
  secureTextEntry= {true}
 onChangeText = {(text)=>{
  this.setState({
    password:text
  })
}}
/>

<TextInput 
  style={styles.modaltextinput}
  placeholder="Confirm Password"
  secureTextEntry= {true}
 onChangeText = {(text)=>{
  this.setState({
    confirmPassword:text
  })
}}
/>

</KeyboardAvoidingView>

<TouchableOpacity
        style={styles.button}
        onPress={() => {
          this.userSignUp(this.state.emailId, this.state.password,this.state.confirmPassword);
        }}
      >
        <Text style={styles.buttontext}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
         this.setState({isModalVisible:false})
        }}
      >
        <Text style={styles.buttontext}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>

  </View>
    
  </Modal>;
};


  render() {
    return (
      <View style={styles.container}>
         <View style = {{justifyContent:'center',alignItems:'center'}}> 
    {
      this.showmodal()
    }

   </View>
   <Image
          source={require("../assets/barter.png")}
          style={{ width: 200, height: 200, marginBottom: 40 }}
        />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    //marginBottom:200,
    fontSize: 55,
    fontWeight: "100",
    //paddingBottom: 30,
    color: "orange",
    fontWeight:'bold'
  },
  belowtitle: {
    fontSize: 10,

    // marginBottom:200,
    color: "orange",
    fontWeight:'bold'
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
    fontWeight:'bold'
  },
  submittext: {
    fontSize: 16,
    color: "orange",
    fontWeight:'bold'
  },
  modalTitle:{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'orange',
    margin:50
  },
  
  modalContainer:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white',
  marginRight:30,
  marginLeft:30,
  marginTop:30,
  marginBottom:60,
  borderWidth:1,
  borderRadius:20,

  },

  keyboardview:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  modaltextinput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'orange',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  

},
  registerbutton:{
    width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
  },

  registerbuttontext:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },

  cancelButton:{
    width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
  },
  
  cancelbuttontext:{
    color:'#ff5722',
    fontSize:15,

  },
 
    button:{
      width:200,
      height:30,
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"orange",
      shadowColor: "#000",
      marginTop:20,
    
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
      padding: 10
    },

    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20,
      fontWeight:'bold'
    }
  

});
