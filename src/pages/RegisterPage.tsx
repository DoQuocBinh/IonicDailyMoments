import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import './Home.css';


const RegisterPage: React.FC = () => {
  const [email,setEmail]= useState('ionic@test.com');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(false);
  const [status,setStatus] = useState({error:false,loading:false});
  const handleRegister = async ()=>{
    try {
      setStatus({error: false,loading:true});
      const credential = await auth.
          createUserWithEmailAndPassword(email,password);
      setStatus({error: false,loading:false});
      console.log(credential)
    } catch (error) {
      setStatus({error: true,loading:false});
      console.log("Login error")
    }   
  }
  const {loggedIn: isAuthenticated}= useAuth();
  if (isAuthenticated) {
    return <Redirect to="/my/entries"/>
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput type="text" value ={email}
              onIonChange={(event)=>setEmail(event.detail.value)}/>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput type="password" value ={password}
              onIonChange={(event)=>setPassword(event.detail.value)}/>
        </IonItem>
      </IonList>
      {status.error &&
        <IonText color="danger">Registeration failed</IonText>
      } 
      <IonButton expand="block" onClick={handleRegister}>Create Account</IonButton>
      <IonButton expand="block" fill="clear" routerLink="/Login">Already have an account?</IonButton>
      <IonLoading isOpen={status.loading}/>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
