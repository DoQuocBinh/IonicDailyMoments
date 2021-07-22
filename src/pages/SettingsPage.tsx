import { IonButton, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { auth } from '../firebase';
import './Home.css';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonButton color="medium" expand="block"
        onClick={()=>auth.signOut()}>
        Logout
      </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
